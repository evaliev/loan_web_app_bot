import { useCallback, useContext } from 'react';

import InputRange from '../components/InputRange';
import { ContextApp } from '../state/context';
import { ActionTypes } from '../state/types';

export const TermPage = () => {
  const { state, dispatch } = useContext(ContextApp);

  const increaseAmount = useCallback(() => {
    dispatch({ type: ActionTypes.AMOUNT_INCREASE });
  }, [dispatch]);

  const decreaseAmount = useCallback(() => {
    dispatch({ type: ActionTypes.AMOUNT_DECREASE });
  }, [dispatch]);

  const increaseTerm = useCallback(() => {
    dispatch({ type: ActionTypes.TERM_INCREASE });
  }, [dispatch]);

  const decreaseTerm = useCallback(() => {
    dispatch({ type: ActionTypes.TERM_DECREASE });
  }, [dispatch]);

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <InputRange
          value={state.amount}
          increaseHandler={increaseAmount}
          decreaseHandler={decreaseAmount}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <InputRange
          value={state.term}
          increaseHandler={increaseTerm}
          decreaseHandler={decreaseTerm}
        />
      </div>
    </div>
  );
};
