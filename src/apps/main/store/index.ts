export * from './application-state';
export * from './actions/store-action';
import {
      appConfigReducer
      } from './reducers/index';

import { ApplicationState, INITIAL_APPLICATION_STATE } from './application-state';

export class FitStoreHelper {
      static initialState() : ApplicationState {
            return INITIAL_APPLICATION_STATE;
      }
      static reducers() : any {
            return {
                  appInfo : appConfigReducer
            };
      }
}
