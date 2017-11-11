import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { BootstrappingStatusNotifierService } from '../bootstrapping-status-notifier.service';
import { ServiceBootstrapStatus, BootstrapStatusType } from '../bootstrap.models';
import * as moment from 'moment';

@Component({
  selector: 'fit-bootstrapper-status',
  templateUrl: './bootstrapper-status.component.html',
  styleUrls: ['./bootstrapper-status.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class BootstrapperStatusComponent implements OnInit {
  title : string = 'Bootstrapping Application...';
  inQueueServices: ServiceBootstrapStatus[] = [];
  @Output() bootStrapped: EventEmitter<any> = new EventEmitter();
  

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
    this.title = 'Application bootstrapped successfully';
    this.bootStrapped.next(true);
  }

  //#region Formatters
  getStatus(status: BootstrapStatusType) {
    return BootstrapStatusType[status]
  }
  getFormattedTime(dateTime: number) {
    return dateTime ? moment(dateTime).format('HH:mm:ss.SSS') : null;
  }
  //#endregion
}
