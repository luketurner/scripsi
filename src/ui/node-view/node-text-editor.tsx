import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { NodeContext } from '.';
import { state } from '..';
import { nodes } from '../../main';
import { textFromHtml, textToHtml } from '../../markup/text';
import { NodeAncestry, NodePosition, NodeType, SNode } from '../../nodes';
import { InputHandlerKeymap, InputResult, KeyCode } from '../components/input-handler';
import { TextEditor } from '../components/text-editor';

interface ContentToHtmlOpts {
  isFocused?: boolean;
}

interface NodeTextEditorProps {
  node: SNode;
  context: NodeContext;
  isMultiline?: boolean;
  newNodeType?: NodeType;
  newNodePosition?: 'sibling' | 'child';
  keymap?: InputHandlerKeymap;
  contentToHtml?: (x: string, opts?: ContentToHtmlOpts) => string;
  contentFromHtml?: (x: string, opts?: ContentToHtmlOpts) => string;
}

const defaultContentToHtml = (content, { isFocused }) => isFocused ? content : textToHtml(content);
const defaultContentFromHtml = (content, { isFocused }) => isFocused ? content : textFromHtml(content);

export const NodeTextEditor = observer(({
  context: nodeContext,
  isMultiline = false,
  keymap,
  node,
  newNodeType,
  newNodePosition,
  contentToHtml = defaultContentToHtml,
  contentFromHtml = defaultContentFromHtml,
}: NodeTextEditorProps) => {
  const { ancestry, isFocused } = nodeContext;

  // ensures the UIState focusedNode changes when the user clicks around
  const onClick = () => {
    state.focusedNode = node.id;
    return InputResult.Handled;
  };

  const handleReturn = action(() => {
    const newPosition: NodePosition = ancestry.length === 0 || newNodePosition === 'child'
      ? [node.id, 0]
      : [ancestry[ancestry.length - 1][0], ancestry[ancestry.length - 1][1] + 1];
    const newNode = nodes.createNode({
      type: newNodeType || node.type
    }, newPosition);
    state.focusedNode = newNode.id;
    return InputResult.Handled;
  });

  const defaultKeymap = {
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

      const [ parentNodeId, childIndex ] = lastPosition;
      const siblingId = nodes.getNode(parentNodeId).children[childIndex - 1];
      state.focusedNode = siblingId || parentNodeId; // If no earlier sibling was found, select the parent.
      return InputResult.Handled;
    })
  };

  const onChange = (newContent: string) => node.setContent(newContent);

  return (
    <TextEditor
      onClick={onClick}
      keymap={{ ...defaultKeymap, ...keymap }}
      onChange={onChange}
      content={node.content}
      contentToHtml={(x: string) => contentToHtml(x, { isFocused })}
      htmlToContent={(x: string) => contentFromHtml(x, { isFocused })}
      isFocused={isFocused}
    />
  );
});
