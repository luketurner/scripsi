export abstract class SettingsObject {
  constructor(params?: Partial<SettingsObject>) {
    if (!params) return;
    this.hydrate(params);
  }

  public hydrate(params: any) { // TODO -- somehow fix this type for inheriting this method
    return Object.assign(this, params);
  }
}
