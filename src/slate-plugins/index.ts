// import EditCode from 'slate-edit-code'
// import EditList from 'slate-edit-list'
// import EditTable from 'slate-edit-table'
// import InsertImages from "slate-drop-or-paste-images";
// import PasteLinkify from "slate-paste-linkify";

import { default as MarkdownPlugins } from "./core-markdown/index";

export { MarkdownPlugins as Markdown };

export default [
  // EditList({
  //   types: ['numbered-list', 'bulleted-list'],
  //   typeItem: "list-item"
  // }),
  // EditCode({
  //   containerType: 'code',
  //   lineType: 'code-line'
  // }),
  // EditTable({
  //   typeTable: 'table',
  //   typeRow: 'table-row',
  //   typeCell: 'table-cell',
  //   typeContent: 'paragraph'
  // }),
  ...MarkdownPlugins,
  // InsertImages({
  //   extensions: ['png', 'jpg'],
  //   insertImage: (transform, file) => {
  //     return transform.insertBlock({
  //       type: 'image',
  //       isVoid: true,
  //       data: { file }
  //     })
  //   }
  // }),
  // PasteLinkify({
  //   type: 'link',
  //   hrefProperty: 'url',
  //   collapseTo: 'end'
  // })
];
