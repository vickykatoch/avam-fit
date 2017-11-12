import { ApplicationLoggingService } from 'fit-logger-core/index';
import { Injectable } from '@angular/core';
import { BootstappingPipelineItem } from './bootstrap-pipeline-item';
import { BootstrapServiceInfo, ServiceBootstrapStatus,  BootstrapStatusType } from '../bootstrap.models';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Store } from '@ngrx/store';
import { AppConfig, AppContext } from 'fit-core-models/index';
import 'rxjs/add/operator/take';
import { AppConfigService } from 'fit-core-data/index';
import { ActionCreatorFactory } from './../../store/index';

@Injectable()
export class AppconfigBootstrapService extends BootstappingPipelineItem {
  private _serviceInfo: BootstrapServiceInfo;
  private _currentStatus: ServiceBootstrapStatus;


  constructor(loggingService: ApplicationLoggingService,
              private store: Store<AppConfig>,
              private appConfigService : AppConfigService
            ) {
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
      observer.next(this._currentStatus);
      const appInfo = AppContext.instance.appInfo;
      const url = `${appInfo.baseUrl}/api/appConfigs/${appInfo.region}/${appInfo.env}`;
      this.appConfigService.fetch(url).subscribe(appConfig=> {
        this.store.dispatch(ActionCreatorFactory.create<AppConfig>('LOAD_APPCONFIG',appConfig));
        this._currentStatus.endTime = Date.now();
        this._currentStatus.status = BootstrapStatusType.Succeeded;
        this.logger.timeEnd('ApplicationConfigService');
        observer.next(this._currentStatus);
        observer.complete();
      });
    });
  }
}
