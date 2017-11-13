import { ApplicationLoggingService } from 'fit-logger-core/index';
import { Injectable } from '@angular/core';
import { BootstappingPipelineItem } from './bootstrap-pipeline-item';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BootstrapServiceInfo, BootstrapStatusType, ServiceBootstrapStatus } from '../bootstrap.models';
import { AppHostProvider } from 'fit-apphost-core/index';
import { error } from 'util';

@Injectable()
export class ChildAppsBootstrapService extends BootstappingPipelineItem {

  constructor(private loggingService: ApplicationLoggingService, private apphostProvider : AppHostProvider) {
    super('ChildAppsBootstrapService', loggingService);
    this._serviceInfo = this._serviceInfo || { name: 'ChildApps', displayName: 'Child Applications', priority: 100 } ;
    this._currentStatus = this._currentStatus || { startTime : null, endTime : null, status :  BootstrapStatusType.Initial, service : this.serviceInfo, error: null };
  }

  public start(options?: any): Observable<ServiceBootstrapStatus> {
    return Observable.create((observer: Observer<ServiceBootstrapStatus>) => {
      this.logger.time('ChildAppsBootstrapService');
      this.updateStatus({startTime : Date.now(), status : BootstrapStatusType.Running});
      observer.next(this._currentStatus);
      this.apphostProvider.createNewApp('http://localhost:4300','DASHBOARD').then((app)=> {
        this.updateStatus({endTime : Date.now(), status : BootstrapStatusType.Succeeded});
        this.apphostProvider.show(app);
        this.logger.timeEnd('ChildAppsBootstrapService');
        observer.next(this._currentStatus);
        observer.complete();
      }).catch(error=>{
        this.updateStatus({endTime : Date.now(), status : BootstrapStatusType.Failed});
        observer.next(this._currentStatus);
        this.logger.error(error);
        observer.error(error);
      });
    });
  }

}
