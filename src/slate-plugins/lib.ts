import {Change, Value} from "slate";
import {Editor} from "slate-react";
import isHotkey, {HotKeyOptions} from "is-hotkey";

export function HandleTrigger(options: { hotkey: string, hotkeyOptions?: HotKeyOptions, condition?: { before?: RegExp; after?: RegExp; change?: (change: Change) => boolean; }, func: (change: Change, event: Event, matches: { before: RegExpMatchArray | null; after: RegExpMatchArray | null; } | null) => void | boolean }) {
  if (!options.func) throw new Error('You must provide a `func` option.');
  if (!options.hotkey) throw new Error('You must provide a `hotkey` option.');

  const hotkey = isHotkey(options.hotkey, options.hotkeyOptions);

  function getConditionMatches(change: Change): { before: RegExpMatchArray | null; after: RegExpMatchArray | null; } | null {
    const { value } = change;
    const {selection, startText} = value;
    const {start}: { start: { key: string, offset: number } } = selection as any;
    const {text} = startText;

    let after = true;
    let afterMatches = null;
    let before = true;
    let beforeMatches = null;
    let changeCondition = true;

    if (options.condition && options.condition.change) {
      changeCondition = options.condition.change(change);
    }

    if (options.condition && options.condition.after) {
      const string = text.slice(start.offset);
      afterMatches = string.match(options.condition.after);
      if (!afterMatches) {
        after = false;
      }
    }

    if (options.condition && options.condition.before) {
      const string = text.slice(0, start.offset);
      beforeMatches = string.match(options.condition.before);
      if (!beforeMatches) {
        before = false;
      }
    }

    // Return null if any conditions are false.
    if (!before || !after || !changeCondition) return null;

    if (after && afterMatches) afterMatches![0] = afterMatches![0].replace(/\s+$/, '');
    if (before && beforeMatches) beforeMatches![0] = beforeMatches![0].replace(/^\s+/, '');

    return {before: beforeMatches, after: afterMatches}
  }

  return {
    onKeyDown(event: KeyboardEvent, change: Change): void | boolean {
      if (hotkey(event)) {
        const hasConditions = options.condition && (options.condition.before || options.condition.after || options.condition.change);

        if (hasConditions) {
          // handle regex matches
          const matches = getConditionMatches(change);
          if (!matches) { return; }

          event.preventDefault();
          return options.func(change, event, matches);
        } else {
          event.preventDefault();
          return options.func(change, event, null);
        }
      }
    }
  }
}