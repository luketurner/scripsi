import { observer } from 'mobx-react';
import * as React from 'react';

import classNames = require('classnames');
import { NodeContext } from '.';
import { SNode } from '../../nodes';

interface NodeViewAnchorProps {
  node: SNode;
  context: NodeContext;
}

export const NodeViewAnchor = observer(({ node, context }: NodeViewAnchorProps) => {
  const bgColor = context.isOutlined || node.collapsed  ? 'bg-blue-light' : '';
  return (
    <div
      className={classNames('w-16 h-2 highlightable flex cursor-pointer', bgColor)}
      onClick={node.toggleCollapsed}
    />
  );
});
