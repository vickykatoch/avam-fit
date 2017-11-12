import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from 'fit-core-models/index';
import 'rxjs/add/operator/map';
import * as jsyaml from 'js-yaml';


@Injectable()
export class AppConfigService {

  constructor(private http: HttpClient) { }

  fetch(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'text' }).map(config => {
      try {
        const appConfig = jsyaml.load(config);
        return appConfig;
      } catch (err) {
        // this.logger.error(err, `Error parsing application info : ${JSON.stringify(err)}`);
        Observable.throw(err);
      }
    });
  }

}
