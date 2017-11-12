import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'fit-core-models/index';

@Injectable()
export class UserDataService {

  constructor(private http: HttpClient) { }

  fetch(url: string) : Observable<User> {
    return this.http.get<User>(url);
  }

  save(workspace: User) : Observable<User> {
    throw new Error();
    // return this.http.get<Workspace>(url);
  }
}
