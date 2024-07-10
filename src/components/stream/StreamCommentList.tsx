import React from 'react';
import styles from '../../styles/StreamCommentList.module.css';

interface Comment {
  id: string;
  comment_text: string;
}

interface StreamCommentListProps {
  comments: Comment[];
}

const StreamCommentList: React.FC<StreamCommentListProps> = ({ comments }) => {
  return (
    <div className={styles['stream-comment-list']}>
      <h3 className={styles['stream-comment-list__title']}>コメント</h3>
      {comments.length === 0 ? (
        <p className={styles['stream-comment-list__empty']}>まだコメントがありません。</p>
      ) : (
        <ul className={styles['stream-comment-list__items']}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles['stream-comment-list__item']}>
              <p className={styles['stream-comment-list__text']}>{comment.comment_text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StreamCommentList;