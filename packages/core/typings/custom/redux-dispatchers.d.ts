declare module "redux-dispatchers" {
  import {
    ActionFunction0,
    ActionFunction1,
    ActionFunction2,
    ActionFunction3,
  } from "redux-actions";

  export type Dispatchable0 = ActionFunction0<void>;
  export type Dispatchable1<A> = ActionFunction1<A, void>;
  export type Dispatchable2<A1, A2> = ActionFunction2<A1, A2, void>;
  export type Dispatchable3<A1, A2, A3> = ActionFunction3<A1, A2, A3, void>;
}
