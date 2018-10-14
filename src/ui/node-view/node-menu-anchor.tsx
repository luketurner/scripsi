import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import * as React from 'react';
import { nodes } from '../../main';
import { NodeAncestry, NodeType, SNode } from '../../nodes';

interface NodeMenuAnchorProps {
  node: SNode;
  ancestry: NodeAncestry;
}

@observer
@ContextMenuTarget
export class NodeMenuAnchor extends React.Component<NodeMenuAnchorProps, {}> {

  public constructor(props) {
    super(props);
  }

  public render() {
    return <div>{this.props.children}</div>;
  }

  public renderContextMenu() {
    const node = this.props.node;
    const ancestry = this.props.ancestry;
    return (
      <Menu>
        <MenuItem text='Indent' onClick={() => nodes.demoteNode(node.id, ancestry)} />
        <MenuItem text='Outdent' onClick={() => nodes.promoteNode(node.id, ancestry)} />
        <MenuItem text='Node Type'>
          <MenuItem
            icon='paragraph'
            text='Heading'
            disabled={node.type === NodeType.Heading}
            onClick={node.setTypeToHeading}
          />
          <MenuItem
            icon='paragraph'
            text='Paragraph'
            disabled={node.type === NodeType.Text}
            onClick={node.setTypeToText}
          />
          <MenuItem
            icon='properties'
            text='List Item'
            disabled={node.type === NodeType.ListItem}
            onClick={node.setTypeToList}
          />
          <MenuItem
            icon='code'
            text='Code'
            disabled={node.type === NodeType.Code}
            onClick={node.setTypeToCodeBlock}
          />
        </MenuItem>
      </Menu>
    );
  }
}
