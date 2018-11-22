import { observable } from 'mobx';
import { SettingsObject } from './settings-object';

export class CodeSettings extends SettingsObject {
  @observable public theme: string;
  @observable public languages?: string[];
  @observable public defaultLanguage: string;
  @observable public autoDetectLanguage = true;
  @observable public colorizeInline = true;
  @observable public colorizeBlocks = true;
}
