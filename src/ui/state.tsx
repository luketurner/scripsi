import { action, autorun, computed, observable } from 'mobx';
import { getLocation } from '../util/location';

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

  @observable public modal: JSX.Element;

  @computed public get path(): string {
    return getLocation().hash.substring(1);
  }

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
  }

  public toggleSettings() {
    window.location.hash = (this.path === 'settings' ? '' : '#settings');
  }

  public toggleHelp() {
    window.location.hash = (this.path === 'help' ? '' : '#help');
  }

}
