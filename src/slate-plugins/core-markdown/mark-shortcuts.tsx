import { Change } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
import {EMarkType} from "../../slate-types";

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');

function onKeyDown(event: KeyboardEvent, change: Change): void {
  let mark;

  if (isBoldHotkey(event)) {
    mark = EMarkType.Bold;
  } else if (isItalicHotkey(event)) {
    mark = EMarkType.Italic;
  } else if (isUnderlinedHotkey(event)) {
    mark = EMarkType.Underline;
  } else {
    return;
  }

  event.preventDefault();
  change.toggleMark(mark);
  return;
}

export default {
  onKeyDown
}