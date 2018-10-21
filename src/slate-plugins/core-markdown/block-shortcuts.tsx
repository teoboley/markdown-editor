import {Block, Change} from 'slate'
import {HandleTrigger} from "../lib";
import {EBlockType, EInlineType} from "../../slate-types";

const BlockQuotePlugins = [
  // add blockquote
  HandleTrigger({
    hotkey: 'space',
    condition: {
      before: /^(>)$/
    },
    func: (change) => {
      const {startBlock} = change.value;

      change.setBlocks(EBlockType.BlockQuote);
      (change as any).moveFocusToStartOfNode(startBlock).delete();
    }
  }),
  // delete blockquote
  HandleTrigger({
    hotkey: 'backspace',
    condition: {
      change: change => (change.value.selection as any).start.offset === 0 && change.value.startBlock.type === EBlockType.BlockQuote
    },
    func: (change) => {
      const {startBlock} = change.value;

      console.log('BLOCK QUOTE DELETE');
      change.setBlocks(EBlockType.Paragraph);
      ((change as any).moveFocusToStartOfNode(startBlock) as Change).insertText(`> `);
    }
  }),
  // unwrap block-quote
  HandleTrigger({
    hotkey: 'backspace',
    condition: {
      change: change => (change.value.selection as any).start.offset === 0 && (change.value.document as any).getAncestors(change.value.startBlock.key).some((block: Block) => block.type === EBlockType.BlockQuote)
    },
    func: (change) => {
      const {startBlock} = change.value;

      console.log('BLOCK QUOTE UNWRAP');
      change.setBlocks(EBlockType.Paragraph);
      change.unwrapBlock(EBlockType.BlockQuote);
      ((change as any).moveFocusToStartOfNode(startBlock) as Change).insertText(`> `);
    }
  }),
  // enter on non-nested blockquote
  HandleTrigger({
    hotkey: 'enter',
    condition: {
      change: change => change.value.startBlock.type === EBlockType.BlockQuote
    },
    func: (change) => {
      change.splitBlock(1).setBlocks(EBlockType.Paragraph);
      return false;
    }
  }),
  // enter on nested blockquote
  HandleTrigger({
    hotkey: 'enter',
    condition: {
      change: change => (change.value.document as any).getAncestors(change.value.startBlock.key).some((block: Block) => block.type === EBlockType.BlockQuote)
    },
    func: (change) => {
      change.splitBlock(1).setBlocks(EBlockType.Paragraph).unwrapBlock(EBlockType.BlockQuote);
      return false;
    }
  })
];

const HeadingPlugins = [
  // add heading
  HandleTrigger({
    hotkey: 'space',
    condition: {
      before: /^(#{1,6})$/
    },
    func: (change, event, matches) => {
      const {startBlock} = change.value;

      const [hashes] = matches!.before!;
      const level = hashes.length;
      const alph = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];

      change.setBlocks(`heading-${alph[level]}`);
      (change as any).moveFocusToStartOfNode(startBlock).delete();
    },
  }),
  // enter on heading
  HandleTrigger({
    hotkey: 'enter',
    condition: {
      change: change => change.value.startBlock.type.match(/^(heading-(one|two|three|four|five|six))$/) && true || false
    },
    func: (change, event, matches) => {
      change.splitBlock(1).setBlocks(EBlockType.Paragraph);
      return false;
    }
  }),
  // delete heading
  HandleTrigger({
    hotkey: 'backspace',
    condition: {
      change: change => (change.value.selection as any).start.offset === 0
    },
    func: (change) => {
      const {startBlock} = change.value;
      const headingMatches = startBlock.type.match(/^(heading-(one|two|three|four|five|six))$/);

      if (headingMatches) {
        const alph = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];
        const level = alph.findIndex(obj => obj === headingMatches[2]);

        if (level > 0) {
          change.setBlocks(EBlockType.Paragraph);
          ((change as any).moveFocusToStartOfNode(startBlock) as Change).insertText(`${'#'.repeat(level)} `);
        }
      }
    }
  })
];

