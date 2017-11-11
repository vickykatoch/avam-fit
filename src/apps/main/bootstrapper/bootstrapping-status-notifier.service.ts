import { Injectable } from '@angular/core';
import { ServiceBootstrapStatus } from './bootstrap.models';
import { BehaviorSubject } from 'rxjs/behaviorsubject';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class BootstrappingStatusNotifierService {
  private statusNotifier = new Subject<ServiceBootstrapStatus>();
  public bootStrapStatus$ = this.statusNotifier.asObservable();
  private inQueueServicesInitialStatusNotifier = new BehaviorSubject<ServiceBootstrapStatus[]>([]);
  public inQueueServicesInitalStatusList$ = this.inQueueServicesInitialStatusNotifier.asObservable();


  constructor() { }

  notifyInQServices(servicesStatus : ServiceBootstrapStatus[]) : void {
    this.inQueueServicesInitialStatusNotifier.next(servicesStatus)
  }

  notifyStatus(status : ServiceBootstrapStatus) {
    this.statusNotifier.next(status);
  }
  notifyError(error: Error) {
    this.statusNotifier.error(error);
  }
  notifyComplete() {
    this.statusNotifier.complete();
  }
}
