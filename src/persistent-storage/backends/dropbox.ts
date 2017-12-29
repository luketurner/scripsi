const Dropbox = require('dropbox');

import { autorun, observable } from 'mobx';
import settings from '../../settings/store';
import { Backend } from './index';

export default class DropboxBackend extends Backend {

  public name = 'dropbox';
  public dropboxClient;

  private lastKnownRev;

  /**
   * Creates an instance of DropboxBackend. Sets up observers that update our
   * properties if the Dropbox settings are changed by the user.
   * @memberof DropboxBackend
   */
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

  /**
   * Downloads the file from Dropbox and returns the contents as a string.
   * 
   * @param {string} key Dropbox filename
   * @returns {Promise<string>} Promise of file contents
   * @memberof DropboxBackend
   */
  public async _load(key: string): Promise<string> {
    const { rev, fileBlob } = await this.dropboxClient.filesDownload({
      path: this.getFilename(key)
    });
    this.lastKnownRev = rev;

    // Use FileReader to read data from the fileBlob. Since it uses an
    // event-based API, wrap it in a promise to make it work with async/await.
    const fileData = await new Promise<string>((resolve, reject) => {
      const blobReader = new FileReader();
      blobReader.addEventListener('loadend', () => {
        if (blobReader.error) return reject(blobReader.error);
        if (!blobReader.result) return reject(new Error('Empty/missing Dropbox file contents'));
        return resolve(blobReader.result);
      });
      blobReader.readAsText(fileBlob, 'utf8');
    });

    console.log('File date', fileData);
    return fileData;
  }

  /**
   * Saves a key by writing a new file to the Dropbox. Overwrites existing files with the same name.
   */
  public async _save(key: string, value: string) {
    return this.dropboxClient.filesUpload({
      path: this.getFilename(key),
      contents: value,
      mode: 'overwrite' // TODO -- change to using 'update' mode
      // mode: {
      //   '.tag': 'update',
      //   update: this.lastKnownRev
      // }
    });
  }

  /**
   * Resets the key by deleting the associated file from the Dropbox.
   */
  public async _reset(key: string) {
    return this.dropboxClient.filesDeleteV2({
      path: this.getFilename(key)
    });
  }

  /**
   * Begins the Dropbox OAuth flow. Navigates away from the page.
   * 
   * @memberof DropboxBackend
   */
  public async authenticate() {

    // TODO -- find a useful value for state. Maybe a content hash or something?
    const state = 'asdf';

    // Build redirect URL
    const redirectUri = new URL(window.location.href);
    redirectUri.pathname = '/dropbox_auth';

    // Redirect window to Dropbox authentication page.
    const dropboxOAuthUrl = this.dropboxClient.getAuthenticationUrl(redirectUri.href);
    window.location.assign(dropboxOAuthUrl);
  }

  /**
   * Returns a Dropbox filename corresponding to the given key.
   */
  private getFilename(key) {
    return `/${key.replace('|', '-')}.scripsidb`;
  }
}
