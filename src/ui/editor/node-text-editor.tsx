import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { SNode } from '../../nodes';
import { UIState } from '../state';
import TextEditor from './text-editor';

interface NodeTextEditorProps {
  node: SNode,
  uiState: UIState
}

export default observer<NodeTextEditorProps>(({ node, uiState }) => 
  <TextEditor
    content={node.content}
    onChange={(v) => node.setContent(v)}
    onReturn={() => {
      node.addChildNode(new SNode());
      return true;
    }}
    onTab={(event: any) => {
      if (event.shiftKey) {
        node.promote();
      } else {
        node.demote();
      }
      return false;
    }}
    onBackspace={() => {
      if (node !== uiState.viewRootNode) {
        node.remove();
      }
    }}
  />
);