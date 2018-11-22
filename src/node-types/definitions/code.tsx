import { observer } from 'mobx-react';
import * as React from 'react';

import { INodeType, NodeTypeProps } from '..';
import { codeToHtml, htmlToCode } from '../../markup/code';
import { ChildNodeList } from '../../ui/node-view/child-node-list';
import { NodeTextEditor } from '../../ui/node-view/node-text-editor';

const definition: INodeType = {
  component: observer(({ node, ancestry, isVisible }: NodeTypeProps) => {
    return (
      <div>
        {isVisible && <NodeTextEditor node={node} isMultiline={true} ancestry={ancestry} textToHtml={codeToHtml} htmlToText={htmlToCode} />}
        <ChildNodeList node={node} ancestry={ancestry} />
      </div>
    );
  })
};

export default definition;
