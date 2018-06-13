import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  //public serverPath = 'http://46.101.204.225:8090/';
  public serverPath = '/';
  public filesUrl = this.serverPath + 'api/tree';
  public apiFilePath = this.serverPath + 'api/file/';
}
