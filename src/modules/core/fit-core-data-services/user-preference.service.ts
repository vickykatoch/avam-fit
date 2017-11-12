import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserPreference } from 'fit-core-models/index';


@Injectable()
export class UserPreferenceService {

  constructor(private http: HttpClient) { }
  
    fetch(url: string) : Observable<UserPreference> {
      return this.http.get<UserPreference>(url);
    }

    save(workspace: UserPreference) : Observable<UserPreference> {
      throw new Error();
      // return this.http.get<Workspace>(url);
    }

}
