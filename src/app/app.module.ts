import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { FilesComponent } from './files/files.component';
import {HttpClientModule} from '@angular/common/http';
import {FileService} from './files/file.service';
import {SettingsService} from './common/settings.service';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatSidenavModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { DetailComponent } from './files/file-detail/detail.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: FilesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FilesComponent,
    AboutComponent,
    DetailComponent
  ],
  imports: [
    RouterModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [
    SettingsService,
    FileService
  ],
  entryComponents: [
    DetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
