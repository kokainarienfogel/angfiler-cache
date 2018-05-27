import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {File2} from '../file';

@Component({
  selector: 'app-file-detail',
  templateUrl: './directory-dialog.component.html',
  styleUrls: ['./directory-dialog.component.css']
})
export class DirectoryDialogComponent implements OnInit {

  constructor() { }

  dir: File2;

  ngOnInit() {
  }



}
