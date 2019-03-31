import React from 'react';
import styles from './styles.scss';

const LoadingRight = () => (
  <>
    <span>¡Obteniendo fabulosas fotos!</span>
    <div className={styles.loading}>
      <div className={styles.obj} />
      <div className={styles.obj} />
      <div className={styles.obj} />
      <div className={styles.obj} />
      <div className={styles.obj} />
      <div className={styles.obj} />
      <div className={styles.obj} />
      <div className={styles.obj} />
    </div>
  </>
);

export default LoadingRight;
