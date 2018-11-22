import { observable } from 'mobx';
import { SettingsObject } from '../settings-object';

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
export abstract class BackendSettings extends SettingsObject {
  @observable public name: string;
  @observable public readonly type: 'local' | 'dropbox'; // TODO
  @observable public databaseName: string;
  @observable public authStatus: AuthStatus = AuthStatus.Unauthenticated;
}
