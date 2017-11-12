import { ApplicationLoggingService, ApplicationLogger } from 'fit-logger-core/index';
import { Injectable } from '@angular/core';
import {
  BootstappingPipelineItem,
  AppconfigBootstrapService,
  ChildAppsBootstrapService,
  UserInfoBootstrapService,
  UserPreferenceBootstrapService,
  LocalDataService
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
  private logger : ApplicationLogger;

  constructor(private statusNotifier: BootstrappingStatusNotifierService,
    loggingService : ApplicationLoggingService,
    private appConfigService: AppconfigBootstrapService,
    private childAppService: ChildAppsBootstrapService,
    private userInfoService: UserInfoBootstrapService,
    private localAppData : LocalDataService,
    private userPrefService: UserPreferenceBootstrapService) {
      loggingService.init({appName: 'MainApp'});
      this.logger = loggingService.getLogger('BootstrappingManagerService');

    this.registerServices();
  }

  bootstrap() {
    this.logger.info('Application bootstrap started');
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
    this.logger.debug('Registering the bootstrapping services to application bootstrap pipeline');
    [this.localAppData, this.appConfigService, this.childAppService, this.userInfoService, this.userPrefService]
      .sort((a, b) => a.serviceInfo.priority - b.serviceInfo.priority)
      .forEach(service => this.bootstrapPipelineItemsQueue.enqueue(service));
      // this.logger.debug('Bootstrap services registered', this.bootstrapPipelineItemsQueue);
      this.logger.debug('Bootstrap services count : ', this.bootstrapPipelineItemsQueue.size());
  }
  private onBootStrapError(error: any) {
    this.logger.error('Application bootstrap error has occurred, cannot move any further : ', error);
  }
  //#endregion
}
