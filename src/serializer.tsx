import * as React from "react";
import { Block, Inline, Mark, Node, Value } from 'slate';
import * as unified from 'unified';
// import inspect from 'unist-util-inspect';
import * as fromMarkdown from 'remark-parse';
import * as remark2rehype from 'remark-rehype';
import * as toHtml from 'rehype-stringify';

import * as toMarkdown from 'remark-stringify';
import * as rehype2remark from 'rehype-remark';
import * as fromHtml from 'rehype-parse';

import SlateHtml from 'slate-html-serializer'
import {EBlockType, EInlineType, EMarkType} from "./slate-types";

const BLOCK_TAGS = {
  p: EBlockType.Paragraph,
  li: EBlockType.ListItem,
  ul: EBlockType.BulletedList,
  table: EBlockType.Table,
  thead: EBlockType.TableHeader,
  tbody: EBlockType.TableBody,
  tfoot: EBlockType.TableFooter,
  tr: EBlockType.TableRow,
  th: EBlockType.TableHeaderCell,
  td: EBlockType.TableCell,
  ol: EBlockType.NumberedList,
  blockquote: EBlockType.BlockQuote,
  pre: EBlockType.Code,
  h1: EBlockType.HeadingOne,
  h2: EBlockType.HeadingTwo,
  h3: EBlockType.HeadingThree,
  h4: EBlockType.HeadingFour,
  h5: EBlockType.HeadingFive,
  h6: EBlockType.HeadingSix,
  hr: EBlockType.HorizontalRule
};

const INLINE_TAGS = {
  code: EInlineType.CodeLine,
  img: EInlineType.Image,
  input: EInlineType.Input
};
​
const MARK_TAGS = {
  strong: EMarkType.Bold,
  em: EMarkType.Italic,
  u: EMarkType.Underline,
  s: EMarkType.Strikethrough,
  a: EMarkType.Link
};
​
const rules = [
  // blocks
  {
    deserialize(el: HTMLElement, next: any) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        console.log('recognized block: ' + type);

        return {
          object: 'block',
          type: type,
          data: {
            htmlAttributes: Array.prototype.slice.call(el.attributes).reduce((acc: any, curr: any) => {
              return {
                ...acc,
                [curr.name]: curr.value
              }
            }, {}),
          },
          nodes: next(el.childNodes),
        }
      }
      return;
    },
    serialize(obj: Block, children: any) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case EBlockType.ListItem:
            return <li>{children}</li>;
          case EBlockType.BulletedList:
            return <ul>{children}</ul>;
          case EBlockType.NumberedList:
            return <ol>{children}</ol>;
          case EBlockType.HeadingOne:
            return <h1>{children}</h1>;
          case EBlockType.HeadingTwo:
            return <h2>{children}</h2>;
          case EBlockType.HeadingThree:
            return <h3>{children}</h3>;
          case EBlockType.HeadingFour:
            return <h4>{children}</h4>;
          case EBlockType.HeadingFive:
            return <h5>{children}</h5>;
          case EBlockType.HeadingSix:
            return <h6>{children}</h6>;
          case EBlockType.Code:
            return <pre>{children}</pre>;
          case EBlockType.Paragraph:
            return <p className={obj.data.get('className')}>{children}</p>;
          case EBlockType.BlockQuote:
            return <blockquote>{children}</blockquote>;
          case EBlockType.Table:
            return <table>{children}</table>;
          case EBlockType.TableHeader:
            return <thead>{children}</thead>;
          case EBlockType.TableBody:
            return <tbody>{children}</tbody>;
          case EBlockType.TableFooter:
            return <tfoot>{children}</tfoot>;
          case EBlockType.TableRow:
            return <tr>{children}</tr>;
          case EBlockType.TableHeaderCell:
            return <th>{children}</th>;
          case EBlockType.TableCell:
            return <td>{children}</td>;
        }
      }
      return;
    },
  },
  // inlines
  {
    deserialize(el: HTMLElement, next: any) {
      const type = INLINE_TAGS[el.tagName.toLowerCase()];
      if (type) {
        console.log('recognized inline: ' + type);

        return {
          object: 'inline',
          type: type,
          data: {
            htmlAttributes: Array.prototype.slice.call(el.attributes).reduce((acc: any, curr: any) => {
              return {
                ...acc,
                [curr.name]: curr.value
              }
            }, {}),
          },
          nodes: next(el.childNodes),
        }
      }
      return;
    },
    serialize(obj: Inline, children: any) {
      if (obj.object === 'inline') {
        switch (obj.type) {
          case EInlineType.CodeLine:
            return <code>{children}</code>;
        }
      }
      return;
    },
  },
  // marks
  {
    deserialize(el: HTMLElement, next: any) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        console.log('recognized mark: ' + type);

        return {
          object: 'mark',
          type: type,
          data: {
            htmlAttributes: Array.prototype.slice.call(el.attributes).reduce((acc: any, curr: any) => {
              return {
                ...acc,
                [curr.name]: curr.value
              }
            }, {})
          },
          nodes: next(el.childNodes),
        }
      }
      return;
    },
    serialize(obj: Mark, children: any) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case EMarkType.Bold:
            return <strong>{children}</strong>;
          case EMarkType.Italic:
            return <em>{children}</em>;
          case EMarkType.Underline:
            return <u>{children}</u>;
          case EMarkType.Strikethrough:
            return <s>{children}</s>;
          case EMarkType.Link:
            return <a>{children}</a>;
        }
      }
      return;
    }
  }
];

export const fileToDataURL = (file: File) => {
  const reader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    reader.addEventListener('load', () => {
      if (reader.result) {
        resolve(reader.result.toString());
      }
    });
    reader.readAsDataURL(file);
  })
};

export function deserialize(source: string): { html: string; slate: Value } {
  const deserializedHTML = unified()
  .use(fromMarkdown)
  .use(remark2rehype)
  .use(toHtml)
  .processSync(source).toString();

  const slateHtml = new SlateHtml({ rules });

  return {
    html: deserializedHTML,
    slate: slateHtml.deserialize(deserializedHTML)
  }
}

export function serialize(value: Value): { html: string; markdown: string } {
  const slateHtml = new SlateHtml({ rules });
  const serializedHTML = slateHtml.serialize(value);

  return {
    html: serializedHTML,
    markdown: unified()
      .use(fromHtml)
      .use(rehype2remark)
      .use(toMarkdown)
      .processSync(serializedHTML).toString()
  };
}