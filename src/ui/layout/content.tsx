import { observer } from 'mobx-react';
import * as React from 'react';
import { state } from '..';
import { nodes } from '../../main';
import { NodeView } from '../node-view';
import { SettingsView } from '../settings-view';
import { ContentView } from '../state';

export const Content = observer(() => (
  <div>
    {(state.content === ContentView.Settings && <SettingsView />)
      || <NodeView nodeId={nodes.viewRootNode} />}
  </div>
));
