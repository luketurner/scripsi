import { runInAction } from 'mobx';
import * as _ from 'lodash';
import * as React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';

import { SNode } from './nodes';
import store from './store';
import UI from './ui/index';
import { MissingStateError } from './persistent-storage/errors';

// Copies index.html to the output directory
require('file-loader?name=[name].[ext]!./index.html');

// Include Draft.js CSS declarations
require('../node_modules/draft-js/dist/Draft.css');

async function main() {
  try {
    console.debug('Attempting to load persistent data...');

    await store.persistence.loadFromBackend();

    console.debug('Loaded state from backend.');

  } catch (e) {
    if (e instanceof MissingStateError) {
      console.debug('No persistent data found. Using starter document.');      
    } else {
      console.error('Encountered an unexpected error loading persistent data', e);
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

