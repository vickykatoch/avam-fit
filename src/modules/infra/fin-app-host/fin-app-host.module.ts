import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinAppHostFactoryService } from './app-host-factory.service';
import { FinAppHostProviderService } from './app-host-provider.service';
import { AppHostProviderFactory, AppHostProvider } from 'fit-apphost-core/index';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

  ], providers: [
    { provide:  AppHostProviderFactory, useClass: FinAppHostFactoryService },
    { provide:  AppHostProvider , useClass: FinAppHostProviderService }
  ]
})
export class FinAppHostModule { }
