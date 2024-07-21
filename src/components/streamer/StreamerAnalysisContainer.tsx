import React, { useState } from 'react';
import { useStreamerContext } from '../../contexts/StreamerContext';
import useStreamerAnalytics from '../../hooks/useStreamerAnalytics';
import StreamerBasicInfo from './StreamerBasicInfo';
import StreamerAnalysisGraph from './StreamerAnalysisGraph';
import StreamerDemographics from './StreamerDemographics';
import StreamerAnalysisButton from './StreamerAnalysisButton';
import StreamerAnalysisForm from './StreamerAnalysisForm';
import styles from '../../styles/StreamerAnalysisContainer.module.css';

const StreamerAnalysisContainer: React.FC = () => {
  const { streamer } = useStreamerContext();
  const { analyticsData, isLoading, error, refetchAnalytics } = useStreamerAnalytics(streamer?.id, streamer?.platform);
  const [showAnalysisForm, setShowAnalysisForm] = useState(false);

  if (isLoading) return <div className={styles['streamer-analysis__loading']}>Loading...</div>;
  if (error) return <div className={styles['streamer-analysis__error']}>Error: {error}</div>;
  if (!analyticsData) return <div className={styles['streamer-analysis__not-found']}>No analytics data found</div>;

  return (
    <div className={styles['streamer-analysis']}>
      <div className={styles['streamer-analysis__top-row']}>
        <div className={styles['streamer-analysis__basic-info']}>
          <StreamerBasicInfo basicInfo={analyticsData.basic_info} />
        </div>
        <div className={styles['streamer-analysis__graph']}>
          <StreamerAnalysisGraph ratings={analyticsData.ratings} />
        </div>
      </div>
      <div className={styles['streamer-analysis__demographics']}>
        <StreamerDemographics demographics={analyticsData.audience_demographics} />
      </div>
      <StreamerAnalysisButton onClick={() => setShowAnalysisForm(true)} />
      {showAnalysisForm && (
        <StreamerAnalysisForm
          onClose={() => setShowAnalysisForm(false)}
          onSubmit={() => {
            setShowAnalysisForm(false);
            refetchAnalytics();
          }}
        />
      )}
    </div>
  );
};

export default StreamerAnalysisContainer;