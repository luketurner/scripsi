import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import { Button, FormGroup, ButtonGroup, NonIdealState } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/labs';

import { NodeType } from '../../nodes';
import nodeStore from '../../nodes/store';
import uiState from '../state';

const styles = require('./props-popover.scss');

export default CSSModule(observer(() => {
  const focusedNodeId = uiState.focusedNode;
  let popoverContent;

  if (focusedNodeId) {
    const focusedNode = nodeStore.getNode(focusedNodeId);
    popoverContent = (
      <div>
        <FormGroup label='Node Type'>
          <ButtonGroup minimal={true}>
              <Button iconName='paragraph' onClick={() => focusedNode.setType(NodeType.Text)}>Paragraph</Button>
              <Button iconName='properties' onClick={() => focusedNode.setType(NodeType.ListItem)}>Unordered List</Button>
              <Button iconName='code' onClick={() => focusedNode.setType(NodeType.CodeBlock)}>Code Block</Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup label='Properties'>
          {focusedNode.props ? <div>TODO: Property editor</div> : <div>Node has no property fields</div>}
        </FormGroup>
      </div>
    );
  } else {
    popoverContent = (
      <NonIdealState
        visual='error'
        title='No focused node'
        description='Focus a node to edit its properties.'
      />
    );
  }

  return (
    <Popover2 placement='bottom-start'>
      <Button className='pt-minimal' iconName='settings'>Properties</Button>
      <div styleName='properties' className='pt-focus-disabled'>
        {popoverContent}
      </div>
    </Popover2>
  );
}), styles);
