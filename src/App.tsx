import { useContext, useEffect, useReducer } from 'react';

import styles from './App.module.scss';
import { DebugBar } from './components/DebugBar';
import { DataPage } from './pages/DataPage';
import { LoginPage } from './pages/LoginPage';
import { OwnerPage } from './pages/OwnerPage';
import { SuccessPage } from './pages/SuccessPage';
import { TermPage } from './pages/TermPage';
import { PageStatuses } from './pages/types';
import { ContextApp } from './state/context';
import { initialState } from './state/initialState';
import { reducer } from './state/reducer';
import { LentDataPage } from './pages/LentData';
import { telegram } from './telegram';

const App = () => {
  const { state } = useContext(ContextApp);

  useEffect(() => {
    telegram.ready();
    telegram.expand();
  }, []);

  const renderPage = () => {
    switch (state.status) {
      case PageStatuses.LOGIN_PAGE:
        return <LoginPage />;
      case PageStatuses.TERM_PAGE:
        return <TermPage />;
      case PageStatuses.DATA_PAGE:
        return <DataPage />;
      case PageStatuses.LENT_DATA_PAGE:
        return <LentDataPage />;
      case PageStatuses.SUCCESS_PAGE:
        return <SuccessPage />;
      case PageStatuses.OWNER_DATA:
        return <OwnerPage />;
      default:
        return <LoginPage />;
    }
  };
  return <div className={styles.app}>{renderPage()}</div>;
};

const WrappedApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextApp.Provider value={{ dispatch, state }}>
      <App />
      {process.env.NODE_ENV === 'development' && <DebugBar />}
    </ContextApp.Provider>
  );
};

export default WrappedApp;
