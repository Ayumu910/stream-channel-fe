import React, { useState } from 'react';
import { useStreamerContext } from '../../contexts/StreamerContext';
import styles from '../../styles/StreamerAnalysisForm.module.css';

interface StreamerAnalysisFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

const ratingLabels: { [key: string]: string } = {
  humor: '面白さ',
  gaming_skill: 'ゲームの上手さ',
  appearance: 'ルックス',
  uniqueness: '独自性',
  collaboration_frequency: 'コラボの頻度',
  streaming_frequency: '配信頻度',
  game_or_chat: 'ゲームか雑談か',
  wholesomeness: 'クリーンさ'
};

const StreamerAnalysisForm: React.FC<StreamerAnalysisFormProps> = ({ onClose, onSubmit }) => {
  const { streamer } = useStreamerContext();
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [ratings, setRatings] = useState({
    humor: 1,
    gaming_skill: 1,
    appearance: 1,
    uniqueness: 1,
    collaboration_frequency: 1,
    streaming_frequency: 1,
    game_or_chat: 1,
    wholesomeness: 1
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRatingChange = (key: string, value: number) => {
    setRatings(prevRatings => ({ ...prevRatings, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gender || !age || Object.values(ratings).some(rating => rating === 0)) {
      setError('すべての項目を入力してください');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/streamer/${streamer?.id}/analytics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseInt(age),
          gender,
          ratings,
          platform: streamer?.platform
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit analysis');
      }

      setSuccess('評価が送信されました');
      setTimeout(() => {
        onSubmit();
        onClose();
      }, 2000);
    } catch (err) {
      setError('評価の送信に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div className={styles['streamer-analysis-form-overlay']}>
      <div className={styles['streamer-analysis-form']}>
        <button className={styles['streamer-analysis-form__close']} onClick={onClose}>×</button>
        <h2 className={styles['streamer-analysis-form__title']}>配信者を評価する</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles['streamer-analysis-form__field']}>
            <label htmlFor="gender">性別:</label>
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">選択してください</option>
              <option value="male">男性</option>
              <option value="female">女性</option>
            </select>
          </div>
          <div className={styles['streamer-analysis-form__field']}>
            <label htmlFor="age">年齢:</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="10"
              required
            />
          </div>
          {Object.entries(ratings).map(([key, value]) => (
            <div key={key} className={styles['streamer-analysis-form__field']}>
              <label htmlFor={key}>{ratingLabels[key]}:</label>
              <input
                type="range"
                id={key}
                min="1"
                max="5"
                value={value}
                onChange={(e) => handleRatingChange(key, parseInt(e.target.value))}
              />
              <span>{value}</span>
              {key === 'game_or_chat' && (
                <span className={styles['streamer-analysis-form__annotation']}>
                  (5に近づくほどゲームが多い)
                </span>
              )}
            </div>
          ))}
          {error && <p className={styles['streamer-analysis-form__error']}>{error}</p>}
          {success && <p className={styles['streamer-analysis-form__success']}>{success}</p>}
          <button type="submit" className={styles['streamer-analysis-form__submit']}>評価</button>
        </form>
      </div>
    </div>
  );
};

export default StreamerAnalysisForm;