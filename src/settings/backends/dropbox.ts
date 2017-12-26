import { observable } from 'mobx';
import { parse } from 'query-string';

export class DropboxSettings {
  @observable public accessToken: string;
  @observable public appClientId: string;

  constructor(parseQueryString = true) {
    this.appClientId = '0o6k67elcefrowz'; // Dropbox Scripsi client ID
    this.accessToken = '';

    // Handle OAuth redirect workflows here -- if we're redirected to a certain URL,
    // then some auth settings (like access tokens) should be provided in the URL as
    // part of the OAuth permission granting process.
    // TODO -- maybe a better place to put this logic?
    console.log('dropbox', window.location.pathname, parse(window.location.hash)['access_token']);
    if (parseQueryString && window.location.pathname === '/dropbox_auth') {
      const accessToken = parse(window.location.hash)['access_token'];
      if (accessToken) {
        console.log('got access token', accessToken);
        this.accessToken = accessToken;
      }
    }
  }
}
