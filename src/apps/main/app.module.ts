import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BootstrappingManagerService,
  BootstrapperStatusComponent,
  BootstrappingStatusNotifierService,
  AppconfigBootstrapService,
  ChildAppsBootstrapService,
  UserInfoBootstrapService,
  UserPreferenceBootstrapService,
  LocalDataService
 } from './bootstrapper/index';
import { FitLoggerModule } from 'fit-logger/index';
import { FinAppHostModule } from 'fin-app-host/index';
import { FitCoreDataModule } from 'fit-core-data/index';
import { StoreModule } from '@ngrx/store';
import { FitStoreHelper } from './store/index';

@NgModule({
  declarations: [
    AppComponent,
    BootstrapperStatusComponent
  ],
  imports: [
    BrowserModule,
    FitLoggerModule,
    FinAppHostModule,
    FitCoreDataModule,
    StoreModule.forRoot(FitStoreHelper.reducers(), { initialState: FitStoreHelper.initialState() })
  ],
  providers: [
    BootstrappingStatusNotifierService,
    BootstrappingManagerService,
    AppconfigBootstrapService,
    ChildAppsBootstrapService,
    UserInfoBootstrapService,
    UserPreferenceBootstrapService,
    LocalDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
