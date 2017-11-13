import { ApplicationLoggingService } from 'fit-logger-core/index';
import { Injectable } from '@angular/core';
import { BootstappingPipelineItem } from './bootstrap-pipeline-item';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BootstrapServiceInfo, BootstrapStatusType, ServiceBootstrapStatus } from '../bootstrap.models';


@Injectable()
export class UserPreferenceBootstrapService extends BootstappingPipelineItem {

  constructor(loggingService: ApplicationLoggingService) {
    super('UserPreferenceBootstrapService', loggingService);
    this._serviceInfo = this._serviceInfo || { name: 'UserPrefs', displayName: 'User Preferences', priority: 41 } ;
    this._currentStatus = this._currentStatus || { startTime : null, endTime : null, status :  BootstrapStatusType.Initial, service : this.serviceInfo, error: null };
  }

  public start(options?: any): Observable<ServiceBootstrapStatus> {
    return Observable.create((observer: Observer<ServiceBootstrapStatus>) => {
      this.logger.time('UserPreferenceBootstrapService');
      this.updateStatus({startTime : Date.now(), status : BootstrapStatusType.Running});
      observer.next(this._currentStatus);
      setTimeout(() => {
        this.updateStatus({endTime : Date.now(), status : BootstrapStatusType.Succeeded});
        this.logger.timeEnd('UserPreferenceBootstrapService');
        observer.next(this._currentStatus);
        observer.complete();
      }, 5000);
    });
  }

}
