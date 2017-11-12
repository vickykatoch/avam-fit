import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ApplicationInfo } from "./app-info";
import { User } from "./user";



export class AppContext {
  private static _instance = new AppContext();
  private _appInfo : ApplicationInfo;
  private _userInfo : User;

  constructor() {
    if (AppContext._instance) {
      throw new Error("Error: Instantiation failed: Use LoggingStore.instance instead of new.");
    }
    AppContext._instance = this;
  }

  init(appName: string,env: string, region: string, baseUrl: string, url: string ) : Observable<ApplicationInfo> {
    return Observable.create((observer: Observer<ApplicationInfo>)=> {
      this.getUser().then(user=> {
        this._appInfo = new ApplicationInfo(appName,user,env,region,baseUrl,url);
        observer.next(this._appInfo);
        observer.complete();
      });
    });
  }

  public get appInfo() : ApplicationInfo {
    return this._appInfo;
  }
  public get userInfo() : User {
    return this._userInfo;
  }
  public setUserInfo(value: User)  {
    this._userInfo = this._userInfo || value;
  }


  private getUser() : Promise<string> {
    return new Promise<string>((resolve, reject)=> {
      resolve('KB');
    });
  }

  static get instance(): AppContext {
    return AppContext._instance;
  }

}
