export abstract class SettingsObject {
  constructor(params?: Partial<SettingsObject>) {
    if (!params) return;
    Object.assign(this, params);
  }
}
