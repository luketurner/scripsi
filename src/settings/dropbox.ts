import { observable, action } from 'mobx';

export class DropboxSettings {
  @observable public accessToken: string;
  @observable public appClientId: string;

  constructor() {
    this.appClientId = '0o6k67elcefrowz'; // Dropbox Scripsi client ID
    this.accessToken = '';
  }
}
