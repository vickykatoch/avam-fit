import { ApplicationLoggingService, ApplicationLogger } from 'fit-logger-core/index';
import { Component, OnInit } from '@angular/core';
import { BootstrappingManagerService,
  BootstrappingStatusNotifierService
 } from './bootstrapper/index';


@Component({
  selector: 'fit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [

  ]
})
export class AppComponent implements OnInit {
  title = 'Avam FIT';
  private noop = ()=>{};
  private logger : ApplicationLogger

  constructor(private bootStrapper : BootstrappingManagerService,
              loggingService : ApplicationLoggingService) {
        // loggingService.init({appName: 'MainApp'});
        this.logger = loggingService.getLogger('AppComponent');
  }
  ngOnInit() {
    // this.title = "Bootstraping Application...";
    this.bootStrapper.bootstrap();
  }
  onBootstrapSucceeded(evt: any) : void {
    this.logger.info('App Bootstrapped');
  }


}
