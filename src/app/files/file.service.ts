import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SettingsService} from '../common/settings.service';
import {MessageService} from '../messages/message.service';
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
    private messageService: MessageService,
    private settingService: SettingsService,
  ) { }

  /** GET users from the server */
  getFiles (): Observable<Tree[]> {
    this.messageService.add(this.settingService.filesUrl);
    return this.http.get<Tree[]>(this.settingService.filesUrl)
      .pipe(
        tap(files => this.log(`fetched files`)),
        catchError(this.handleError('getFiles', []))
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

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('FileService: ' + message);
  }
}
