import { observable, action } from 'mobx';

export class DropboxSettings {
  @observable public accessToken: string;

  constructor() {
    this.accessToken = '';
  }
}