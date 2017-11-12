import { Action } from "@ngrx/store";



export class StoreAction<T> implements Action {
      readonly type: string;
      constructor(type: string, public payload?: T) {
            this.type = type;
      }
}
export class ActionCreatorFactory {
      static create<T>(type: string, payload?: T) : StoreAction<T> {
            return new StoreAction<T>(type,payload);
      }
}