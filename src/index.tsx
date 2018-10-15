import * as React from 'react'
import { Editor } from 'slate-react'
import { Change, Value } from 'slate'
import Sandbox from 'react-sandbox';
// import * as ReactDataGrid from 'react-data-grid';

import slatePlugins from "./slate-plugins";
import { deserialize as deserializeMarkdown, serialize as serializeMarkdown } from './serializer';

// import FloatingActionBar from "./FloatingActionBar";
import defaultTheme, {defaultOverrides} from "./theme";

interface IMarkdownEditorViewModel {
  source: string;
  topMenu: any;
  documentTheme?: string;

  loading?: boolean;
}

interface IMarkdownEditorActions {
  onChange: (serializeContent: () => string) => void;
}

type MarkdownEditorProps = IMarkdownEditorViewModel & IMarkdownEditorActions & React.ClassAttributes<any>;

interface IMarkdownEditorState {
  editor: {
    source: string;
    value: Value;
  } | null;
}

class MarkdownEditor extends React.Component<MarkdownEditorProps, IMarkdownEditorState> {
  static getDerivedStateFromProps(props: MarkdownEditorProps, state: IMarkdownEditorState): IMarkdownEditorState | null  {
    if (state.editor == null || props.source !== state.editor.source) {
      const { slate, html } = deserializeMarkdown(props.source);
      console.log(html);

      return {
        editor: {
          source: props.source,
          value: slate
        }
      };
    }

    return null;
  }

  readonly state: IMarkdownEditorState = {
    editor: null
  };

  frameWindow: Window | null;
  // menu: FloatingActionBar | null;

  componentDidMount() {
    // this.updateMenu();
  }

  componentDidUpdate() {
    // this.updateMenu();

    // TODO: Syntax highlighting
    // if (this.frameWindow) {
    //   console.log('CODE BLOCKS');
    //   const preNodes = this.frameWindow.document.getElementsByTagName('PRE');
    //   console.log(preNodes);
    //
    //   if (preNodes.length > 0) {
    //     Highlight.highlightBlock(preNodes[0]);
    //   }
    // }
  }

  constructor(props: MarkdownEditorProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  render() {
    const theme = this.props.documentTheme || defaultTheme;
    // const marks = { bold: false, italic: false, underline: false };

    return (
      <div style={{ flexGrow: 1, display: "flex", flexDirection: 'column' }}>
          <div style={{ position: "relative", width: "100%", height: 0 }}>
            {  this.props.topMenu }
          </div>
          { !this.props.loading && this.state.editor != null ?
            <>
              {/*<FloatingActionBar
                type={{ type: EActionBarType.TEXT, fields: marks }}
                ref={(menu: any) => (this.menu = menu)}
                onToggle={item => {
                  console.log('attempted mark toggle: ' + item);

                  const { value } = this.state.editor!;
                  const change = value.change().toggleMark(item);
                  this.onChange(change);
                }}
              />*/}
              <Sandbox style={{ width: "100%" }} onLoadWindow={win => {
                this.frameWindow = win;
              }
              }>
                <style>{ theme }</style>
                <style>
                  { defaultOverrides }
                </style>
                <Editor
                  value={this.state.editor!.value}
                  onChange={this.onChange}
                  // onPaste={this.onPaste}
                  plugins={slatePlugins}
                />
              </Sandbox>
            </>
          :
            <div style={{ flexGrow: 1,
              alignItems: "center",
              display: "flex",
              justifyContent: "center" }}/>
          }
      </div>
    );
  }

  // /**
  //  * Update the menu's absolute position.
  //  */
  //
  // updateMenu() {
  //   const menu = this.menu;
  //   if (!menu) return;
  //
  //   const value = this.state.editor!.value;
  //   const { fragment, selection } = value;
  //
  //   if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
  //     // menu.disable();
  //     // return;
  //   }
  //
  //   const win = this.frameWindow || window;
  //
  //   const native = win.getSelection();
  //   if (native.rangeCount === 0) return;
  //
  //   const range = native.getRangeAt(0);
  //   const rect = range.getBoundingClientRect();
  //   menu.moveTo(rect.left + (rect.width / 2) - 20, rect.top);
  // }

  onChange({ value }: Change) {
    if (!this.props.loading && this.state.editor != null) {
      if (!value.document.equals(this.state.editor.value.document) && this.props.onChange) {
        this.props.onChange(() => {
          const serializedMarkdown = serializeMarkdown(value);
          return serializedMarkdown.markdown;
        });
      }

      this.setState({ editor: { source: this.state.editor.source, value } });
    }
  }

  // onPaste = (event: Event, change: Change) => {
  //   const transfer = getEventTransfer(event);
  //   if (transfer.type != 'html') return
  //   const { document } = deserializeMarkdown((transfer as any).text).slate;
  //   change.insertFragment(document);
  //   return change;
  // }
}

export default MarkdownEditor;