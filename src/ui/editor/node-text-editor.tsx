import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { NodeType, SNode } from '../../nodes';
import nodeStore from '../../nodes/store';
import uiState from '../state';
import TextEditor, { EditorKeyHandler } from './text-editor';

interface NodeTextEditorProps {
  node: SNode;
  plugins?: any[];
  isMultiline?: boolean;
  onTab?: EditorKeyHandler<KeyboardEvent>;
}

export default observer(({ node, plugins = [], isMultiline = false, onTab: onTabProp }: NodeTextEditorProps) => {
  const onChange = v => node.setContent(v);

  // When we receive a tab, "indent" the node by demoting it in the hierarchy.
  // If the shift key was pressed, the node is "un-indented" (promoted) instead.
  const onTab = action((event: KeyboardEvent): Draft.DraftHandleValue => {
    if (onTabProp) return onTabProp(event);
    if (event.shiftKey) {
      node.promote();
    } else {
      node.demote();
    }
    uiState.focusedNode = node.id; // Should normally be focused anyway?
    return 'handled';
  });

  // ensures the UIState focusedNode changes when the user clicks around
  const onFocus = action(() => {
    uiState.focusedNode = node.id;
  });

  // When we recieve a backspace, the TextEditor will only bubble it up
  const onBackspace = action((editorState: Draft.EditorState) => {
    if (node.id === nodeStore.viewRootNode) return 'not-handled';

    const hasText = editorState.getCurrentContent().hasText();
    if (hasText) return 'not-handled'; // don't delete the node unless it's empty

    uiState.focusedNode = node.parent; // TODO -- focus last sibling instead
    node.remove();
    return 'handled';
  });

  // Instead of adding a new Draft block, we usually want to create a new node.
  // Normally, Enter is a new node, and Shift-Enter is a new line in the existing node.
  // if isMultiline is set, the behavior reverses.
  const onReturn = action((e: KeyboardEvent): Draft.DraftHandleValue => {
    if (isMultiline !== e.shiftKey) return 'not-handled';
    const newChild = new SNode();
    node.addChildNode(newChild);
    uiState.focusedNode = newChild.id;
    return 'handled';
  });

  const editorType = ({
    [NodeType.Code]: 'code-block'
  }[node.type] || 'paragraph') as Draft.DraftBlockType;

  return (
    <TextEditor
      type={editorType}
      content={node.content}
      isFocused={uiState.focusedNode === node.id}

      // event handler props
      onChange={onChange}
      onFocus={onFocus}

      // keybinding-related props
      onReturn={onReturn}
      onTab={onTab}
      onBackspace={onBackspace}
    />
  );
});
