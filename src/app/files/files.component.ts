import { Component, OnInit } from '@angular/core';
import {FileService} from './file.service';
import {File2, Tree} from './file';
import {SettingsService} from '../common/settings.service';
import {DetailComponent} from './file-detail/detail.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operator/map';
import {Router} from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  tree: Tree;
  displayedColumns = ['pinned', 'name', 'size'];
  loading: boolean;

  constructor(
    private http: HttpClient,
    private fileService: FileService,
    private settingService: SettingsService,
    protected localStorage: LocalStorage,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.settingService.serverPath === '') {
      this.router.navigate(['/about']);
    } else {
      this.refresh();
    }
  }

  /**
   * Refreshes the file table by querying the service worker and in case re-loading the file metadata
   */
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

  /**
   * Checks, whether a file or directory is pinned and writes the result into the object's pinned property
   * so the template knows the state and can correctly render the checkbox.
   * @param {Tree | File2} item
   */
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
      });
    }
  }

  /**
   * Method for displaying file sizes. Converts the original file size (Bytes) into kiB, MiB or GiB,
   * with up to 4 spaces before the decimal point. Not static because of accessibility through template.
   * @param {number} num: File Size in Bytes
   * @returns {string}: File Size as more readable number incl. unit symbol
   */
  format(num: number) {
    if (num < 10240) { return num + ' B'; }
    if (num < 10485760) { return Math.round(num / 1024) + ' kiB'; }
    if (num < 10737418240) { return Math.round(num / 1048576) + ' MiB'; }
    return Math.round(num / 10737418240) + ' GiB';
  }

  openFileDialog(file: File2) {
    const dialogRef = this.dialog.open(DetailComponent, {data: file});
  }

  /**
   * Toggles the "pinned" state of a file, meaning its addition to or removal from the cache.
   * @param {string} hash: The hash of the file to pin or unpin
   */
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
