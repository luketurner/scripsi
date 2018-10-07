import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core';
import * as React from 'react';
import { SNode, NodeType } from '../../nodes';

@ContextMenuTarget
export class NodeMenuAnchor extends React.Component<{ node: SNode }, {}> {

  public constructor(props) {
    super(props);
  }

  public render() {
    return <div>{this.props.children}</div>;
  }

  public renderContextMenu() {
    const node = this.props.node;
    return (
      <Menu>
        <MenuItem text='Indent' onClick={node.demote} />
        <MenuItem text='Outdent' onClick={node.promote} />
        <MenuItem text='Node Type'>
          <MenuItem
            iconName='paragraph'
            text='Paragraph'
            disabled={node.type === NodeType.Text}
            onClick={() => node.setType(NodeType.Text)}
          />
          <MenuItem
            iconName='properties'
            text='List Item'
            disabled={node.type === NodeType.ListItem}
            onClick={() => node.setType(NodeType.ListItem)}
          />
          <MenuItem
            iconName='code'
            text='Code'
            disabled={node.type === NodeType.CodeBlock}
            onClick={() => node.setType(NodeType.CodeBlock)}
          />
        </MenuItem>
      </Menu>
    );
  }
};