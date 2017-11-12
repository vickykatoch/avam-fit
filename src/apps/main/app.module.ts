import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BootstrappingManagerService,
  BootstrapperStatusComponent,
  BootstrappingStatusNotifierService,
  AppconfigBootstrapService,
  ChildAppsBootstrapService,
  UserInfoBootstrapService,
  UserPreferenceBootstrapService
 } from './bootstrapper/index';
import { FitLoggerModule } from 'fit-logger/index';


@NgModule({
  declarations: [
    AppComponent,
    BootstrapperStatusComponent
  ],
  imports: [
    BrowserModule,
    FitLoggerModule
  ],
  providers: [
    BootstrappingStatusNotifierService,
    BootstrappingManagerService,
    AppconfigBootstrapService,
    ChildAppsBootstrapService,
    UserInfoBootstrapService,
    UserPreferenceBootstrapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
