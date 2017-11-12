import { Injectable } from '@angular/core';
import { AppHostProvider } from 'fit-apphost-core/index';


@Injectable()
export class FinAppHostProviderService extends AppHostProvider {

  constructor() {
    super();
  }

  createNewApp(options: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  }
  getCurrent(): any {
    return 'AppInstance';
  }
}
