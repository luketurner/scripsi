import * as _ from 'lodash';
import { runInAction, useStrict } from 'mobx';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { render } from 'react-dom';

import { SNode } from './nodes';
import { MissingStateError } from './persistent-storage/errors';
import store from './store';
import { nodeStorage } from './persistent-storage';
import UI from './ui/index';

// Copies index.html to the output directory
require('file-loader?name=[name].[ext]!./index.html');

// Include Draft.js CSS declarations
require('../node_modules/draft-js/dist/Draft.css');
require('../node_modules/prism-themes/themes/prism-vs.css');

export async function main() {

  // useStrict(true); // mobx -- don't allow state modifications outside actions

  try {

    console.debug('Attempting to load existing database...');
    await nodeStorage.loadFromBackend();
    console.debug('Successfully loaded existing database.');

  } catch (e) {

    if (e instanceof MissingStateError) {
      console.debug('No existing database found. Using starter document.');
    } else {
      console.error('Encountered an unexpected error loading existing database', e);
      console.error('Could not load existing database; using starter document');
    }

    runInAction('persistence.setDefaultData', () => {
      const rootNode = store.nodes.addNode(new SNode({
        content: '{"entityMap":{},"blocks":[{"key":"50fo4","text":"Welcome to Scripsi. Press Enter to create a new node and start typing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
      }));

      store.nodes.rootNode = rootNode.id;
      store.nodes.viewRootNode = rootNode.id;
    });
  }

  render(
    <div>
      <UI store={store} />
      <DevTools />
    </div>,
    document.getElementById('app')
  );
}

main();
