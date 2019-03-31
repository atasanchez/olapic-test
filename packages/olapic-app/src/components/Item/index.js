import React from 'react';
import styles from './styles.scss';

const Item = ({ data }) => (
  <div className={styles.item}>
    {
      data.type === 'photo'
        ? (
          <img
            className={styles.img}
            src={data.webformatURL}
            alt={data.webformatURL}
          />
        )
        : (
          <video
            loop
            muted
            src={data.videos.small.url}
          >
            <track />
          </video>
        )
    }
    <div>
      <span>
        {data.city}, {data.country}
      </span>
    </div>
  </div>
);

export default Item;
