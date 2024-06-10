import React from 'react';
import { useParams } from 'react-router-dom';

const StreamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Stream Detail Page</h1>
      <p>Stream ID: {id}</p>
      {/* ここに配信詳細を表示するコンポーネントを追加 */}
    </div>
  );
};

export default StreamDetailPage;