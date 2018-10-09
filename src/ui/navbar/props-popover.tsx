import { observer } from 'mobx-react';
import * as React from 'react';

import { Button, ButtonGroup, FormGroup, NonIdealState, Popover } from '@blueprintjs/core';

import { NodeType } from '../../nodes';
import nodeStore from '../../nodes/store';
import uiState from '../state';

export default observer(() => {
  const focusedNodeId = uiState.focusedNode;
  let popoverContent;

  if (focusedNodeId) {
    const focusedNode = nodeStore.getNode(focusedNodeId);
    popoverContent = (
      <div>
        <FormGroup label='Node Type'>
          <ButtonGroup minimal={true}>
              <Button icon='paragraph' onClick={focusedNode.setTypeToText}>Paragraph</Button>
              <Button icon='properties' onClick={focusedNode.setTypeToList}>Unordered List</Button>
              <Button icon='code' onClick={focusedNode.setTypeToCodeBlock}>Code Block</Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup label='Properties'>
          {focusedNode.props ? <div>TODO: Property editor</div> : <div>Node has no property fields</div>}
        </FormGroup>
        <FormGroup label='raw'>
          <textarea value={JSON.stringify(focusedNode)} />
        </FormGroup>
      </div>
    );
  } else {
    popoverContent = (
      <NonIdealState
        icon='error'
        title='No focused node'
        description='Focus a node to edit its properties.'
      />
    );
  }

  return (
    <Popover position='bottom-left' minimal={true} content={popoverContent}>
      <Button className='pt-minimal' icon='settings'>Properties</Button>
    </Popover>
  );
});
