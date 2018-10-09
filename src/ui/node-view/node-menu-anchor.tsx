import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core';
import * as React from 'react';
import { NodeType, SNode } from '../../nodes';
import { observer } from 'mobx-react';

@observer
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
