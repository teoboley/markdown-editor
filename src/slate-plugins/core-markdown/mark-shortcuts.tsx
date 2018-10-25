import {EMarkType} from "../../slate-types";
import {HandleTrigger} from "../lib";

const BoldPlugins = [
  // bold hotkey
  HandleTrigger({
    hotkey: 'mod+b',
    func: (change) => {
      change.toggleMark(EMarkType.Bold);
    }
  }),
  // add bold mark
  HandleTrigger({
    hotkey: '*',
    condition: {
      before: /^(\*)$/ // FIXME
    },
    func: (change) => {
      // TODO
      // (change.addMark({ type: `bold` }) as any).moveFocusForward(1);
      // change.wrapBlock('code');
    }
  }),
  // TODO: delete bold mark
];

const ItalicPlugins = [
  // bold hotkey
  HandleTrigger({
    hotkey: 'mod+i',
    func: (change) => {
      change.toggleMark(EMarkType.Italic);
    }
  })
];

const UnderlinePlugins = [
  // bold hotkey
  HandleTrigger({
    hotkey: 'mod+u',
    func: (change) => {
      change.toggleMark(EMarkType.Underline);
    }
  })
];

// TODO: strikethrough

export default [
  ...BoldPlugins,
  ...ItalicPlugins,
  ...UnderlinePlugins
]