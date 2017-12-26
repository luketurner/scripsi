import { observable } from 'mobx';

import { WIPException } from '../errors';

export enum BackendOperation {
  Load,
  Save,
  Reset
}

/**
 * Abstract class defining shared behavior for persistence backends.
 * Individual backends should extend this class and implement the abstract _methods.
 *
 * @export
 * @abstract
 * @class Backend
 */
export abstract class Backend {
  @observable public name: string;           // Backend name -- should be globally unique
  @observable public lastUpdate: number = 0; // Timestamp of the last update to the backend (used for determining whether it is up-to-date)
  @observable public wip: Promise<any>; // set when there is work in progress for the backend

  constructor() {
    this.wip = Promise.resolve();
  }

  // Abstract private methods to be implemented by each subclass. TODO -- can I do abstract private methods?
  public abstract _load(key: string): Promise<string>;
  public abstract _save(key: string, value: string): Promise<any>;
  public abstract _reset(key: string): Promise<any>;

  // TODO -- do we need to reassign `this.wip = this.wip.then()`, or just do `this.wip.then()`?
  public async load(key: string): Promise<string> {
    this.wip = this.wip.then(async () => this._load(key));
    return this.wip;
  }

  public async save(key: string, value: string): Promise<void> {
    this.wip = this.wip.then(async () => this._save(key, value));
    return this.wip;
  }

  public async reset(key: string): Promise<void> {
    this.wip = this.wip.then(async () => this._reset(key));
    return this.wip;
  }

}

export { default as LocalBackend } from './local';
export { default as DropboxBackend } from './dropbox';
