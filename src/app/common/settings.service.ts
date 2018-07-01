import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  /**
   * Config string containing the public IP address to the file server
   * @type {string}
   */
  public serverPath = 'http://46.101.204.225:8090/';
  //public serverPath = '';
  public filesUrl = `${this.serverPath}api/tree`;
  public apiFilePath = `${this.serverPath}api/file/`;

  refreshPath() {
    this.filesUrl = this.serverPath + 'api/tree';
    this.apiFilePath = this.serverPath + 'api/file/';
  }
}
