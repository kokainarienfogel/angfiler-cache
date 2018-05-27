import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { MessagesComponent } from './messages/messages.component';
import { FilesComponent } from './files/files.component';
import {HttpClientModule} from '@angular/common/http';
import {MessageService} from './messages/message.service';
import {FileService} from './files/file.service';
import {SettingsService} from './common/settings.service';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatSidenavModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'app', component: FilesComponent },
  { path: '', redirectTo: 'app', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    FilesComponent,
    AboutComponent
  ],
  imports: [
    RouterModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [
    MessageService,
    SettingsService,
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
