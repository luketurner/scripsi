import { observer } from 'mobx-react';
import * as React from 'react';
import { state } from '..';
import { nodes } from '../../main';
import { NodeView } from '../node-view';
import { SettingsView } from '../settings-view';
import { ContentView } from '../state';
import { HelpView } from '../help-view';

export const Content = observer(() => (
  <div>
    {(state.content === ContentView.Settings && <SettingsView />)
      || (state.content === ContentView.Help && <HelpView />)
      || <NodeView nodeId={nodes.viewRootNode} />}
  </div>
));
