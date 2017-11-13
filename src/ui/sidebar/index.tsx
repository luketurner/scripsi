import * as _ from 'lodash';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as CSSModule from 'react-css-modules';

// Must be declared before importing uiState -- TODO - fix this somehow?
export enum SidebarPanelType {
  Empty = 1,
  Search,
  Settings,
  Toolbox
}

import { GlobalStore } from '../../store';
import Icon, { IconType } from '../icon';
import NodeListPanel from './node-list-panel';
import SettingsPanel from './settings-panel';
import ToolboxPanel from './toolbox-panel';

const styles = require('./index.css');

import uiState from '../state';

interface SidebarProps {
  store: GlobalStore;
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
  },
  [SidebarPanelType.Toolbox]: {
    title: 'Toolbox',
    component: ToolboxPanel,
    icon: IconType.Hammer
  }
};

const SidebarButton = CSSModule(({ title, icon, panelType }) => {
  const toggleSidebar = action(() => {
    const newPanel = uiState.openSidebarPanel === panelType ? SidebarPanelType.Empty : panelType;
    uiState.openSidebarPanel = newPanel;
  });
  let styleNames = 'button';
  if (uiState.openSidebarPanel === panelType) {
    styleNames += ' selected';
  }
  return <div styleName='button' key={title} onClick={toggleSidebar}>
    <Icon type={icon} title={title} />
  </div>;
}, styles, { allowMultiple: true });

export default CSSModule(observer<SidebarProps>(({ store }) => {
  const openPanel = sidebarPanels[uiState.openSidebarPanel];

  return <div styleName='container'>
    <div styleName='buttons'>
      <SidebarButton panelType={SidebarPanelType.Toolbox} title='Toolbox' icon={IconType.Hammer} />
      <SidebarButton panelType={SidebarPanelType.Search} title='Node List' icon={IconType.Stack} />
      <SidebarButton panelType={SidebarPanelType.Settings} title='Settings' icon={IconType.Cog} />
    </div>
    <div styleName='panel'>
      <openPanel.component />
    </div>
  </div>;
}), styles);
