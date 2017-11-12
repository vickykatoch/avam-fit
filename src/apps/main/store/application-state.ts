import {
      ApplicationInfo,
      AppConfig,
      UserPreference,
      User,
      Workspace
} from 'fit-core-models/index';

import { AppConfigDefaultStateProvider } from './defaultStates/appConfig-defstate.provider';
import * as _ from "lodash";

export interface ApplicationState {
      appConfig : AppConfig;
      // userPrefs : UserPreference;
      // user: User;
      // workspace: Workspace;
      // orders: {[key: string] : Order};
      // instruments : {[key: string]: Instrument};
}
export const INITIAL_APPLICATION_STATE = {
      appConfig : AppConfigDefaultStateProvider.getDefault()
};
