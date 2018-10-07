import * as LocalForage from 'localforage';
import * as _ from 'lodash';
import { action, autorunAsync, observable, runInAction } from 'mobx';
import { Settings } from './index';

export class SettingStore {
  @observable public settings: Settings;   // currently applied settings
  @observable public lastSaved: number;    // raw timestamp when settings were last saved

  private storagePrefix = 'scripsi:settings:'; // global prefix for saving/laoding settings
  private storageClient: Storage;              // localstorage client for saving/loading settings

  constructor({ loadFromBrowser = true }) {
    this.storageClient = window.localStorage;

    if (loadFromBrowser && this.loadFromBrowser()) {
      console.debug('Loaded settings.');
    } else {
      console.debug('No existing settings. Using defaults.');
      this.settings = new Settings();
    }

    autorunAsync(() => {
      try {
        this.saveToBrowser(JSON.stringify(this.settings));
      } catch (e) {
        // TODO -- handle errors better?
        console.error('Error saving settings', e);
      }
    }, 100);
  }

  public loadFromBrowser(): Settings | void {
    const browserLastSaved = this.getBrowserLastSaved();
    if (!browserLastSaved) {
      return null; // no settings to load
    }
    if (browserLastSaved < this.lastSaved) {
      // TODO -- do we need to do anything here?
      console.warn(`May be overwriting local settings (local=${this.lastSaved} new=${browserLastSaved})`);
    }

    this.settings = this.getBrowserSettings();
    return this.settings;
  }

  @action('settings.saveToBrowser')
  private saveToBrowser(settingsToSave: string) {

    // check saved setting timestamp to avoid overwriting changes from other open tabs
    const browserLastSaved = this.getBrowserLastSaved();

    const currentTimestamp = Date.now();

    if (this.lastSaved < browserLastSaved) {
      // TODO -- prompt user and ask them if they want to load the newer settings or overwrite them
      // tslint:disable-next-line:max-line-length
      throw new Error(`Saving would overwrite newer updates from another tab (${this.lastSaved} -> ${browserLastSaved} -> ${currentTimestamp}`);
    }

    console.debug(`Saving settings to local storage (${this.lastSaved} -> ${currentTimestamp})`);

    this.setBrowserSettings(settingsToSave);
    this.setBrowserLastSaved(currentTimestamp);

    this.lastSaved = currentTimestamp;
  }

  private getBrowserLastSaved(): number {
    const lastSaved = Number.parseInt(this.storageClient.getItem(`${this.storagePrefix}last_saved`));
    if (!lastSaved) {
      return null; // In case .parseInt() returns NaN, coerce it to null
    }
    return lastSaved;
  }

  private setBrowserLastSaved(newValue: number) {
    this.storageClient.setItem(`${this.storagePrefix}last_saved`, newValue.toString());
  }

  private getBrowserSettings(): Settings {
    const savedSettings = JSON.parse(this.storageClient.getItem(`${this.storagePrefix}settings`));
    return _.merge(new Settings(), savedSettings);
  }

  private setBrowserSettings(newValue: string) {
    this.storageClient.setItem(`${this.storagePrefix}settings`, newValue);
  }

}

const settings = new SettingStore({
  loadFromBrowser: true
});
export default settings;
