import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../common/settings.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public settingsService: SettingsService) { }

  ngOnInit() {
  }

}
