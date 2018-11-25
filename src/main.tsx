import * as _ from 'lodash';
import { runInAction } from 'mobx';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { render } from 'react-dom';

import { NodeType, SNodeSet } from './nodes';
import { PersistentStorageDriver } from './persistent-storage/driver';
import { MissingStateError } from './persistent-storage/errors';
import { Settings } from './settings';
import { state, UI } from './ui/index';
import { isDevelopment } from './util/env';
import { uuid } from './util/uuid';
import { getSample } from './nodes/samples';

// Declare and export singleton instances of our state containers
export const nodes = new SNodeSet();
export const settings = new Settings();
export const storageDriver = new PersistentStorageDriver(settings, nodes);

export async function main() {

  // useStrict(true); // mobx -- don't allow state modifications outside actions

  try {
    console.debug('Loading settings from browser...');
    await storageDriver.loadSettingsFromBrowser();
  } catch (e) {
    console.error('Encountered an unexpected error loading existing settings', e);
    console.error('Could not load existing settings; using default settings');
  }
  storageDriver.watchSettings();

  try {
    console.debug('Loading data from backend...');
    await storageDriver.loadStateFromBackend();
  } catch (e) {

    if (e instanceof MissingStateError) {
      console.debug('No existing database found. Using starter document.');
    } else {
      console.error('Encountered an unexpected error loading existing database', e);
      console.error('Could not load existing database; using starter document');
    }

    runInAction('persistence.setDefaultData', () => {
      nodes.hydrate(getSample('default'));
      // state.focusedNode = focusedNodeId; TODO -- re-implement this?
    });
  }
  storageDriver.watchState();

  render(
    <div>
      <UI />
      {isDevelopment ? <DevTools position={{ bottom: 0, right: 20 }}/> : undefined}
    </div>,
    document.getElementById('app')
  );
}

main();
