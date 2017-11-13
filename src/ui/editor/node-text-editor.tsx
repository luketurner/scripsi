import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { SNode } from '../../nodes';
import nodeStore from '../../nodes/store';
import uiState from '../state';
import TextEditor from './text-editor';

interface NodeTextEditorProps {
  node: SNode
}

export default observer<NodeTextEditorProps>(({ node }) => 
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
      event.preventDefault();
      if (event.shiftKey) {
        node.promote();
      } else {
        node.demote();
      }
      uiState.focusedNode = node.id; // Should normally be focused anyway?
      return false;
    })}
    onBackspace={action(() => {
      if (node.id === nodeStore.viewRootNode) return;
      uiState.focusedNode = node.parent;
      node.remove();
    })}
    onFocus={action(() => {
      uiState.focusedNode = node.id;
    })}
  />
);