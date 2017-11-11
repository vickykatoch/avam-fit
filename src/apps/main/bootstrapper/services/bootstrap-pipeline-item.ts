import { Observable } from "rxjs/Observable";
import { ServiceBootstrapStatus, BootstrapServiceInfo } from "../bootstrap.models";

export abstract class BootstappingPipelineItem {
  serviceInfo : BootstrapServiceInfo;
  currentStatus: ServiceBootstrapStatus
  abstract start(options?: any) : Observable<ServiceBootstrapStatus>;
}
