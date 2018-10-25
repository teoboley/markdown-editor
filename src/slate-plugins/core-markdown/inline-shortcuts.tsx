import {HandleTrigger} from "../lib";
import {EInlineType} from "../../slate-types";

const CodeLinePlugins = [
  // add code line
  HandleTrigger({
    hotkey: '`',
    func: (change) => {
      const {startBlock} = change.value;
      change.insertInline({type: EInlineType.CodeLine, data: {htmlAttributes: {class: ''}}}); // (... as any).moveFocusForward(1);
      // change.wrapBlock('code');
    }
  }),
  // delete code line
  HandleTrigger({
    hotkey: 'backspace',
    func: (change) => {
      // const { startBlock, selection } = change.value;
      // if ((selection as any).start.offset != 0) return;
      //
      // if (startBlock.type === 'list-item') {
      //   change.setBlocks(EBlockType.Paragraph);
      //   change.unwrapBlock(EBlockType.BulletedList);
      //   ((change as any).moveFocusToStartOfNode(startBlock) as Change).insertText('- ');
      // }
    }
  })
];

export default [
  ...CodeLinePlugins
];