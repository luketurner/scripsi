import * as _ from 'lodash';
import { runInAction, useStrict } from 'mobx';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { render } from 'react-dom';

import { SNode } from './nodes';
import { MissingStateError } from './persistent-storage/errors';
import nodeStore from './nodes/store';
import { nodeStorage } from './persistent-storage';
import UI from './ui/index';

// Copies index.html to the output directory
require('file-loader?name=[name].[ext]!./index.html');

// Include Draft.js CSS declarations
require('draft-js/dist/Draft.css');
require('prism-themes/themes/prism-vs.css');
require('!style-loader!css-loader!@blueprintjs/core/dist/blueprint.css');

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
      const rootNode = nodeStore.addNode(new SNode({
        content: '{"entityMap":{},"blocks":[{"key":"50fo4","text":"Welcome to Scripsi. Press Enter to create a new node and start typing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
      }));

      nodeStore.rootNode = rootNode.id;
      nodeStore.viewRootNode = rootNode.id;
    });
  }

  render(
    <div>
      <UI />
      {PRODUCTION ? undefined : <DevTools />}
    </div>,
    document.getElementById('app')
  );
}

main();
