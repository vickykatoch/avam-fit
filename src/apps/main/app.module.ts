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


@NgModule({
  declarations: [
    AppComponent,
    BootstrapperStatusComponent
  ],
  imports: [
    BrowserModule
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
