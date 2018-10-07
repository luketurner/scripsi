import { observable } from 'mobx';

import { Backend } from '../../persistent-storage/backends';
import { DropboxSettings } from './dropbox';

export class BackendSettings {
  @observable public databaseName: string;
  @observable public primary: string;
  @observable public secondary: string[];
  @observable public dropbox: DropboxSettings;

  constructor() {
    this.databaseName = 'scripsi';
    this.primary = 'local';
    this.secondary = [];
    this.dropbox = new DropboxSettings();
  }

  // public getPrimaryBackend(): Backend {
  //   if (!this.primary) {
  //     return null;
  //   }

  //   return persistenceStore.backends.get(this.primary);
  // }

  // public *getSecondaryBackends(): IterableIterator<Backend> {
  //   for (const backend of this.secondary) {
  //     yield persistenceStore.backends.get(backend);
  //   }
  // }

  // public *getAllBackends(): IterableIterator<Backend> {
  //   const primaryBackend = this.getPrimaryBackend();
  //   if (primaryBackend) yield primaryBackend;

  //   yield* this.getSecondaryBackends();
  // }
}
