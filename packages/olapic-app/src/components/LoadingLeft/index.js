import React from 'react';
import styles from './styles.scss';

const Item = () => (
  <div className={styles.connection}>
    <div className={styles.circle}>
      <span className={styles.circle__el} />
    </div>
    <div className={styles.circle}>
      <span className={[styles.circle__el, styles.scircle__el_two].join(' ')} />
    </div>
    <div className={styles.circle}>
      <span className={[styles.circle__el, styles.circle__el_three].join(' ')} />
    </div>
    <h3 className={styles.text}>Pinging the ISS...</h3>
  </div>
);

export default Item;
