import { listLanguages } from 'highlight.js';
import { computed, observable, observe } from 'mobx';
import { SettingsObject } from './settings-object';

const cachedRequires = new Map();
const requiredTheme = (theme: string) => {
  if (!cachedRequires.has(theme)) {
    cachedRequires.set(theme, require(`!style-loader/useable!css-loader!../../node_modules/highlight.js/styles/${theme}.css`));
  }
  return cachedRequires.get(theme);
};

const allLanguages: string[] = listLanguages();

export class CodeSettings extends SettingsObject {
  @observable public theme = 'github';
  @observable public disabledLanguages = new Map<string, true>(); // Note -- using blacklist so that newly added languages are supported automatically.
  @observable public defaultLanguage: string; // if null, language is auto-detected
  @observable public colorizeInline = true;
  @observable public colorizeBlocks = true;

  @computed public get allowedLanguages() {
    return new Map<string, true>(allLanguages.filter(lang => !this.disabledLanguages.has(lang)).map<[string, true]>(lang => [lang, true]));
  }

  constructor(...params) {
    super(...params);

    observe(this, 'theme', change => {
      if (change.type !== 'update') return;
      console.debug('changing code theme from', change.oldValue, 'to', change.newValue);
      if (change.oldValue) requiredTheme(change.oldValue).unref();
      if (change.newValue) requiredTheme(change.newValue).ref();
    }, true);
  }
}
