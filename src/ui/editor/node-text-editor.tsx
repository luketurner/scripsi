import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { SNode } from '../../nodes';
import nodeStore from '../../nodes/store';
import { UIState } from '../state';
import TextEditor from './text-editor';

interface NodeTextEditorProps {
  node: SNode,
  uiState: UIState
}

export default observer<NodeTextEditorProps>(({ node, uiState }) => 
  <TextEditor
    isFocused={uiState.focusedNode === node.id}
    content={node.content}
    onChange={(v) => node.setContent(v)}
    onReturn={action(() => {
      const newChild = new SNode();
      node.addChildNode(newChild);
      uiState.focusedNode = newChild.id;
      return true;
    })}
    onTab={action((event: any) => {
      if (event.shiftKey) {
        node.promote();
      } else {
        node.demote();
      }
      uiState.focusedNode = node.id; // Should normally be focused anyway? TODO -- not working?
      return false;
    })}
    onBackspace={action(() => {
      if (node.id === nodeStore.viewRootNode) return;
      uiState.focusedNode = node.parent;
      node.remove();
    })}
  />
);