import { observable, action } from 'mobx';

import { Backend } from '../../persistent-storage/backends';
import { DropboxSettings } from './dropbox';
import { bind } from 'bind-decorator';

export class BackendSettings {
  @observable public databaseName: string;
  @observable public primary: string;
  @observable public secondary: string[];
  @observable public dropbox: DropboxSettings;

  constructor() {
    this.databaseName = 'scripsi';
    this.primary = 'local'; // TODO -- get from PersistentStore?
    this.secondary = ['dropbox'];
    this.dropbox = new DropboxSettings();
  }

  @bind
  @action('backendSettings.toggleSecondaryBackend')
  public toggleSecondaryBackend(backendName: string) {
    const ix = this.secondary.indexOf(backendName);
    if (ix === -1) {
      this.secondary.push(backendName);
    } else {
      this.secondary.splice(ix, 1);
    }
  }

  @bind
  @action('backendSettings.setPrimary')
  public setPrimary(backendName: string) {
    this.primary = backendName;
    this.removeSecondaryBackend(backendName);
  }

  @bind
  @action('backendSettings.addSecondaryBackend')
  public addSecondaryBackend(backendName: string) {
    if (this.primary === backendName) { return; }
    if (this.secondary.indexOf(backendName) !== -1) { return; }
    this.secondary.push(backendName);
  }

  @bind
  @action('backendSettings.removeSecondaryBackend')
  public removeSecondaryBackend(backendName: string) {
    const ix = this.secondary.indexOf(backendName);
    if (ix !== -1) { this.secondary.splice(ix, 1); }
  }

}
