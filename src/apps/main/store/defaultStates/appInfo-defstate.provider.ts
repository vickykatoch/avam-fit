import { ApplicationInfo } from "fit-core-models/index";



const DEFAULT_STATE = {
      name              : '',
      user              : '',
      type              : '',
      env               : '',
      region            : '',
      version           : ''      
};


export class AppInfoDefaultStateProvider {
      
      static getDefault() : ApplicationInfo {
            return DEFAULT_STATE;
      }
      
}