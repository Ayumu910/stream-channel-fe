import React from 'react';
import styles from '../../styles/StreamerBasicInfo.module.css';

interface StreamerBasicInfoProps {
  basicInfo: {
    total_views: string;
    subscribers: string;
  };
}

const StreamerBasicInfo: React.FC<StreamerBasicInfoProps> = ({ basicInfo }) => {
  return (
    <div className={styles['streamer-basic-info']}>
      <h2 className={styles['streamer-basic-info__title']}>配信者の基本情報</h2>
      <div className={styles['streamer-basic-info__content']}>
        <div className={styles['streamer-basic-info__item']}>
          <span className={styles['streamer-basic-info__label']}>総視聴回数:</span>
          <span className={styles['streamer-basic-info__value']}>
            {basicInfo.total_views === '取得できません' ? '取得できません' : basicInfo.total_views}
          </span>
        </div>
        <div className={styles['streamer-basic-info__item']}>
          <span className={styles['streamer-basic-info__label']}>登録者数:</span>
          <span className={styles['streamer-basic-info__value']}>{basicInfo.subscribers}</span>
        </div>
      </div>
    </div>
  );
};

export default StreamerBasicInfo;