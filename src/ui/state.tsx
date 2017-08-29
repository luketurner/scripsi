import { observable, action } from 'mobx';
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
  @observable viewRootNode: SNode;
  @observable hoveredNode: SNode;
  @observable openSidebarPanel: SidebarPanelType;

  constructor() {
    this.isSaving = false;
    this.openSidebarPanel = SidebarPanelType.Search;
    this.viewRootNode = store.nodes.rootNode;
  }
}

const uiState = new UIState();
export default uiState;