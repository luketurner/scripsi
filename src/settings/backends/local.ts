import { observable } from 'mobx';
import { BackendSettings } from '.';

export class LocalBackendSettings extends BackendSettings {

  @observable public readonly type = 'local';

}
