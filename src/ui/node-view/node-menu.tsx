import * as React from 'react';
import { NodeContext } from '.';
import { nodes } from '../../main';
import { NodeType, SNode } from '../../nodes';
import { MenuAnchor } from '../components/menu/anchor';
import { MenuButton } from '../components/menu/button';
import { Menu } from '../components/menu/menu';
import { SubMenu } from '../components/menu/submenu';

interface NodeMenuAnchorProps {
  node: SNode;
  context: NodeContext;
  children: React.ReactNode;
  customMenuEntries: React.ReactNode;
}

export const NodeMenu = ({ node, context, children, customMenuEntries }: NodeMenuAnchorProps) => {
  const { ancestry } = context;
  const nodeTypeMenu = (
    <Menu>
      <MenuButton disabled={node.type === NodeType.Text} onClick={node.setTypeToText}>Text</MenuButton>
      <MenuButton disabled={node.type === NodeType.Heading} onClick={node.setTypeToHeading}>Heading</MenuButton>
      <MenuButton disabled={node.type === NodeType.Code} onClick={node.setTypeToCodeBlock}>Code</MenuButton>
      <MenuButton disabled={node.type === NodeType.ListItem} onClick={node.setTypeToList}>List</MenuButton>
      <MenuButton disabled={node.type === NodeType.OrderedListItem} onClick={node.setTypeToOrderedList}>Numbered List</MenuButton>
      <MenuButton disabled={node.type === NodeType.DictionaryItem} onClick={node.setTypeToDictionaryList}>Dictionary List</MenuButton>
      <MenuButton disabled={node.type === NodeType.Todo} onClick={node.setTypeToTodo}>Todo</MenuButton>
    </Menu>
  );

  const menu = (
    <Menu>
      {customMenuEntries}
      <MenuButton onClick={() => nodes.promoteNode(node.id, ancestry)}>Promote</MenuButton>
      <MenuButton onClick={() => nodes.demoteNode(node.id, ancestry)}>Demote</MenuButton>
      <SubMenu menu={nodeTypeMenu}>Node Type</SubMenu>
    </Menu>
  );
  return (
    <MenuAnchor menu={menu}>
      { children }
    </MenuAnchor>
  );
};
