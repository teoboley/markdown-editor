import * as React from "react";
import { RenderNodeProps } from "slate-react";
import { fileToDataURL } from "./serializer";

export default class Image extends React.Component<RenderNodeProps & { contentEditable: boolean }> {
  state = {
    src: undefined
  };

  componentDidMount() {
    const { node } = this.props;
    if (node.object === 'text') {
      return;
    }

    const { data } = node;
    const file = data.get('file');
    this.load(file);
  }

  async load(file: any) {
    this.setState({ src: await fileToDataURL(file) });
  }

  render() {
    const { attributes } = this.props;
    const { src } = this.state;
    return src ? <img {...attributes} src={src} /> : <span>Loading...</span>
  }
}