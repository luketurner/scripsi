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
  @observable public focusedNode?: Uuid = null;
  @observable public hoveredNodes: Uuid[] = [];
  @observable public openContextMenu?: Uuid = null;

  @computed public get path(): string {
    return getLocation().hash.substring(1) || '';
  }

  public togglePath(path: string) {
    window.location.hash = (this.path === path ? '' : `#${path}`);
  }

}
