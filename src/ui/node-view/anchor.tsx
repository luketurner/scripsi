import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { uiState } from '..';
import { NodeDragAnchor } from './node-drag-anchor';
import { NodeMenuAnchor } from './node-menu-anchor';

export const NodeViewAnchor = observer(({ node }) => {
  const hoverNode = action('ui.hoverNode', () => uiState.hoveredNode = node.id);
  const unhoverNode = action('ui.unhoverNode', () => uiState.hoveredNode = null);

  return (
    <NodeMenuAnchor node={node}>
      <NodeDragAnchor node={node}>
        <div
          className='w-16 h-2 highlightable flex cursor-pointer'
          onMouseEnter={hoverNode}
          onMouseLeave={unhoverNode}
          onClick={node.toggleCollapsed}
        />
      </NodeDragAnchor>
    </NodeMenuAnchor>
  );
});
