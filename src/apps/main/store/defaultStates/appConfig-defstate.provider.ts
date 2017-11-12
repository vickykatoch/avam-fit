import { AppConfig } from "fit-core-models/index";

const DEFAULT_STATE : AppConfig = {
      api: {
            userPreferenceServiceUrl: '',
            workspaceServiceUrl: '',
            userInfoServiceUrl: ''
      }, general: {
            defaultHttpTimeout : 20
      }
  };
  


export class AppConfigDefaultStateProvider {
      static getDefault() : AppConfig {
            return DEFAULT_STATE;
      }
}