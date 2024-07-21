import React from 'react';
import styles from '../../styles/StreamerAnalysisButton.module.css';

interface StreamerAnalysisButtonProps {
  onClick: () => void;
}

const StreamerAnalysisButton: React.FC<StreamerAnalysisButtonProps> = ({ onClick }) => {
  return (
    <button className={styles['streamer-analysis-button']} onClick={onClick}>
      配信者を評価する
    </button>
  );
};

export default StreamerAnalysisButton;