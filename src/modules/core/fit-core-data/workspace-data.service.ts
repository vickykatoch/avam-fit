import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workspace } from 'fit-core-models/index';

@Injectable()
export class WorkspaceDataService {

  constructor(private http: HttpClient) { }
  
    fetch(url: string) : Observable<Workspace> {
      return this.http.get<Workspace>(url);
    }
    save(workspace: Workspace) : Observable<Workspace> {
      throw new Error();
      // return this.http.get<Workspace>(url);
    }

}
