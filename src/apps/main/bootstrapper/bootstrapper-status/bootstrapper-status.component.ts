import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BootstrappingStatusNotifierService } from '../bootstrapping-status-notifier.service';
import { ServiceBootstrapStatus, BootstrapStatusType } from '../bootstrap.models';

@Component({
  selector: 'fit-bootstrapper-status',
  templateUrl: './bootstrapper-status.component.html',
  styleUrls: ['./bootstrapper-status.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class BootstrapperStatusComponent implements OnInit {

  inQueueServices: ServiceBootstrapStatus[] = [];

  constructor(private bootstrapStatusService: BootstrappingStatusNotifierService) {
    bootstrapStatusService.inQueueServicesInitalStatusList$.subscribe(this.onInitialStatusReceived.bind(this));
    bootstrapStatusService.bootStrapStatus$
      .subscribe(this.onStatusReceived.bind(this), this.onError.bind(this), this.onCompleted.bind(this));
  }

  ngOnInit() {
  }
  onInitialStatusReceived(services: ServiceBootstrapStatus[]): void {
    this.inQueueServices = services;
  }

  onStatusReceived(status: ServiceBootstrapStatus) {
    console.info(status);
  }
  onError(err: Error) {
    console.error(err);
  }
  onCompleted() {
    console.info('completed');
  }

  //#region Formatters
  getStatus(status: BootstrapStatusType) {
    return BootstrapStatusType[status]
  }
  //#endregion
}
