import React, { useState } from 'react';
import classNames from 'classnames';
import styles from '../../styles/ReviewStreamButton.module.css';

interface ReviewStreamButtonProps {
  streamId: string;
  initialGoodCount: number;
  initialBadCount: number;
}

const ReviewStreamButton: React.FC<ReviewStreamButtonProps> = ({
  streamId,
  initialGoodCount = 0,
  initialBadCount = 0,
}) => {
  const [goodCount, setGoodCount] = useState(initialGoodCount);
  const [badCount, setBadCount] = useState(initialBadCount);

  const handleReview = async (isGood: boolean) => {
    try {
      const platform = /^\d+$/.test(streamId) ? 'twitch' : 'youtube';
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/streams/${streamId}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: { good: isGood, bad: !isGood },
          platforms: platform,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update rating');
      }

      const data = await response.json();
      setGoodCount(data.stream.good_rate);
      setBadCount(data.stream.bad_rate);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <div className={styles['review-stream']}>
      <button
        className={classNames(
          styles['review-stream__button'],
          styles['review-stream__button--good']
        )}
        onClick={() => handleReview(true)}
      >
        🔥 アタリ枠 {goodCount}
      </button>
      <button
        className={classNames(
          styles['review-stream__button'],
          styles['review-stream__button--bad']
        )}
        onClick={() => handleReview(false)}
      >
        💧 ハズレ枠 {badCount}
      </button>
    </div>
  );
};

export default ReviewStreamButton;