const ListPlugins = [
  // add bulleted list item
  HandleTrigger({
    hotkey: 'space',
    condition: {
      before: /^([-*+])$/
    },
    func: (change) => {
      const {startBlock} = change.value;

      change.setBlocks(EBlockType.ListItem);
      change.wrapBlock(EBlockType.BulletedList);
      ((change as any).moveFocusToStartOfNode(startBlock) as Change).delete();
    }
  }),
  // delete bulleted list item
  HandleTrigger({
    hotkey: 'backspace',
    condition: {
      change: change => change.value.startBlock.type === EBlockType.ListItem && (change.value.selection as any).start.offset === 0
    },
    func: (change) => {
      const {startBlock} = change.value;
      change.setBlocks(EBlockType.Paragraph);
      // change.unwrapBlock(EBlockType.BulletedList); FIXME: Unwrap if first one
      ((change as any).moveFocusToStartOfNode(startBlock) as Change).insertText('- ');
    }
  }),
  // add checkbox
  HandleTrigger({
    hotkey: ']',
    condition: {
      before: /^(\[(\s|x))$/,
      change: change => change.value.startBlock.type === EBlockType.ListItem
    },
    func: (change, event, matches) => {
      console.log(matches!.before);
      const checked = matches!.before!.reduce((acc, group) => acc || group.includes('x'), false);
      console.log(`Checked: ${checked}`);
      // TODO: add a checkbox, dammit
      // change.insertInline({ type: `input`, data: { htmlAttributes: { type: 'checkbox', checked: false } } });
    }
  }),
  // enter on list-item
  HandleTrigger({
    hotkey: 'enter',
    condition: {
      change: change => change.value.startBlock.type === EBlockType.ListItem
    },
    func: (change, event, matches) => {
      change.splitBlock(1).setBlocks(EBlockType.ListItem);
      return false;
    }
  }),
  // increase indent
  HandleTrigger({
    hotkey: 'tab',
    condition: {
      change: change => change.value.startBlock.type === EBlockType.ListItem
    },
    func: (change) => {
      change.wrapBlock(EBlockType.BulletedList);
    }
  }),
  // decrease indent
  HandleTrigger({
    hotkey: 'shift+tab',
    condition: {
      change: change => change.value.startBlock.type === EBlockType.ListItem
    },
    func: (change) => {
      change.unwrapBlock(EBlockType.BulletedList);
    }
  })
];

const CodePlugins = [
  // add code line
  HandleTrigger({
    hotkey: '`',
    func: (change) => {
      const {startBlock} = change.value;

      (change.insertInline({type: EInlineType.CodeLine, data: {htmlAttributes: {class: ''}}}) as any).moveFocusForward(1);
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

const MarkPlugins = [
  // add bold mark
  HandleTrigger({
    hotkey: '*',
    condition: {
      before: /^(\*)$/
    },
    func: (change) => {
      console.log("BOLDIFY?");
      // (change.addMark({ type: `bold` }) as any).moveFocusForward(1);
      // change.wrapBlock('code');
    }
  }),
  // delete bold mark
  // HandleTrigger({
  //   hotkey: 'backspace',
  //   func: (change) => {
  //     // const { startBlock, selection } = change.value;
  //     // if ((selection as any).start.offset != 0) return;
  //     //
  //     // if (startBlock.type === 'list-item') {
  //     //   change.setBlocks(EBlockType.Paragraph);
  //     //   change.unwrapBlock(EBlockType.BulletedList);
  //     //   ((change as any).moveFocusToStartOfNode(startBlock) as Change).insertText('- ');
  //     // }
  //   }
  // })
];

const TablePlugins: any[] = [
  HandleTrigger({
    hotkey: 'up',
    condition: {
      change: change => change.value.startBlock.type === EBlockType.TableCell
    },
    func: (change) => {
      // const { startBlock } = change.value;
      console.log(`UP`);
    }
  })
];

export default [
  ...BlockQuotePlugins,
  ...HeadingPlugins,
  ...ListPlugins,
  ...CodePlugins,
  ...MarkPlugins,
  ...TablePlugins
];