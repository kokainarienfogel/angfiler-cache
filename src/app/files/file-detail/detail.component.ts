import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {File2} from '../file';
import {FileService} from '../file.service';
import {SettingsService} from '../../common/settings.service';

@Component({
  selector: 'app-file-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public settingsService: SettingsService) { }

  file: File2;

  ngOnInit() {
  }



}
