import { ApplicationInfo } from "fit-core-models/index";
import { StoreAction } from '../actions/store-action';
import { AppInfoDefaultStateProvider } from '../defaultStates/appInfo-defstate.provider';

export function appInfoReducer(state: ApplicationInfo = AppInfoDefaultStateProvider.getDefault(), action: StoreAction<ApplicationInfo>) : ApplicationInfo {
      switch(action.type) {
            case 'LOAD_APPINFO':
                  return action.payload;
            default:
                  return state;
      }
}