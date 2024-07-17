import React from 'react';
import styles from '../../styles/StreamerCommentList.module.css';

interface Comment {
  comment_id: number;
  comment_text: string;
  streamer_id: string;
}

interface StreamerCommentListProps {
  comments: Comment[];
}

const StreamerCommentList: React.FC<StreamerCommentListProps> = ({ comments }) => {
  return (
    <div className={styles['streamer-comment-list']}>
      <h2 className={styles['streamer-comment-list__title']}>コメント一覧</h2>
      {comments.length === 0 ? (
        <p className={styles['streamer-comment-list__empty']}>まだコメントがありません。</p>
      ) : (
        <ul className={styles['streamer-comment-list__items']}>
          {comments.map((comment) => (
            <li key={comment.comment_id} className={styles['streamer-comment-list__item']}>
              <p className={styles['streamer-comment-list__text']}>{comment.comment_text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StreamerCommentList;