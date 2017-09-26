import { observable, action, autorun } from 'mobx';
import * as React from 'react';

import { SNode } from '../nodes';
import { SidebarPanelType } from './sidebar';
import store from '../store';

/**
 * Class defining ephemeral, UI-specific state.
 * This state is not persisted anywhere.
 * 
 * @export
 * @class UIState
 */
export class UIState {
  @observable isSaving: boolean;
  @observable focusedNode: Uuid;
  @observable hoveredNode: Uuid;
  @observable openSidebarPanel: SidebarPanelType;

  constructor() {
    this.isSaving = false;
    this.openSidebarPanel = SidebarPanelType.Search;
  }
}

const uiState = new UIState();
export default uiState;