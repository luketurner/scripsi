import { observable } from 'mobx';
import { BackendSettings } from '.';

export class DropboxBackendSettings extends BackendSettings {
  @observable public readonly type = 'dropbox';
  @observable public appClientId: string;
  @observable public accessToken: string;

  constructor(params?: Partial<DropboxBackendSettings>) {
    super(params);
    params = params || {};
    this.appClientId = params.appClientId || '0o6k67elcefrowz'; // Dropbox Scripsi client ID
    this.accessToken = params.accessToken;
  }
}
