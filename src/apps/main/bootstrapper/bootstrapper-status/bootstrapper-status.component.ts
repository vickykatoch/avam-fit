import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { BootstrappingStatusNotifierService } from '../bootstrapping-status-notifier.service';
import { ServiceBootstrapStatus, BootstrapStatusType } from '../bootstrap.models';
import * as moment from 'moment';

@Component({
  selector: 'fit-bootstrapper-status',
  templateUrl: './bootstrapper-status.component.html',
  styleUrls: ['./bootstrapper-status.component.scss']
})
export class BootstrapperStatusComponent implements OnInit {
  title : string = 'Bootstrapping Application...';
  statusText : string;
  inQueueServices: ServiceBootstrapStatus[] = [];
  @Output() bootStrapped: EventEmitter<any> = new EventEmitter();
  private taskCount : number;


  constructor(private bootstrapStatusService: BootstrappingStatusNotifierService) {
    bootstrapStatusService.inQueueServicesInitalStatusList$.subscribe(this.onInitialStatusReceived.bind(this));
    bootstrapStatusService.bootStrapStatus$
      .subscribe(this.onStatusReceived.bind(this), this.onError.bind(this), this.onCompleted.bind(this));
  }

  ngOnInit() {
  }
  onInitialStatusReceived(services: ServiceBootstrapStatus[]): void {
    this.inQueueServices = services;
    this.taskCount = this.inQueueServices.length;
    this.updateStatusText();
  }

  onStatusReceived(status: ServiceBootstrapStatus) {
    this.updateStatusText();
  }
  onError(err: Error) {
    console.error(err);
  }
  onCompleted() {
    this.title = 'Application bootstrapped successfully';
    this.bootStrapped.next(true);
  }

  private updateStatusText() {
    const completed = this.inQueueServices.filter(x=> x.status === BootstrapStatusType.Succeeded).length;
    this.statusText = `${completed} of ${this.taskCount} tasks completed`;
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
