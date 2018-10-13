import { observable } from 'mobx';
import { AuthStatus, BackendSettings } from '../../settings/backends';

/**
 * Abstract class defining shared behavior for persistence backends.
 * Individual backends should extend this class and implement the abstract _methods.
 *
 * @export
 * @abstract
 * @class Backend
 */
export abstract class BackendClient {
  @observable public lastUpdate: number = 0; // Timestamp of the last update to the backend
  @observable public wip: Promise<any>; // set when there is work in progress for the backend
  @observable public settings: BackendSettings;

  constructor(params?: Partial<BackendClient>) {
    this.wip = params.wip || Promise.resolve();
    this.settings = params.settings;
    if (!this.settings) throw new Error('BackendClient requires settings property to exist');
  }

  // Abstract private methods to be implemented by each subclass. TODO -- can I do abstract private methods?
  public abstract _load(key: string): Promise<string>;
  public abstract _save(key: string, value: string): Promise<any>;
  public abstract _reset(key: string): Promise<any>;
  public abstract _authenticate(): Promise<void>;

  // TODO -- do we need to reassign `this.wip = this.wip.then()`, or just do `this.wip.then()`?
  public async load(key: string): Promise<string> {
    this.wip = this.wip.then(async () => this._load(key));
    return this.wip;
  }

  public async save(key: string, value: string, timestamp: number): Promise<void> {
    this.wip = this.wip.then(async () => {
      await this._save(key, value);
      this.lastUpdate = timestamp;
    });
    return this.wip;
  }

  public async reset(key: string): Promise<void> {
    this.wip = this.wip.then(async () => this._reset(key));
    return this.wip;
  }

  public async authenticate(): Promise<void> {
    this.wip = this.wip.then(async () => {
      this.settings.authStatus = AuthStatus.PreAuthentication;
      return this._authenticate();
    });
    return this.wip;
  }

}
