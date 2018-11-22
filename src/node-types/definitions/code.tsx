import { observer } from 'mobx-react';
import * as React from 'react';

import { INodeType, NodeTypeProps } from '..';
import { codeFromHtml, codeToHtml } from '../../markup/code';
import { ChildNodeList } from '../../ui/node-view/child-node-list';
import { NodeTextEditor } from '../../ui/node-view/node-text-editor';

const definition: INodeType = {
  component: observer(({ node, ancestry, isVisible }: NodeTypeProps) => {
    const contentToHtml = (content: string, { focused }) => focused ? `<code>${content}</code>` : codeToHtml(content);
    const contentFromHtml = (content: string) => codeFromHtml(content);
    return (
      <div>
        <div spellCheck={false}>
          {isVisible && <NodeTextEditor node={node} isMultiline={true} ancestry={ancestry} contentToHtml={contentToHtml} contentFromHtml={contentFromHtml} />}
        </div>
        <ChildNodeList node={node} ancestry={ancestry} />
      </div>
    );
  })
};

export default definition;
