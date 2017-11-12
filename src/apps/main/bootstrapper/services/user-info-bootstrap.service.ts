import { ApplicationLoggingService } from 'fit-logger-core/index';
import { Injectable } from '@angular/core';
import { BootstappingPipelineItem } from './bootstrap-pipeline-item';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BootstrapServiceInfo, BootstrapStatusType, ServiceBootstrapStatus } from '../bootstrap.models';
import { UserDataService } from 'fit-core-data/index';
import { AppContext, User } from 'fit-core-models/index';
import { Store } from '@ngrx/store';


@Injectable()
export class UserInfoBootstrapService extends BootstappingPipelineItem {

  private _serviceInfo: BootstrapServiceInfo;
  private _currentStatus: ServiceBootstrapStatus;

  constructor(loggingService: ApplicationLoggingService,
              private userDataService: UserDataService
            ) {
    super('UserInfoBootstrapService', loggingService);
    this._serviceInfo = this._serviceInfo || { name: 'User', displayName: 'User Configuration', priority: 21 };
    this._currentStatus = this._currentStatus || { startTime: null, endTime: null, status: BootstrapStatusType.Initial, service: this.serviceInfo, error: null };
  }
  get serviceInfo(): BootstrapServiceInfo {
    return this._serviceInfo;
  }
  get currentStatus(): ServiceBootstrapStatus {
    return this._currentStatus;
  }
  public start(options?: any): Observable<ServiceBootstrapStatus> {
    return Observable.create((observer: Observer<ServiceBootstrapStatus>) => {
      this.logger.time('UserInfoBootstrapService');
      Object.assign(this._currentStatus, { startTime: Date.now(), status: BootstrapStatusType.Running });
      observer.next(this._currentStatus);
      const appInfo = AppContext.instance.appInfo;
      const url = `${appInfo.baseUrl}/api/users/${appInfo.user}`;
      this.userDataService.fetch(url)
        .subscribe(user=> {
          Object.assign(this._currentStatus, {endTime : Date.now(),status : BootstrapStatusType.Succeeded });
          AppContext.instance.setUserInfo(user);
          observer.next(this._currentStatus);
          observer.complete();
        });
    });
  }

}
