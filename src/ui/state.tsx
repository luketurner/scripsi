import { computed, observable } from 'mobx';
import { getLocation } from '../util/location';

/**
 * Class defining ephemeral, UI-specific state.
 * This state is not persisted anywhere.
 *
 * @export
 * @class UIState
 */
export class UIState {
  @observable public focusedNode: Uuid;
  @observable public hoveredNodes: Uuid[];

  @computed public get path(): string {
    return getLocation().hash.substring(1) || '';
  }

  constructor() {
    this.focusedNode = null;
    this.hoveredNodes = [];
  }

  public togglePath(path: string) {
    window.location.hash = (this.path === path ? '' : `#${path}`);
  }

}
