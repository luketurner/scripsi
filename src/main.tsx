import * as _ from 'lodash';
import { runInAction } from 'mobx';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { render } from 'react-dom';

import { SNode } from './nodes';
import { SNodeStore } from './nodes/store';
import { PersistentStorageDriver } from './persistent-storage/driver';
import { MissingStateError } from './persistent-storage/errors';
import { Settings } from './settings';
import UI from './ui/index';
import { isDevelopment } from './util';

// Include all 3rd party CSS
require('draft-js/dist/Draft.css');
require('!style-loader!css-loader!normalize.css/normalize.css');
require('!style-loader!css-loader!@blueprintjs/core/lib/css/blueprint.css');
require('!style-loader!css-loader!@blueprintjs/icons/lib/css/blueprint-icons.css');

// Declare and export singleton instances of our state containers
export const nodes = new SNodeStore();
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
      const rootNode = nodes.addNode(new SNode({
        // tslint:disable-next-line:max-line-length
        content: '{"entityMap":{},"blocks":[{"key":"50fo4","text":"Welcome to Scripsi. Press Enter to create a new node and start typing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
      }));

      nodes.rootNode = rootNode.id;
      nodes.viewRootNode = rootNode.id;
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
