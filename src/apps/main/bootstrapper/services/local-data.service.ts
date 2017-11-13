import { ActionCreatorFactory } from './../../store/index';
import { ApplicationLoggingService } from 'fit-logger-core/index';
import { Injectable } from '@angular/core';
import { BootstappingPipelineItem } from './bootstrap-pipeline-item';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BootstrapServiceInfo, BootstrapStatusType, ServiceBootstrapStatus } from '../bootstrap.models';
import { ApplicationInfo, AppContext } from 'fit-core-models/index';
import { Store } from '@ngrx/store';


@Injectable()
export class LocalDataService extends BootstappingPipelineItem {
  constructor(loggingService: ApplicationLoggingService,
              private store: Store<ApplicationInfo>) {
    super('LocalAppDataService', loggingService);
    this._serviceInfo = this._serviceInfo || { name: 'LocalAppData', displayName: 'Local App Data', priority: 0 };
    this._currentStatus = this._currentStatus || { startTime: null, endTime: null, status: BootstrapStatusType.Initial, service: this.serviceInfo, error: null };
  }


  public start(options?: any): Observable<ServiceBootstrapStatus> {
    return Observable.create((observer: Observer<ServiceBootstrapStatus>) => {
      this.logger.time('UserInfoBootstrapService');
      this.updateStatus({startTime : Date.now(), status : BootstrapStatusType.Running});
      observer.next(this._currentStatus);
      AppContext.instance.init('Main','DEV','XNA',window.location.origin, window.location.href)
          .subscribe(appInfo=>{
            this.updateStatus({endTime : Date.now(), status : BootstrapStatusType.Succeeded});
            observer.next(this._currentStatus);
            observer.complete();
          });
    });
  }
  private dispatchStoreAction(appInfo: ApplicationInfo) : void {
    const action = ActionCreatorFactory.create<ApplicationInfo>('LOAD_APPINFO',appInfo);
    this.store.dispatch(action);
  }
}
