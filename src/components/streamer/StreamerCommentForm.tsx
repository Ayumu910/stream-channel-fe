import React, { useState } from 'react';
import styles from '../../styles/StreamerCommentForm.module.css';

interface StreamerCommentFormProps {
  streamerId: string;
  onAddComment: (commentText: string) => Promise<void>;
}

const StreamerCommentForm: React.FC<StreamerCommentFormProps> = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await onAddComment(commentText);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form className={styles['streamer-comment-form']} onSubmit={handleSubmit}>
      <textarea
        className={styles['streamer-comment-form__textarea']}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="コメントを入力してください"
        required
      />
      <button className={styles['streamer-comment-form__submit']} type="submit">
        送信
      </button>
    </form>
  );
};

export default StreamerCommentForm;