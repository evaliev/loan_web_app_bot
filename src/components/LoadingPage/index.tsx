import { Loader } from '../Loader';
import styles from './styles.module.scss';

export const LoadingPage = () => (
  <div className={styles.container}>
    <Loader />
  </div>
);
