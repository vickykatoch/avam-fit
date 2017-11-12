import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from 'fit-core-models/index';



@Injectable()
export class AppConfigService {

  constructor(private http: HttpClient) { }

  fetch(url: string) : Observable<AppConfig> {
    return this.http.get<AppConfig>(url);
  }

}
