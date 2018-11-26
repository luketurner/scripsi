import { action, computed, observable } from 'mobx';
import { getLocation } from '../util/location';

export type RequestedClick = Partial<Pick<MouseEvent, 'screenX' | 'screenY' | 'clientX' | 'clientY'>>

/**
 * Class defining ephemeral, UI-specific state.
 * This state is not persisted anywhere.
 *
 * @export
 * @class UIState
 */
export class UIState {
  @observable public focusedNode?: Uuid = null;
  @observable public hoveredNode?: Uuid = null;
  @observable public openContextMenu?: Uuid = null;

  @computed public get path(): string {
    return getLocation().hash.substring(1) || '';
  }

  public togglePath(path: string) {
    window.location.hash = (this.path === path ? '' : `#${path}`);
  }

  @action('ui.hoverNode')
  public hoverNode(id) {
    this.hoveredNode = id;
  }

  @action('ui.unhoverNode')
  public unhoverNode(id) {
    if (this.hoveredNode === id) this.hoveredNode = null;
  }

}
