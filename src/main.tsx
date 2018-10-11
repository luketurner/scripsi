

import * as _ from 'lodash';
import { runInAction } from 'mobx';
import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { render } from 'react-dom';

import { SNode } from './nodes';
import nodeStore from './nodes/store';
import { nodeStorage } from './persistent-storage';
import { MissingStateError } from './persistent-storage/errors';
import UI from './ui/index';
import { isDevelopment } from './util';
import { parse } from 'query-string';
import settings from './settings/store';

// Include Draft.js CSS declarations
require('draft-js/dist/Draft.css');
require('!style-loader!css-loader!normalize.css/normalize.css');
require('!style-loader!css-loader!@blueprintjs/core/lib/css/blueprint.css');
require('!style-loader!css-loader!@blueprintjs/icons/lib/css/blueprint-icons.css');

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
        // tslint:disable-next-line:max-line-length
        content: '{"entityMap":{},"blocks":[{"key":"50fo4","text":"Welcome to Scripsi. Press Enter to create a new node and start typing!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'
      }));

      nodeStore.rootNode = rootNode.id;
      nodeStore.viewRootNode = rootNode.id;
    });
  }

  // Handle OAuth redirect workflows here -- if we're redirected to a certain URL,
  // then some auth settings (like access tokens) should be provided in the URL as
  // part of the OAuth permission granting process.
  // TODO -- maybe a better place to put this logic?
  if (window.location.search === '?dropbox_auth=true') {
    const accessToken = parse(window.location.hash)['access_token'];
    if (accessToken) {
      console.debug('Found Dropbox access token from OAuth fragment.');
      settings.settings.backends.dropbox.accessToken = accessToken;
    }
  }

  render(
    <div>
      <UI />
      {isDevelopment ? <DevTools position={{ bottom: 0, right: 20 }}/> : undefined}
    </div>,
    document.getElementById('app')
  );
}

main();
