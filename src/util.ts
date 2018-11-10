import { observable } from "mobx";

export const isDevelopment = process.env.NODE_ENV === 'development';

// Convert "evented" selection API into "observable" one so we can easily use it in component logic.
// TODO -- this seems a bit weird. Boxing the collection directly doesn't seem to work, unless I'm missing something.
const selection = observable.box({ current: window.getSelection() }, { deep: false });
document.addEventListener('selectionchange', () => selection.set({ current: window.getSelection() }));

// Expose read-only access
export const getSelection = () => selection.get().current;