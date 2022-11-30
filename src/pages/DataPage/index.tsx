import { useContext } from 'react';

import styles from './DataPage.module.css';
import { DetailLine } from '../../components/DetailLine';
import { ReactComponent as DocsIcon } from './DocsIcon.svg';
import { useTelegramBtns } from '../../hooks';
import { ActionTypes } from '../../state/types';
import { PageStatuses } from '../types';
import { ContextApp } from '../../state/context';

export const DataPage = () => {
  const { dispatch } = useContext(ContextApp);

  useTelegramBtns({
    mainBtnTitle: 'Далее',
    /*eslint-disable-next-line */
    mainBtnHandler: () => {},
    hasBackBtn: true,
    backBtnHandler: () => {
      dispatch({
        type: ActionTypes.CHANGE_STATUS,
        payload: PageStatuses.TERM_PAGE,
      });
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
            <DocsIcon />
          </div>
          <div className={styles.titlesContainer}>
            <span className={styles.cardTitle}>Экспресс-кредит</span>
            <span className={styles.cardTitle}>для бизнеса</span>
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
              <span className={styles.detailsListHeaderValue}>Изменить</span>
            }
          />
          <DetailLine label={'Сумма'} value={'100 500 ₽'} />
          <DetailLine label={'Срок'} value={'12 мес'} />
          <DetailLine label={'Ежемесячный платеж'} value={'126 988 ₽'} />
          <DetailLine label={'Ставка от'} value={'11,5 %'} />
        </div>
      </div>
    </div>
  );
};
