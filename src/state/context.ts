import { createContext, Dispatch } from 'react';

import { initialState } from './initialState';
import { Action, State } from './types';

export const ContextApp = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  /*eslint-disable-next-line */
  dispatch: () => {},
});
