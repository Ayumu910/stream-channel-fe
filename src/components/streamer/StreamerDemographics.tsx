import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import styles from '../../styles/StreamerDemographics.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StreamerDemographicsProps {
  demographics: {
    [key: string]: number;
  };
}

const StreamerDemographics: React.FC<StreamerDemographicsProps> = ({ demographics }) => {
  const labels = {
    '10s_male': '10代男性',
    '20s_male': '20代男性',
    '30s_male': '30代男性',
    '40s_male': '40代男性',
    '50s_male': '50代男性',
    '60s_over_male': '60代～男性',
    '10s_female': '10代女性',
    '20s_female': '20代女性',
    '30s_female': '30代女性',
    '40s_female': '40代女性',
    '50s_female': '50代女性',
    '60s_over_female': '60代～女性'
  };

  const total = Object.values(demographics).reduce((sum, value) => sum + value, 0);
  const data: ChartData<'bar'> = {
    labels: Object.values(labels),
    datasets: [
      {
        label: '視聴者の割合',
        data: Object.keys(labels).map(key => (demographics[key] / total) * 100),
        backgroundColor: 'rgba(255, 138, 0, 0.6)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(1) + '%';
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className={styles['streamer-demographics']}>
      <h2 className={styles['streamer-demographics__title']}>この配信を見ている人</h2>
      <div className={styles['streamer-demographics__chart']}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default StreamerDemographics;