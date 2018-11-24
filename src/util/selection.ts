import { observable } from 'mobx';

// Convert "evented" selection API into "observable" one so we can easily use it in component logic.
// TODO -- this seems a bit weird. Boxing the collection directly doesn't seem to work, unless I'm missing something.
const selection = observable.box({ current: window.getSelection() }, { deep: false });
document.addEventListener('selectionchange', () => selection.set({ current: window.getSelection() }));

// Expose read-only access
export const getSelection = () => selection.get().current;

/**
 * Focuses given node and moves selection to the end of it, so typed characters will be appended to the existing content.
 * Will also unselect anything else selected on the screen.
 *
 * @param {Node} el HTML Node (element, text node, etc.)
 */
export const focusEnd = (el: Node) => {
  const sel = getSelection();

  sel.removeAllRanges();      // in case there is other stuff selected, unselect it.
  sel.selectAllChildren(el);  // Select the full node
  const range = sel.getRangeAt(0);
  range.collapse(false);      // Collapse range to the end
  // Note -- sel.collapseToEnd(); works great, but not supported in as many browsers as range.collapse
};
