import React from 'react';
import { useParams } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { StreamerProvider, useStreamerContext } from '../contexts/StreamerContext';
import GlobalNavBar from '../components/layout/NavBar';
import SideMenu from '../components/layout/SideMenu';
import StreamerHeader from '../components/streamer/StreamerHeader';
import StreamerCommentForm from '../components/streamer/StreamerCommentForm';
import StreamerCommentList from '../components/streamer/StreamerCommentList';
import useStreamerComments from '../hooks/useStreamerComments';
import styles from '../styles/StreamerForumPage.module.css';

const StreamerForumContent: React.FC = () => {
  const { streamerId } = useParams<{ streamerId: string }>();
  const { streamer, isLoading: isStreamerLoading, error: streamerError } = useStreamerContext();
  const { comments, addComment, isLoading: isCommentsLoading } = useStreamerComments(streamerId ?? '');

  if (isStreamerLoading || isCommentsLoading) return <div>Loading...</div>;
  if (streamerError) return <div>Error: {streamerError.message}</div>;
  if (!streamer) return <div>Streamer not found</div>;

  return (
    <div className={styles['streamer-forum-page']}>
      <GlobalNavBar />
      <div className={styles['streamer-forum-page__content']}>
        <SideMenu />
        <main className={styles['streamer-forum-page__main']}>
          <StreamerHeader />
          {streamerId && (
            <>
              <StreamerCommentForm streamerId={streamerId} onAddComment={addComment} />
              <StreamerCommentList comments={comments} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

const StreamerForumPage: React.FC = () => {
  const { streamerId } = useParams<{ streamerId: string }>();

  if (!streamerId) return <div>Streamer ID not provided</div>;

  return (
    <AuthProvider>
      <StreamerProvider streamerId={streamerId}>
        <StreamerForumContent />
      </StreamerProvider>
    </AuthProvider>
  );
};

export default StreamerForumPage;