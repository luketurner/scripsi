import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { SNode, NodeType } from '../../nodes';
import nodeStore from '../../nodes/store';
import uiState from '../state';
import TextEditor, { EditorKeyHandler } from './text-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createKaTeXPlugin from 'draft-js-katex-plugin';
import * as katex from 'katex';

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();
const kaTeXPlugin = createKaTeXPlugin({katex});
const markdownPlugin = createMarkdownShortcutsPlugin();

interface NodeTextEditorProps {
  node: SNode;
  plugins?: Array<any>;
  isMultiline?: boolean;
  onTab?: EditorKeyHandler<KeyboardEvent>
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
    [NodeType.CodeBlock]: 'code-block'
  }[node.type] || 'paragraph') as Draft.DraftBlockType;

  return (
    <TextEditor
      type={editorType}
      content={node.content}
      isFocused={uiState.focusedNode === node.id}
      plugins={[kaTeXPlugin, markdownPlugin, linkifyPlugin, hashtagPlugin]}

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
