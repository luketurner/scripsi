import { action, autorun, observable } from 'mobx';

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

  @observable public content: ContentView;
  @observable public modal: JSX.Element;

  constructor() {
    this.isSaving = false;
    this.menus = new Map();
    this.focusedNode = null;
    this.hoveredNodes = [];
    this.content = null;
    this.modal = null;
  }

  public toggleSettings() {
    this.content = (this.content === ContentView.Settings ? null : ContentView.Settings);
  }

  public toggleHelp() {
    this.content = (this.content === ContentView.Help ? null : ContentView.Help);
  }

}
