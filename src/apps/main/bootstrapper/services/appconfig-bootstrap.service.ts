import { ApplicationLoggingService } from 'fit-logger-core/index';
import { Injectable } from '@angular/core';
import { BootstappingPipelineItem } from './bootstrap-pipeline-item';
import { BootstrapServiceInfo, ServiceBootstrapStatus,  BootstrapStatusType } from '../bootstrap.models';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Store } from '@ngrx/store';
import { AppConfig } from 'fit-core-models/index';
import 'rxjs/add/operator/take';


@Injectable()
export class AppconfigBootstrapService extends BootstappingPipelineItem {
  private _serviceInfo: BootstrapServiceInfo;
  private _currentStatus: ServiceBootstrapStatus;


  constructor(loggingService: ApplicationLoggingService, private store: Store<AppConfig>) {
    super('AppconfigBootstrapService', loggingService);
    this._serviceInfo = this._serviceInfo || { name: 'AppConfig', displayName: 'Application Configuration', priority: 1 } ;
    this._currentStatus = this._currentStatus || { startTime : null, endTime : null, status :  BootstrapStatusType.Initial, service : this.serviceInfo, error: null };
  }
  get serviceInfo(): BootstrapServiceInfo {
      return this._serviceInfo;
  }
  get currentStatus(): ServiceBootstrapStatus {
    return this._currentStatus;
  }
  public start(options?: any): Observable<ServiceBootstrapStatus> {
    return Observable.create((observer: Observer<ServiceBootstrapStatus>) => {
      this.logger.time('ApplicationConfigService');
      this._currentStatus.startTime = Date.now();
      this._currentStatus.status = BootstrapStatusType.Running;
      this.store
      this.store.select<AppConfig>('appConfig')
        .take(1)
        .subscribe(cfg=> {
        
        console.log(cfg);
      });

      observer.next(this._currentStatus);
      setTimeout(() => {
        this._currentStatus.endTime = Date.now();
        this._currentStatus.status = BootstrapStatusType.Succeeded;
        this.logger.timeEnd('ApplicationConfigService');
        observer.next(this._currentStatus);
        observer.complete();
      }, 1000);
    });
  }
}
