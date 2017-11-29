import { isMultilineText } from 'tslint-react/utils';
import { map } from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { NodeTextEditor } from '../../ui/editor';
import NodeView from '../node-view';
import { NodeTypeProps } from './types';
import * as Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism-plugin';
import createCodeEditorPlugin from 'draft-js-code-editor-plugin';

const prismPlugin = createPrismPlugin({
  // Provide your own instance of PrismJS
  prism: Prism
});
// const codeEditorPlugin = createCodeEditorPlugin();
const styles = require('./codeblock.scss');

export default CSSModule(observer(({ node }: NodeTypeProps) => {
  const childrenElements = map(node.children, child =>
    <NodeView nodeId={child} key={child} />
  );

  return (
    <div styleName='item'>
      {<NodeTextEditor 
        node={node}
        plugins={[prismPlugin]}
        isMultiline={true} />}
      {node.collapsed || childrenElements}
    </div>
  );
}), styles);
