import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { state } from '..';
import { nodes } from '../../main';
import { NodeAncestry, NodePosition, NodeType, SNode } from '../../nodes';
import { InputResult, KeyCode } from '../components/input-handler';
import { TextEditor } from '../components/text-editor';

interface NodeTextEditorProps {
  node: SNode;
  isMultiline?: boolean;
  ancestry: NodeAncestry;
}

export const NodeTextEditor = observer(({ node, isMultiline = false, ancestry }: NodeTextEditorProps) => {

  // ensures the UIState focusedNode changes when the user clicks around
  const onClick = () => {
    state.focusedNode = node.id;
    return InputResult.Handled;
  };

  const handleReturn = action(() => {
    const newPosition: NodePosition = ancestry.length === 0
      ? [node.id, 0]
      : [ancestry[ancestry.length - 1][0], ancestry[ancestry.length - 1][1] + 1];
    const newNode = nodes.createNode({}, newPosition);
    state.focusedNode = newNode.id;
    return InputResult.Handled;
  });

  const keymap = {
    [KeyCode.Enter]: e => isMultiline ? InputResult.NotHandled : handleReturn(),

    [`S-${KeyCode.Enter}`]: e => isMultiline ? handleReturn() : InputResult.NotHandled,

    [KeyCode.Tab]: e => {
      nodes.demoteNode(node.id, ancestry);
      return InputResult.Handled;
    },

    [`S-${KeyCode.Tab}`]: e => {
      nodes.promoteNode(node.id, ancestry);
      return InputResult.Handled;
    },

    [KeyCode.Backspace]: action((event, context) => {
      if (node.id === nodes.rootNode) return InputResult.NotHandled;
      if (node.id === nodes.viewRootNode) return InputResult.NotHandled;
      if (ancestry.length === 0) return InputResult.NotHandled;

      const hasText = !!context.content;
      if (hasText) return InputResult.NotHandled; // don't delete the node unless it's empty

      const lastPosition = ancestry[ancestry.length - 1];
      nodes.removeNode(node.id, lastPosition);
      state.focusedNode = lastPosition[0]; // TODO -- focus last sibling instead
      return InputResult.Handled;
    })
  };

  return (
    <TextEditor
      onClick={onClick}
      keymap={keymap}
      onChange={node.setContent}
      content={node.content}
      focused={state.focusedNode === node.id}
    />
  );
});
