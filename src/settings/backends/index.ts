import { observable } from 'mobx';

export enum AuthStatus {
  Unauthenticated = 'nauthenticated',
  PreAuthentication = 'pre-authentication',
  Authenticated = 'authenticated'
}

/**
 * Contains the configuration for an individual backend.
 *
 * @export
 * @abstract
 * @class BackendSettings
 */
export abstract class BackendSettings {
  @observable public name: string;
  @observable public readonly type: 'local' | 'dropbox'; // TODO
  @observable public databaseName: string;
  @observable public authStatus: AuthStatus;

  constructor(params?: Partial<BackendSettings>) {
    params = params || {};
    this.name = params.name;
    this.databaseName = params.databaseName;
    this.authStatus = params.authStatus || AuthStatus.Unauthenticated;
  }
}
