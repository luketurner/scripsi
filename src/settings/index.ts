import { observable } from 'mobx';

import { BackendSettings } from './backends';

export class Settings {
  @observable public backends: BackendSettings;

  constructor() {
    this.backends = new BackendSettings();
  }
}
