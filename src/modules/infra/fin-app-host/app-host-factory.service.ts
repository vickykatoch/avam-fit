import { Injectable } from '@angular/core';
import { AppHostProviderFactory, AppHostProvider } from 'fit-apphost-core/index';

@Injectable()
export class FinAppHostFactoryService extends AppHostProviderFactory {

  constructor() {
    super();
  }

  getAppHostProvider(): AppHostProvider {
    throw new Error();
  }

}
