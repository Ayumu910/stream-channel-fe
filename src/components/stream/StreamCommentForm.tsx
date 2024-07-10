import React, { useState, useEffect } from 'react';
import styles from '../../styles/StreamCommentForm.module.css';
import classNames from 'classnames';

interface StreamCommentFormProps {
  streamId: string;
}

const StreamCommentForm: React.FC<StreamCommentFormProps> = ({ streamId }) => {
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const platform = /^\d+$/.test(streamId) ? 'twitch' : 'youtube';
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/streams/${streamId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment_text: comment,
          platforms: platform,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      setComment('');
      setMessage('Comment added successfully!');
      setIsSuccess(true);
    } catch (error) {
      console.error('Error adding comment:', error);
      setMessage('Failed to add comment. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <>
      {message && (
        <div className={classNames(
          styles['stream-comment-form__message-box'],
          { [styles['stream-comment-form__message-box--success']]: isSuccess,
            [styles['stream-comment-form__message-box--error']]: !isSuccess }
        )}>
          {message}
        </div>
      )}
      <form className={styles['stream-comment-form']} onSubmit={handleSubmit}>
        <textarea
          className={styles['stream-comment-form__textarea']}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメントを入力してください"
          required
        />
        <button className={styles['stream-comment-form__submit']} type="submit">
          送信
        </button>
      </form>
    </>
  );
};

export default StreamCommentForm;