import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { NodeType, SNode } from '../../nodes';
import nodeStore from '../../nodes/store';
import uiState from '../state';

import { ContextMenuTarget, Menu, MenuItem } from '@blueprintjs/core';

const styles = require('./handle.scss');

const InnerHandle = CSSModule(observer(({ node }) => {
  const hoverNode = action('ui.hoverNode', () => uiState.hoveredNode = node.id);
  const unhoverNode = action('ui.unhoverNode', () => uiState.hoveredNode = null);

  return (
    <div
      styleName='handle'
      onMouseEnter={hoverNode}
      onMouseLeave={unhoverNode}
      onClick={() => node.toggleCollapsed()}
    />
  );
}), styles);

@observer
@ContextMenuTarget
export default class NodeViewAnchor extends React.Component<{ node: SNode }, {}> {

  public constructor(props) {
    super(props);
  }
  public render() {
  
    return (
      <div>
        <InnerHandle node={this.props.node}/>
      </div>
    );
  }

  public renderContextMenu() {
    return (
      <Menu>
        <MenuItem text='Indent' onClick={() => this.props.node.demote()} />
        <MenuItem text='Outdent' onClick={() => this.props.node.promote()} />
        <MenuItem text='Node Type'>
          <MenuItem
            iconName='paragraph'
            text='Paragraph'
            disabled={this.props.node.type === NodeType.Text}
            onClick={() => this.props.node.setType(NodeType.Text)}
          />
          <MenuItem
            iconName='properties'
            text='List Item'
            disabled={this.props.node.type === NodeType.ListItem}
            onClick={() => this.props.node.setType(NodeType.ListItem)}
          />
          <MenuItem
            iconName='code'
            text='Code'
            disabled={this.props.node.type === NodeType.CodeBlock}
            onClick={() => this.props.node.setType(NodeType.CodeBlock)}
          />
        </MenuItem>
      </Menu>
    );
  }
}

// export default CSSModule(NodeViewAnchor, styles);


//  CSSModule(observer(({ node }) => {


//   const setNodeType = [
//     NodeType.Text,
//     NodeType.ListItem
//   ].reduce<any>((memo, nodeType) => {
//     memo[nodeType] = () => node.setType(NodeType.ListItem);
//     return memo;
//   }, {});

//   // return (
//   //   <MenuAnchor id={node.id}>

//   //     <div
//   //       styleName='handle'
//   //       onMouseEnter={hoverNode}
//   //       onMouseLeave={unhoverNode}
//   //       onClick={() => node.toggleCollapsed()}
//   //     />

//   //     <Menu id={node.id}>

//   //       <MenuItem onClick={() => node.promote()}>
//   //         Promote
//   //       </MenuItem>

//   //       <MenuItem onClick={() => node.demote()}>
//   //         Demote
//   //       </MenuItem>

//   //       <SubMenu label={<div>Node Types</div>}>
//   //         <MenuItem disabled={node.type === NodeType.Text} onClick={setNodeType[NodeType.Text]}>Plain Text</MenuItem>
//   //         <MenuItem disabled={node.type === NodeType.ListItem} onClick={setNodeType[NodeType.ListItem]}>List</MenuItem>
//   //       </SubMenu>

//   //     </Menu>

//   //   </MenuAnchor>
//   // );
// }), styles);
