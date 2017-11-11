const Dropbox = require('dropbox');

import settings from '../../settings/store';
import { observable, autorun } from 'mobx';
import { Backend } from './index';

export default class DropboxBackend extends Backend {

  name = 'dropbox';
  dropboxClient;

  constructor() {
    super();
    this.dropboxClient = new Dropbox();
    autorun(() => {
      const accessToken = settings.dropboxConfig.accessToken;
      console.debug('Updating Dropbox access token', accessToken);
      this.dropboxClient.setAccessToken(accessToken);
    });
  }

  async _load(key) {

  }

  async _save(key, value) {

  }

  async _reset(key) {

  }
}