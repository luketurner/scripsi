import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { INodeType, NodeTypeProps } from '..';
import { settings } from '../../main';
import { codeFromHtml, codeToHtml } from '../../markup/code';
import { Chooser } from '../../ui/components/form/chooser';
import { MenuRow } from '../../ui/components/menu/row';
import { NodeTextEditor } from '../../ui/node-view/node-text-editor';
import { NodeViewBase } from '../../ui/node-view/view-base';

const definition: INodeType = {
  component: observer(({ node, context }: NodeTypeProps) => {

    const contentToHtml = (content: string, { focused }) => focused ? `<code>${content}</code>` : codeToHtml(content, { language: node.props['syntax-language'] });
    const contentFromHtml = (content: string) => codeFromHtml(content);
    const customMenuEntries = (
      <div>
        <MenuRow>
          Language
          <Chooser
            value={node.props['syntax-language']}
            onChange={v => node.props['syntax-language'] = v}
            choices={Array.from(settings.code.allowedLanguages.keys()).map(value => ({ value, label: value }))}
          />
        </MenuRow>
      </div>
    );
    return (
      <NodeViewBase node={node} context={context} customMenuEntries={customMenuEntries}>
        <div spellCheck={false}>
          <NodeTextEditor node={node} context={context} isMultiline={true} contentToHtml={contentToHtml} contentFromHtml={contentFromHtml} />
        </div>
      </NodeViewBase>
    );
  })
};

export default definition;
