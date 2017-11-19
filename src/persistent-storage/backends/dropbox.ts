const Dropbox = require('dropbox');

import { autorun, observable } from 'mobx';
import settings from '../../settings/store';
import { Backend } from './index';

export default class DropboxBackend extends Backend {

  public name = 'dropbox';
  public dropboxClient;

  constructor() {
    super();
    this.dropboxClient = new Dropbox();
    autorun(() => {
      const accessToken = settings.settings.dropbox.accessToken;
      console.debug('Updating Dropbox access token', accessToken);
      this.dropboxClient.setAccessToken(accessToken);
    });
  }

  public async _load(key) {
    return null;
  }

  public async _save(key, value) {
    return null;
  }

  public async _reset(key) {
    return null;
  }
}
