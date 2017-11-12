import { ApplicationLoggingService } from 'fit-logger-core/index';
import { Injectable } from '@angular/core';
import { BootstappingPipelineItem } from './bootstrap-pipeline-item';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BootstrapServiceInfo, BootstrapStatusType, ServiceBootstrapStatus } from '../bootstrap.models';
import { AppHostProvider } from 'fit-apphost-core/index';

@Injectable()
export class ChildAppsBootstrapService extends BootstappingPipelineItem {

  private _serviceInfo: BootstrapServiceInfo;
  private _currentStatus: ServiceBootstrapStatus;

  constructor(private loggingService: ApplicationLoggingService, private apphostProvider : AppHostProvider) {
    super('ChildAppsBootstrapService', loggingService);
    this._serviceInfo = this._serviceInfo || { name: 'ChildApps', displayName: 'Child Applications', priority: 100 } ;
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
      this.logger.time('ChildAppsBootstrapService');
      this._currentStatus.startTime = Date.now();
      this._currentStatus.status = BootstrapStatusType.Running;
      observer.next(this._currentStatus);
      this.apphostProvider.createNewApp({}).then((app)=> {
        this._currentStatus.endTime = Date.now();
        this._currentStatus.status = BootstrapStatusType.Succeeded;
        this.logger.timeEnd('ChildAppsBootstrapService');
        observer.next(this._currentStatus);
        observer.complete();
      });
    });
  }

}
