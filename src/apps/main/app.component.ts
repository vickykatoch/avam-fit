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
  title = 'fit';
  private noop = ()=>{};

  constructor(private bootStrapper : BootstrappingManagerService) {

  }
  ngOnInit() {
    this.title = "Bootstraping Application...";
    this.bootStrapper.bootstrap();
  }



}
