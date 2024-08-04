import { useState, useEffect, useCallback } from 'react';

interface Comment {
  comment_id: number;
  comment_text: string;
  streamer_id: string;
}

//State, fetchComments(), addComments() を保持
const useStreamerComments = (streamerId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  //GET /streamer/${streamerId}/comments にリクエストを送る
  const fetchComments = useCallback(async () => {
    if (!streamerId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/streamer/${streamerId}/comments`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data: Comment[] = await response.json();
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [streamerId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  //POST /streamer/${streamerId}/comments にリクエストを送る
  const addComment = async (commentText: string) => {
    if (!streamerId) return;

    try {
      const platform = /^\d+$/.test(streamerId) ? 'twitch' : 'youtube';
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/streamer/${streamerId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment_text: commentText, platform }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const newComment: { comment: Comment } = await response.json();
      setComments((prevComments) => [...prevComments, newComment.comment]);
    } catch (err) {
      console.error('Error adding comment:', err);
      throw err;
    }
  };

  return { comments, addComment, isLoading, error };
};

export default useStreamerComments;