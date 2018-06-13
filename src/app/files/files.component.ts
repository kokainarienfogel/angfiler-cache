import { Component, OnInit } from '@angular/core';
import {FileService} from './file.service';
import {File2, Tree} from './file';
import {SettingsService} from '../common/settings.service';
import {DetailComponent} from './file-detail/detail.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operator/map';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  tree: Tree;
  displayedColumns = ['pinned', 'name', 'last_modified', 'size'];
  loading: boolean;

  constructor(
    private http: HttpClient,
    private fileService: FileService,
    private settingService: SettingsService,
    protected localStorage: LocalStorage, 
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    setTimeout(() => {
      this.fileService.getFiles().subscribe(tree => {
        this.checkPinState(tree);
        this.tree = tree;
      });
      this.loading = false;
    }, 1000);

  }

  checkPinState(item: Tree | File2) {
    if ((<Tree>item).children) {
      for (let child of (<Tree>item).children) {
        this.checkPinState(child);
      }
    } else {
      this.localStorage.getItem((<File2>item).hash).subscribe(data => {
        if(data != null) {
          (<File2>item).pinned = true;
        }
      })
    }
  }

  format(num: number) {
    if (num < 10240) { return num + ' B'; }
    if (num < 10485760) { return Math.round(num / 1024) + ' kiB'; }
    if (num < 10737418240) { return Math.round(num / 1048576) + ' MiB'; }
    return Math.round(num / 10737418240) + ' GiB';
  }

  openFileDialog(file: File2) {
    const dialogRef = this.dialog.open(DetailComponent, {data: file});
  }

  pinFile(hash: string) {

    this.localStorage.getItem(hash).subscribe(data => {
      if (data == null) {
        this.http.get(this.settingService.apiFilePath + hash, {responseType: "blob"}).subscribe(x => {
          this.localStorage.setItem(hash, x).subscribe(() => {});
        });        
      } else {
        this.localStorage.removeItem(hash).subscribe(() => {});
      }
    });
  }
}
