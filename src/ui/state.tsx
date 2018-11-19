import { action, autorun, observable, computed } from 'mobx';

export enum ContentView {
  Settings = 'settings',
  Help = 'help'
}

/**
 * Class defining ephemeral, UI-specific state.
 * This state is not persisted anywhere.
 *
 * @export
 * @class UIState
 */
export class UIState {
  @observable public isSaving: boolean;
  @observable public focusedNode: Uuid;
  @observable public hoveredNodes: Uuid[];
  @observable public menus: Map<string, boolean>;

  @observable public defaultNotifyDuration: number;

  @observable public path: string;
  @observable public modal: JSX.Element;

  @computed public get content(): ContentView {
    return { // Do this properly with reverse-enum lookup?
      help: ContentView.Help,
      settings: ContentView.Settings,
    }[this.path] || null;
  }

  constructor() {
    this.isSaving = false;
    this.menus = new Map();
    this.focusedNode = null;
    this.hoveredNodes = [];
    this.modal = null;
    this.path = window.location.hash.substring(1);

    autorun(() => {
      if (!this.path) return window.location.hash = '';
      window.location.hash = '#' + this.path;
    });
  }

  public toggleSettings() {
    this.path = (this.path === 'settings' ? null : 'settings');
  }

  public toggleHelp() {
    this.path = (this.path === 'help' ? null : 'help');
  }

}
