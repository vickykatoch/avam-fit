import { WorkspaceDataService } from './workspace-data.service';
import { UserPreferenceService } from './user-preference.service';
import { UserDataService } from './user-data.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [

  ],
  providers : [
    AppConfigService,
    UserDataService,
    UserPreferenceService,
    WorkspaceDataService
  ]
})
export class FitCoreDataModule { }
