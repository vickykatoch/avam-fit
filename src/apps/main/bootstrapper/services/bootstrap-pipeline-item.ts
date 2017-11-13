import { ApplicationLoggingService, ApplicationLogger } from 'fit-logger-core/index';
import { Observable } from "rxjs/Observable";
import { ServiceBootstrapStatus, BootstrapServiceInfo, BootstrapStatusType } from "../bootstrap.models";
import { ApplicationInfo } from 'fit-core-models/index';

export abstract class BootstappingPipelineItem {
  protected _serviceInfo: BootstrapServiceInfo;
  protected logger: ApplicationLogger;
  protected _currentStatus: ServiceBootstrapStatus;

  constructor(name: string, loggingService: ApplicationLoggingService) {
    this.logger = loggingService.getLogger(name);
  }

  get serviceInfo(): BootstrapServiceInfo {
    return this._serviceInfo;
  }
  get currentStatus(): ServiceBootstrapStatus {
    return this._currentStatus;
  }

  protected updateStatus(partialState: Partial<ServiceBootstrapStatus>) {
    Object.assign(this._currentStatus, partialState)
  }


  abstract start(options?: any): Observable<ServiceBootstrapStatus>;

}
