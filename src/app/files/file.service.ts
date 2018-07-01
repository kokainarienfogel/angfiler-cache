import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SettingsService} from '../common/settings.service';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {Tree} from './file';
import {map} from 'rxjs/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Credentials': 'true', })
};

@Injectable()
export class FileService {

  constructor(
    private http: HttpClient,
    private settingService: SettingsService,
  ) { }

  getFiles (): Observable<Tree> {
    console.log(this.settingService.filesUrl);
    return this.http.get<Tree>(this.settingService.filesUrl)
      .pipe(
        catchError(this.handleError('getFiles', new Tree()))
      );
  }

  /*downloadFile(hash: string) {
    let file;
    this.http.get(this.settingService.apiFilePath + hash).subscribe(x => {
      file = new Blob(x);
    });
    let url = window.open()
  }*/

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
