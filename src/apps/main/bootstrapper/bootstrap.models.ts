import { BootstappingPipelineItem } from "./index";

export enum BootstrapStatusType {
  Initial = 0,
  Running,
  Succeeded,
  Failed
}
export interface ServiceBootstrapStatus {
  startTime? : number;
  endTime? : number;
  status : BootstrapStatusType;
  service: BootstrapServiceInfo;
  error?: Error;
}
export interface BootstrapServiceInfo {
  name : string;
  displayName : string;
  priority : number;
}

