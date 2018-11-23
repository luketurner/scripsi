import { observer } from 'mobx-react';
import * as React from 'react';
import { state } from '..';
import { nodes } from '../../main';
import { HelpView } from '../help-view';
import { NodeView } from '../node-view';
import { SettingsView } from '../settings-view';

const contentForPath = (path: string) => ({
  '': <NodeView nodeId={nodes.viewRootNode} />,
  'help': <HelpView />,
  'settings': <SettingsView />,
}[path]);

export const Content = observer(() => (
  <div>
    {contentForPath(state.path)}
  </div>
));
