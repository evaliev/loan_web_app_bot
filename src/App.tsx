import { useReducer } from 'react';

import { TermPage } from './pages/TermPage';
import { ContextApp } from './state/context';
import { initialState } from './state/initialState';
import { reducer } from './state/reducer';

const App = () => {
  return (
    <>
      <TermPage />
    </>
  );
};

const WrappedApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextApp.Provider value={{ dispatch, state }}>
      <App />
    </ContextApp.Provider>
  );
};

export default WrappedApp;
