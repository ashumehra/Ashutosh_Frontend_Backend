import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  getPoints( h1:any, coe:any ) {        // calling get API for points and bounces
    const url = 'http://127.0.0.1:3000/getgraph/' + h1 + '/' + coe;

    return this._http.get(url)
    .pipe(map(result => result));
  }
}
