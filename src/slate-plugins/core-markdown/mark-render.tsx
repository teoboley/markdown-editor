import * as React from "react";
import { RenderMarkProps } from "slate-react";
import {EMarkType} from "../../slate-types";

function renderMark(props: RenderMarkProps) {
  const { children, mark, attributes, } = props;

  if (mark.object !== 'mark') {
    return;
  }

  const htmlAttributes = mark.data.get("htmlAttributes");

  switch (mark.type) {
    case EMarkType.Bold:
      return <strong {...attributes}>{children}</strong>;
    case EMarkType.Italic:
      return <em {...attributes}>{children}</em>;
    case EMarkType.Underline:
      return <u {...attributes}>{children}</u>;
    case EMarkType.Link:
      return (
        <a {...attributes} href={htmlAttributes.href}>
          {children}
        </a>
      );
  }

  return null;
}

export default {
  renderMark
}