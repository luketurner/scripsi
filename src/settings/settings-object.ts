export abstract class SettingsObject {
  constructor(params?: Partial<SettingsObject>) {
    if (!params) return;
    this.hydrate(params);
  }

  public hydrate(params: Partial<SettingsObject>) {
    Object.assign(this, params);
  }
}
