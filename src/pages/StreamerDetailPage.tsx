import React from 'react';
import { useParams } from 'react-router-dom';

const StreamerDetailPage: React.FC = () => {
  const { streamerId } = useParams<{ streamerId: string }>();

  return (
    <div>
      <h1>Streamer Detail Page</h1>
      <p>Streamer ID: {streamerId}</p>
      <p>This is a placeholder for the Streamer Detail Page.</p>
    </div>
  );
};

export default StreamerDetailPage;