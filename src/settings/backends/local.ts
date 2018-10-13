import { observable } from 'mobx';
import { BackendSettings, AuthStatus } from '.';

export class LocalBackendSettings extends BackendSettings {

  @observable public readonly type = 'local';

  constructor(params?: Partial<LocalBackendSettings>) {
    super(params);
    this.authStatus = AuthStatus.Authenticated; // No auth needed for local backend
  }

}
