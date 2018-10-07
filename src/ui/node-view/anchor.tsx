import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { SNode } from '../../nodes';
import uiState from '../state';

import { NodeDragAnchor } from './node-drag-anchor';
import { NodeMenuAnchor } from './node-menu-anchor';

const styles = require('./anchor.scss');

export const NodeViewAnchor = CSSModule(observer(({ node }) => {
  const hoverNode = action('ui.hoverNode', () => uiState.hoveredNode = node.id);
  const unhoverNode = action('ui.unhoverNode', () => uiState.hoveredNode = null);

  return (
    <NodeMenuAnchor node={node}>
      <NodeDragAnchor node={node}>
        <div
          styleName='anchor'
          onMouseEnter={hoverNode}
          onMouseLeave={unhoverNode}
          onClick={node.toggleCollapsed}
        />
      </NodeDragAnchor>
    </NodeMenuAnchor>
  );
}), styles);
