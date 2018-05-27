import { Component, OnInit } from '@angular/core';
import {FileService} from './file.service';
import {Tree} from './file';
import {SettingsService} from '../common/settings.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  tree: Tree[];
  displayedColumns = ['pinned', 'name', 'last_modified', 'size'];
  loading: boolean;

  constructor(
    private fileService: FileService,
    private settingService: SettingsService
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    setTimeout(() => {
      this.fileService.getFiles().subscribe(tree => this.tree = tree);
      this.loading = false;
    }, 1000);
  }

  format(num: number) {
    if (num < 10240) return num + ' B';
    if (num < 10485760) return Math.round(num / 1024) + ' kiB';
    if (num < 10737418240) return Math.round(num / 1048576) + ' MiB';
    return Math.round(num / 10737418240) + ' GiB';
  }
}
