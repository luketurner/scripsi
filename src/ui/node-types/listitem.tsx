import { map } from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { NodeTextEditor } from '../../ui/editor';
import NodeView from '../node-view';
import { NodeTypeProps } from './types';

const styles = require('./listitem.css');

export default CSSModule(observer(({ node }: NodeTypeProps) => {
  const childrenElements = map(node.children, child =>
    <NodeView nodeId={child} key={child} />
  );

  return (
    <div styleName='item'>
      {<NodeTextEditor node={node} />}
      {node.collapsed || childrenElements}
    </div>
  );
}), styles);
