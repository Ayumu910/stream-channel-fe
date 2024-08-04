import React, { useState, useEffect } from 'react';
import usePlaylists from '../../hooks/usePlaylists';
import styles from '../../styles/AddToPlaylistForm.module.css';
import classNames from 'classnames';

interface AddToPlaylistFormProps {
  url: string;
  onClose: () => void;
}

const AddToPlaylistForm: React.FC<AddToPlaylistFormProps> = ({ url, onClose }) => {
  const { playlists, isLoading, error } = usePlaylists();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  //成功時にメッセージを初期化して、フォームを閉じる
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        if (isSuccess) {
          onClose();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, isSuccess, onClose]);

  //選択したプレイリストに、開いている配信を追加する
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlaylistId) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/playlists/${selectedPlaylistId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ stream_url: url }),
      });

      if (!response.ok) {
        throw new Error('Failed to add stream to playlist');
      }

      setMessage('Stream added to playlist successfully!');
      setIsSuccess(true);
    } catch (error) {
      setMessage('Failed to add stream to playlist. Please try again.');
      setIsSuccess(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles['add-to-playlist-form']}>
        <div className={styles['add-to-playlist-form__loading']}>Loading playlists...</div>
        <button className={styles['add-to-playlist-form__cancel']} onClick={onClose}>Close</button>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['add-to-playlist-form']}>
        <div className={styles['add-to-playlist-form__error']}>Error: {error.message}</div>
        <button className={styles['add-to-playlist-form__cancel']} onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <>
      {message && (
        <div className={classNames(
          styles['add-to-playlist-form__message'],
          { [styles['add-to-playlist-form__message--success']]: isSuccess,
            [styles['add-to-playlist-form__message--error']]: !isSuccess }
        )}>
          {message}
        </div>
      )}
      <div className={styles['add-to-playlist-form']}>
        <h2 className={styles['add-to-playlist-form__title']}>Add to Playlist</h2>
        <form className={styles['add-to-playlist-form__form']} onSubmit={handleSubmit}>
          <div className={styles['add-to-playlist-form__list']}>
            {playlists.map((playlist) => (
              <div key={playlist.playlist_id} className={styles['add-to-playlist-form__item']}>
                <input
                  type="radio"
                  id={`playlist-${playlist.playlist_id}`}
                  name="playlist"
                  value={playlist.playlist_id}
                  checked={selectedPlaylistId === playlist.playlist_id}
                  onChange={() => setSelectedPlaylistId(playlist.playlist_id)}
                  className={styles['add-to-playlist-form__radio']}
                />
                <label
                  htmlFor={`playlist-${playlist.playlist_id}`}
                  className={styles['add-to-playlist-form__label']}
                >
                  {playlist.playlist_title}
                </label>
              </div>
            ))}
          </div>
          <div className={styles['add-to-playlist-form__actions']}>
            <button
              type="submit"
              className={styles['add-to-playlist-form__submit']}
              disabled={!selectedPlaylistId}
            >
              OK
            </button>
            <button
              type="button"
              className={styles['add-to-playlist-form__cancel']}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddToPlaylistForm;