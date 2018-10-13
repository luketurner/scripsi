
import { Dropbox } from 'dropbox';
import { autorun, observable } from 'mobx';
import { parse } from 'query-string';
import { DropboxBackendSettings } from '../../settings/backends/dropbox';
import { AuthStatus, BackendClient } from './index';

export class DropboxBackendClient extends BackendClient {

  public dropboxClient;

  @observable public settings: DropboxBackendSettings;

  private lastKnownRev;

  /**
   * Creates an instance of DropboxBackend. Sets up observers that update our
   * properties if the Dropbox settings are changed by the user.
   * @memberof DropboxBackend
   */
  constructor(params?: Partial<DropboxBackendClient>) {
    super(params);
    this.dropboxClient = new Dropbox({});

    // Handle OAuth redirect workflows here -- if we're redirected to a certain URL,
    // then some auth settings (like access tokens) should be provided in the URL as
    // part of the OAuth permission granting process.
    // TODO -- maybe a better place to put this logic?
    if (window.location.search === '?dropbox_auth=true') {
      const accessToken = parse(window.location.hash)['access_token'];
      if (accessToken) {
        console.debug('Found Dropbox access token from OAuth fragment.');
        this.settings.accessToken = accessToken;
        this.authStatus = AuthStatus.Authenticated;
      }
    }

    autorun(() => {
      const clientId = this.settings.appClientId;
      console.debug('Updating Dropbox client ID', clientId);
      this.dropboxClient.setClientId(clientId);
    });

    autorun(() => {
      const accessToken = this.settings.accessToken;
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
        return resolve(blobReader.result as string);
      });
      blobReader.readAsText(fileBlob, 'utf8');
    });

    return fileData;
  }

  /**
   * Saves a key by writing a new file to the Dropbox. Overwrites existing files with the same name.
   */
  public async _save(key: string, value: string) {
    await this.dropboxClient.filesUpload({
      contents: value,
      mode: 'overwrite', // TODO -- change to using 'update' mode
      path: this.getFilename(key),
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
  public async _authenticate() {

    // TODO -- find a useful value for state. Maybe a content hash or something?
    const state = 'asdf';

    // Build redirect URL
    const redirectUri = new URL(window.location.href);
    redirectUri.search = '?dropbox_auth=true';

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
