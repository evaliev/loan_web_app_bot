import { useContext, useEffect, useReducer } from 'react';

import styles from './App.module.scss';
import { DebugBar } from './components/DebugBar';
import { features, FeaturesType, isFeatureActive } from './features';
import { DataPage } from './pages/DataPage';
import { TermPage } from './pages/TermPage';
import { PageStatuses } from './pages/types';
import { ContextApp } from './state/context';
import { initialState } from './state/initialState';
import { reducer } from './state/reducer';
import { telegram } from './telegram';

const App = () => {
  const { state } = useContext(ContextApp);

  useEffect(() => {
    telegram.ready();
    telegram.expand();
  }, []);

  const renderPage = () => {
    switch (state.status) {
      case PageStatuses.TERM_PAGE:
        return <TermPage />;
      case PageStatuses.DATA_PAGE:
        return <DataPage />;
      default:
        return <TermPage />;
    }
  };
  return <div className={styles.app}>{renderPage()}</div>;
};

const WrappedApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContextApp.Provider value={{ dispatch, state }}>
      <App />
      {isFeatureActive(features, FeaturesType.DEBUG_BAR) && <DebugBar />}
    </ContextApp.Provider>
  );
};

export default WrappedApp;
