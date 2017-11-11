import * as _ from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

import Icon, { IconType } from '../icon';
import NodeListPanel from './node-list-panel';
import SettingsPanel from './settings-panel';
import { GlobalStore } from '../../store';

const styles = require('./index.css');

// Must be declared before importing uiState -- TODO - fix this somehow?
export enum SidebarPanelType {
  Empty = 1,
  Search,
  Settings
}

import uiState from '../state';

interface SidebarProps {
  store: GlobalStore
}

const sidebarPanels = {
  [SidebarPanelType.Empty]: {
    component: () => <div />
  },
  [SidebarPanelType.Settings]: {
    title: 'Settings',
    component: SettingsPanel,
    icon: IconType.Cog
  },
  [SidebarPanelType.Search]: {
    title: 'Nodes',
    component: NodeListPanel,
    icon: IconType.Stack
  }
};

export default CSSModule(observer<SidebarProps>(({ store }) => {
  const openPanel = sidebarPanels[uiState.openSidebarPanel];

  return <div styleName="container">
    <div styleName="buttons">
      { _.map(_.omit(sidebarPanels, SidebarPanelType.Empty), (panel, panelType) => 
        <div key={panel.title} 
             title={panel.title}
             styleName="button"
             onClick={action(() => uiState.openSidebarPanel = panelType)}>
          <Icon type={panel.icon} title={panel.title} />
        </div>
      )}
    </div>
    <div styleName="panel">
      <openPanel.component uiState={uiState} store={store} />
    </div>
  </div>;
}), styles);