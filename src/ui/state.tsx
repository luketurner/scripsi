import { action, autorun, observable } from 'mobx';
import * as React from 'react';

import { SNode } from '../nodes';
import store from '../store';

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
  @observable public menus: Map<string, boolean>;

  @observable public defaultNotifyDuration: number;

  @observable public openDialog: JSX.Element;

  constructor() {
    this.isSaving = false;
    this.menus = new Map();
    this.focusedNode = null;
    this.hoveredNode = null;
    this.openDialog = null;
  }

}

const uiState = new UIState();
export default uiState;
