import { Injectable } from '@angular/core';
import { AppHostProvider } from 'fit-apphost-core/index';


@Injectable()
export class FinAppHostProviderService extends AppHostProvider {
  private _finApp: any;
  private _appMap = new Map<string, any>();

  constructor() {
    super();
    this._finApp = fin.desktop.Application.getCurrent();
  }

  get name(): string {
    return this._finApp.uuid;
  }

  createNewApp(url: string, name: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.closeIfAppExists(name).then(() => {
        debugger;
        const app = new fin.desktop.Application(this.createAppOptions(url, name),
          (success) => {
            console.log(success);
            app.run(succeeded => {
              this._appMap.set(name, app);
              resolve(name);
              // app.window.show();
            }, error => {
              console.log(error);
              reject(error);
            });
          },
          (error) => {
            console.log(error);
            reject(error);
          });

      }).catch(err => {
        reject(err);
      })

    });
  }
  getCurrent(): any {
    return this._finApp;
  }
  show(name: string): void {
    if (this._appMap.has(name)) {
      debugger;
      const app = this._appMap.get(name);
      app.window.show();
    }
  }
  showAll(): void {
    this._appMap.forEach((value: any, key: string) => {
      value.show();
    });
  }

  private createAppOptions(url: string, name: string, data?: any): any {
    return {
      name,
      uuid: name,
      url,
      webSecurity: false,
      plugins: false
    };
  }
  private closeIfAppExists(name): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        debugger;
        const app = fin.desktop.Application.wrap(name);
        if (app) {
          app.window.close(true, success => {
            resolve(true);
            app.close(true, success => {
              resolve(true);
            }, error => {
              reject(error);
            });
          }, error=> {
            reject(error);
          });

        }
      } catch (err) {
        console.error(err);
      }
    });

  }
}
