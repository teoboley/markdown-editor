import * as React from "react";
import { RenderNodeProps } from "slate-react";

// import CircleChart from "../../../../atoms/CircleChart";
import {EInlineType} from "../../slate-types";

// const CodeLabel: React.SFC<{ label: string }> = ({ label }) => {
//   return <span contentEditable={false} style={{ display: "", position: "relative", opacity: 0.5, width: 0, height: 0, userSelect: "none" }}><div style={{ position: "absolute", top: -10, left: 0, fontSize: 12 }}><span>{ label }</span></div></span>;
// };
//
// const wrapInCodeLabel = (label: string) => (element: JSX.Element) => {
//   return <><CodeLabel label={label}/>{ element }</>;
// };

function renderNode(props: RenderNodeProps) {
  const { attributes, children, node, editor } = props;

  if (node.object !== 'inline') {
    return;
  }

  const htmlAttributes = node.data.get('htmlAttributes');

  switch (node.type) {
    case EInlineType.CodeLine:
      // const language = htmlAttributes.class ? htmlAttributes.class.replace('language-', '') : null;
      return <code {...attributes} className={htmlAttributes.class} style={{ overflowX: "scroll" }}>{children}</code>;
    case EInlineType.Image:
      return <img {...attributes} src={htmlAttributes.src} alt={htmlAttributes.alt} title={htmlAttributes.title}/>;
    case EInlineType.Input:
      if (htmlAttributes.type === 'checkbox') {
        const checked = htmlAttributes.checked === '' || htmlAttributes.checked === true;

        return <div contentEditable={false} style={{ display: 'inline-block', position: "relative", width: 16, left: -8 }}>
          {/*<CircleChart sectors={[{ percentage: checked ? 100 : 0, color: "teal" }]} size={30} style={{ position: 'absolute', top: -20 }}*/}
                       {/*onClick={() => {*/}
                         {/*editor.change(c => c.setNodeByKey(node.key, {*/}
                           {/*data: {*/}
                             {/*...node.data,*/}
                             {/*htmlAttributes: {*/}
                               {/*...htmlAttributes,*/}
                               {/*checked: !checked*/}
                             {/*}*/}
                           {/*}*/}
                         {/*} as any))*/}
                       {/*}}*/}
          {/*/>*/}
        </div>;
      }
      break;
  }

  return null
}

export default {
  renderNode
}