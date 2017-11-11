import { Injectable } from '@angular/core';
import {
  BootstappingPipelineItem,
  AppconfigBootstrapService,
  ChildAppsBootstrapService,
  UserInfoBootstrapService,
  UserPreferenceBootstrapService
} from './services/index';
import { BootstrappingStatusNotifierService } from './bootstrapping-status-notifier.service';
import { ServiceBootstrapStatus, BootstrapStatusType } from './bootstrap.models';
import { Queue } from 'typescript-collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/do';

interface ServiceStatus {
  service: BootstappingPipelineItem;
  status: ServiceBootstrapStatus;
}

@Injectable()
export class BootstrappingManagerService {
  private bootstrapPipelineItemsQueue = new Queue<BootstappingPipelineItem>();

  constructor(private statusNotifier: BootstrappingStatusNotifierService,
    private appConfigService: AppconfigBootstrapService,
    private childAppService: ChildAppsBootstrapService,
    private userInfoService: UserInfoBootstrapService,
    private userPrefService: UserPreferenceBootstrapService) {
    this.registerServices();
  }

  bootstrap() {
    const bootStrappingServices: Observable<ServiceBootstrapStatus>[] = [];
    const initialBSSeviceStatusList: ServiceBootstrapStatus[] = [];
    while (true) {
      const service = this.bootstrapPipelineItemsQueue.dequeue();
      if (service) {
        initialBSSeviceStatusList.push(service.currentStatus);
        bootStrappingServices.push(service.start());
      } else {
        break;
      }
    }
    this.statusNotifier.notifyInQServices(initialBSSeviceStatusList);
    Observable.of(...bootStrappingServices)
      .concatAll()
      .subscribe(
        status=> this.statusNotifier.notifyStatus(status),
        error=> this.onBootStrapError(error),
        ()=> this.statusNotifier.notifyComplete());
  }

  // #region Helper Methods
  private registerServices() {
    [this.appConfigService, this.childAppService, this.userInfoService, this.userPrefService]
      .sort((a, b) => a.serviceInfo.priority - b.serviceInfo.priority)
      .forEach(service => this.bootstrapPipelineItemsQueue.enqueue(service));
  }
  private onBootStrapError(error: any) {

  }
  //#endregion
}
