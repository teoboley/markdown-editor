import * as React from "react";
import { RenderNodeProps } from "slate-react";
import {EBlockType} from "../../slate-types";

const BlockLabel: React.SFC<{ label: string }> = ({ label }) => {
  return <span contentEditable={false} style={{ display: "", position: "relative", opacity: 0.5, width: 0, height: 0, userSelect: "none" }}><div style={{ position: "absolute", left: -20, fontSize: 12 }}><span>{ label }</span></div></span>;
};

const wrapInBlockLabel = (label: string) => (element: JSX.Element) => {
  return <><BlockLabel label={label}/>{ element }</>;
};

function renderNode(props: RenderNodeProps) {
  const { attributes, children, node } = props;

  if (node.object !== 'block') {
    return;
  }

  const htmlAttributes = node.data.get('htmlAttributes');

  switch (node.type) {
    case EBlockType.Code:
      return (
          <pre {...attributes}>
            {children}
          </pre>
      );
    case EBlockType.BlockQuote:
      return <blockquote {...attributes}>{children}</blockquote>;
    case EBlockType.BulletedList:
      return <ul {...attributes}>{children}</ul>;
    case EBlockType.NumberedList:
      return <ol {...attributes}>{children}</ol>;
    case EBlockType.HeadingOne:
      return <h1 {...attributes}>{children}</h1>;
    case EBlockType.HeadingTwo:
      return <h2 {...attributes}>{children}</h2>;
    case EBlockType.HeadingThree:
      return <h3 {...attributes}>{children}</h3>;
    case EBlockType.HeadingFour:
      return <h4 {...attributes}>{children}</h4>;
    case EBlockType.HeadingFive:
      return <h5 {...attributes}>{children}</h5>;
    case EBlockType.HeadingSix:
      return <h6 {...attributes}>{children}</h6>;
    case EBlockType.ListItem:
      return <li key={node.key} className={htmlAttributes.class} {...attributes}>{children}</li>;
    case EBlockType.Paragraph:
      return <p {...attributes}>{children}</p>;
    case EBlockType.Table:
      // const getCircularReplacer = () => {
      //   const seen = new WeakSet();
      //   return (key: string, value: string) => {
      //     if (typeof value === "object" && value !== null) {
      //       if (seen.has(value)) {
      //         return;
      //       }
      //       seen.add(value);
      //     }
      //     return value;
      //   };
      // };

      // const columns: Array<{ key: string; name: string }> =
      //   children
      //   .filter((child: any) => child.tableType === "header")
      //   .map((child: any) => ({ key: child.value.toLowercase(), name: child.value }));

      // return (
      //   <>
      //   <span>
      //     { columns.length }
      //     { JSON.stringify(children, getCircularReplacer(), 2)}
      //   </span>
      //   {<ReactDataGrid
      //     columns={columns}
      //     rowGetter={() => {
      //       return {
      //         id: 0,
      //         title: 'Title ' + 0,
      //         count: 0
      //       };
      //     }}
      //     rowsCount={1} minHeight={100}/>
      // }</>
      // );
      return (<table {...attributes}>{ children }</table>);
    case EBlockType.TableHeader:
      return <thead {...attributes}>{ children }</thead>;
    case EBlockType.TableBody:
      return <tbody {...attributes}>{ children }</tbody>;
    case EBlockType.TableFooter:
      return <tfoot {...attributes}>{ children }</tfoot>;
    case EBlockType.TableRow:
      return <tr key={node.key} {...attributes}>{ children }</tr>;
    case EBlockType.TableCell:
      return <td key={node.key} style={{textAlign:htmlAttributes.align}} {...attributes}>{ children }</td>;
    case EBlockType.TableHeaderCell:
      return <th key={node.key} style={{textAlign:htmlAttributes.align}} {...attributes}>{ children }</th>;
    case EBlockType.HorizontalRule:
      return <hr {...attributes}/>;
  }

  return null
}

export default {
  renderNode
}