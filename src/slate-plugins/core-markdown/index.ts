import BlockRender from "./block-render";
import BlockShortcuts from "./block-shortcuts";
import MarkRender from "./mark-render";
import MarkShortcuts from "./mark-shortcuts";
import InlineRender from "./inline-render";

export default [ BlockRender, ...BlockShortcuts, MarkRender, MarkShortcuts, InlineRender ];