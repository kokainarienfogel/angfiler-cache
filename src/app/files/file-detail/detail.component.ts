import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {File2} from '../file';
import {FileService} from '../file.service';
import {SettingsService} from '../../common/settings.service';
import { Network } from '@ngx-pwa/offline';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {saveAs} from "file-saver";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-file-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    public settingsService: SettingsService,
    protected localStorage: LocalStorage, 
    protected network: Network) { }

  file: File2;

  ngOnInit() {
  }

  openFile(file: File2) {
  	if (this.network.online) {
        this.http.get(this.settingsService.apiFilePath + file.hash, {responseType: "blob"}).subscribe(data => {
          saveAs(data, file.name);
        });
  	} else {
		this.localStorage.getItem(file.hash).subscribe(data => {
        saveAs(data, file.name);
	    });
  	}
  }
}
