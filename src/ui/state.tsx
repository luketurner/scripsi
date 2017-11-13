import { action, autorun, observable } from 'mobx';
import * as React from 'react';

import { SNode } from '../nodes';
import store from '../store';
import { SidebarPanelType } from './sidebar';

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
  @observable public hoveredNode: Uuid;
  @observable public openSidebarPanel: SidebarPanelType;
  @observable public menus: Map<string, boolean>;

  constructor() {
    this.isSaving = false;
    this.openSidebarPanel = SidebarPanelType.Search;
    this.menus = new Map();
    this.focusedNode = null;
    this.hoveredNode = null;
  }
}

const uiState = new UIState();
export default uiState;
