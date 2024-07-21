import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import styles from '../../styles/StreamerAnalysisGraph.module.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface StreamerAnalysisGraphProps {
  ratings: {
    [key: string]: number;
  };
}

const StreamerAnalysisGraph: React.FC<StreamerAnalysisGraphProps> = ({ ratings }) => {
  const labels = {
    humor: '面白さ',
    gaming_skill: 'ゲームの上手さ',
    appearance: 'ルックス',
    uniqueness: '独自性',
    collaboration_frequency: 'コラボの頻度',
    streaming_frequency: '配信頻度',
    game_or_chat: 'ゲームか雑談か',
    wholesomeness: 'クリーンさ'
  };

  const data = {
    labels: Object.values(labels),
    datasets: [
      {
        label: '配信者の評価',
        data: Object.keys(labels).map(key => ratings[key]),
        backgroundColor: 'rgba(255, 138, 0, 0.2)',
        borderColor: 'rgba(255, 138, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 5
      }
    }
  };

  return (
    <div className={styles['streamer-analysis-graph']}>
      <h2 className={styles['streamer-analysis-graph__title']}>配信者の評価</h2>
      <div className={styles['streamer-analysis-graph__chart']}>
        <Radar data={data} options={options} />
      </div>
      <div className={styles['streamer-analysis-graph__annotation']}>
        ※ 「ゲームか雑談か」: 5に近づくほどゲーム配信が多い
      </div>
    </div>
  );
};

export default StreamerAnalysisGraph;