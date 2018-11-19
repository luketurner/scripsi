import { observable } from 'mobx';

const location = observable.box({ current: window.location }, { deep: false });
window.addEventListener('hashchange', () => location.set({ current: window.location }));

// Expose read-only access
export const getLocation = () => location.get().current;
