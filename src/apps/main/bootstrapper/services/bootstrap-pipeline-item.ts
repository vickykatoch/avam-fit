import { ApplicationLoggingService, ApplicationLogger } from 'fit-logger-core/index';
import { Observable } from "rxjs/Observable";
import { ServiceBootstrapStatus, BootstrapServiceInfo } from "../bootstrap.models";
import { ApplicationInfo } from 'fit-core-models/index';

export abstract class BootstappingPipelineItem {
  serviceInfo : BootstrapServiceInfo;
  currentStatus: ServiceBootstrapStatus
  protected logger : ApplicationLogger;

  constructor(name : string,loggingService: ApplicationLoggingService) {
    this.logger = loggingService.getLogger(name);
  }

  abstract start(options?: any) : Observable<ServiceBootstrapStatus>;

}
