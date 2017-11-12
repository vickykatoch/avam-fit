import { ActionCreatorFactory } from './../../store/index';
import { ApplicationLoggingService } from 'fit-logger-core/index';
import { Injectable } from '@angular/core';
import { BootstappingPipelineItem } from './bootstrap-pipeline-item';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BootstrapServiceInfo, BootstrapStatusType, ServiceBootstrapStatus } from '../bootstrap.models';
import { ApplicationInfo } from 'fit-core-models/index';
import { Store } from '@ngrx/store';


@Injectable()
export class LocalDataService extends BootstappingPipelineItem {

  private _serviceInfo: BootstrapServiceInfo;
  private _currentStatus: ServiceBootstrapStatus;

  constructor(loggingService: ApplicationLoggingService,
              private store: Store<ApplicationInfo>) {
    super('LocalAppDataService', loggingService);
    this._serviceInfo = this._serviceInfo || { name: 'LocalAppData', displayName: 'Local App Data', priority: 0 };
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
      this._currentStatus.startTime = Date.now();
      this._currentStatus.status = BootstrapStatusType.Running;
      observer.next(this._currentStatus);
      setTimeout(() => {
        this._currentStatus.endTime = Date.now();
        this._currentStatus.status = BootstrapStatusType.Succeeded;
        const appInfo = {
          name : 'MainApp',
          user : 'KB',
          type : '',
          env : 'DEV',
          region : 'XNA',
          versio : '1.0.0'
        };
        this.dispatchStoreAction(appInfo);
        this.logger.timeEnd('UserInfoBootstrapService');
        observer.next(this._currentStatus);
        observer.complete();
      }, 2000);
    });
  }
  private dispatchStoreAction(appInfo: ApplicationInfo) : void {
    const action = ActionCreatorFactory.create<ApplicationInfo>('LOAD_APPINFO',appInfo);
    this.store.dispatch(action);
  }
}
