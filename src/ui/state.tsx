import { action, autorun, observable } from 'mobx';
import * as React from 'react';

import Notification from './notifier/notification';
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
  @observable public notifications: JSX.Element[];

  @observable public defaultNotifyDuration: number;

  constructor() {
    this.isSaving = false;
    this.openSidebarPanel = SidebarPanelType.Search;
    this.menus = new Map();
    this.focusedNode = null;
    this.hoveredNode = null;
    this.notifications = [];
    this.defaultNotifyDuration = 5000;
  }

  public pushNotification(notification: JSX.Element, duration: number) {
    this.notifications.push(notification);
    // TODO -- is this the right place for this logic?
    setTimeout(() => {
      const ix = this.notifications.findIndex(n => n === notification);
      if (ix) {
        this.notifications.splice(ix, 1);
      }
    }, duration || this.defaultNotifyDuration);
  }
}

const uiState = new UIState();
export default uiState;
