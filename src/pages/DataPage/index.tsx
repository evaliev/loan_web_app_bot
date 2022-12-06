import { useCallback, useContext } from 'react';

import styles from './styles.module.scss';
import { DetailLine } from '../../components/DetailLine';
import { DocsIcon, ArrowIcon } from '../../icons';
import { useTelegramBtns } from '../../hooks';
import { ActionTypes } from '../../state/types';
import { PageStatuses } from '../types';
import { ContextApp } from '../../state/context';
import { formatAmountDisplay } from '../../utils';

export const DataPage = () => {
  const { state, dispatch } = useContext(ContextApp);

  const handleClick = useCallback(() => {
    dispatch({
      type: ActionTypes.CHANGE_STATUS,
      payload: PageStatuses.TERM_PAGE,
    });
  }, []);
  const hadleClickOwnerData = useCallback(() => {
    dispatch({
      type: ActionTypes.CHANGE_STATUS,
      payload: PageStatuses.OWNER_DATA,
    });
  }, []);

  useTelegramBtns({
    mainBtnTitle: 'Отправить заявку',
    mainBtnHandler: () => {
      dispatch({
        type: ActionTypes.CHANGE_STATUS,
        payload: PageStatuses.SUCCESS_PAGE,
      });
    },
    hasBackBtn: true,
    backBtnHandler: () => {
      dispatch({
        type: ActionTypes.CHANGE_STATUS,
        payload: PageStatuses.TERM_PAGE,
      });
    },
  });

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
            <DocsIcon />
          </div>
          <div className={styles.titlesContainer}>
            <span className={styles.cardTitle}>
              Экспресс-кредит для бизнеса
            </span>
            <span className={styles.cardSubtitle}>Банк KEK (LOL)</span>
          </div>
        </div>
        <div className={styles.detailsList}>
          <DetailLine
            label={
              <span className={styles.detailsListHeader}>
                Параметры кредита
              </span>
            }
            value={
              <span
                className={styles.detailsListHeaderValue}
                onClick={handleClick}
              >
                Изменить
              </span>
            }
          />
          <DetailLine
            label={'Сумма'}
            value={`${formatAmountDisplay(state.amount)} ₽`}
          />
          <DetailLine label={'Срок'} value={`${state.term} мес`} />
          <DetailLine
            label={'Ежемесячный платеж'}
            value={`${formatAmountDisplay(state.monthlyPayment)} ₽`}
          />
          <DetailLine label={'Ставка от'} value={'11,5 %'} />
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button
          className={styles.dataButton}
          onClick={() => console.log('Данные ИП')}
        >
          Данные ИП
          <ArrowIcon />
        </button>
        <button className={styles.dataButton} onClick={hadleClickOwnerData}>
          Данные собственника
          <ArrowIcon />
        </button>
      </div>
    </>
  );
};
