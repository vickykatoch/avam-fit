import { AppConfig } from "fit-core-models/index";
import { StoreAction } from '../actions/store-action';
import { AppConfigDefaultStateProvider } from '../defaultStates/appConfig-defstate.provider';

export function appConfigReducer(state: AppConfig = AppConfigDefaultStateProvider.getDefault(), action: StoreAction<AppConfig>): AppConfig {
      switch (action.type) {
            case 'LOAD_APPCONFIG':
                  return action.payload;
            default:
                  return state;
      }
}