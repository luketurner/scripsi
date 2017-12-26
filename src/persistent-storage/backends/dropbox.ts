const Dropbox = require('dropbox');

import { autorun, observable } from 'mobx';
import settings from '../../settings/store';
import { Backend } from './index';

export default class DropboxBackend extends Backend {

  public name = 'dropbox';
  public dropboxClient;

  private lastKnownRev;

  constructor() {
    super();
    this.dropboxClient = new Dropbox();
    const backendSettings = settings.settings.backends;

    autorun(() => {
      const clientId = backendSettings.dropbox.appClientId;
      console.debug('Updating Dropbox client ID', clientId);
      this.dropboxClient.setClientId(clientId);
    });

    autorun(() => {
      const accessToken = backendSettings.dropbox.accessToken;
      console.debug('Updating Dropbox access token', accessToken);
      this.dropboxClient.setAccessToken(accessToken);
    });
  }

  public async _load(key: string): Promise<string> {
    const { rev, fileBlob } = await this.dropboxClient.filesDownload({
      path: this.getFilename(key)
    });
    this.lastKnownRev = rev;
    return fileBlob; // TODO -- stringify me
  }

  public async _save(key, value) {
    return this.dropboxClient.filesUpload({
      path: this.getFilename(key),
      contents: JSON.stringify(value),
      mode: 'overwrite' // TODO -- change to using 'update' mode
      // mode: {
      //   '.tag': 'update',
      //   update: this.lastKnownRev
      // }
    });
  }

  public async _reset(key) {
    return null;
  }

  /**
   * Begins the Dropbox OAuth flow. Navigates away from the page.
   * 
   * @memberof DropboxBackend
   */
  public async authenticate() {
    const state = 'asdf'; // TODO
    const redirectUri = new URL(window.location.href);
    redirectUri.pathname = '/dropbox_auth';
    const dropboxOAuthUrl = this.dropboxClient.getAuthenticationUrl(redirectUri.href);

    window.location.assign(dropboxOAuthUrl);
  }

  private getFilename(key) {
    return `/${key.replace('|', '-')}.scripsidb`;
  }
}
