import { observable } from 'mobx';

export class DropboxSettings {
  @observable public accessToken: string;
  @observable public appClientId: string;

  constructor(parseQueryString = true) {
    this.appClientId = '0o6k67elcefrowz'; // Dropbox Scripsi client ID
    this.accessToken = '';
  }
}
