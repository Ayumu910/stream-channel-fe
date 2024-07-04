import React, { useState } from 'react';
import classNames from 'classnames';
import usePlaylists from '../../hooks/usePlaylists';
import styles from '../../styles/SharePlaylistForm.module.css';

interface SharePlaylistFormProps {
  onClose: () => void;
}

const SharePlaylistForm: React.FC<SharePlaylistFormProps> = ({ onClose }) => {
  const { playlists, refetchPlaylists } = usePlaylists();
  const [confirmationPlaylist, setConfirmationPlaylist] = useState<number | null>(null);

  const handleShareToggle = (playlistId: number) => {
    setConfirmationPlaylist(playlistId);
  };

  const handleConfirmation = async (confirm: boolean) => {
    if (!confirm || !confirmationPlaylist) {
      setConfirmationPlaylist(null);
      return;
    }

    try {
      const playlist = playlists.find(p => p.playlist_id === confirmationPlaylist);
      if (!playlist) return;

      const newShareStatus = !playlist.shared;

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/playlists/${confirmationPlaylist}/share`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ share: newShareStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update share status');
      }

      await refetchPlaylists();
    } catch (error) {
      console.error('Error updating share status:', error);
    } finally {
      setConfirmationPlaylist(null);
    }
  };

  return (
    <div className={styles['share-playlist-form']}>
      <button className={styles['share-playlist-form__close-button']} onClick={onClose}>×</button>
      <h2 className={styles['share-playlist-form__title']}>Share Playlists</h2>
      <div className={styles['share-playlist-form__playlist-list']}>
        {playlists.map((playlist) => (
          <div key={playlist.playlist_id} className={styles['share-playlist-form__playlist-item']}>
            <span className={styles['share-playlist-form__playlist-name']}>{playlist.playlist_title}</span>
            <button
              className={classNames(
                styles['share-playlist-form__share-toggle'],
                {
                  [styles['share-playlist-form__share-toggle--shared']]: playlist.shared,
                  [styles['share-playlist-form__share-toggle--not-shared']]: !playlist.shared
                }
              )}
              onClick={() => handleShareToggle(playlist.playlist_id)}
            >
              {playlist.shared ? 'Shared' : 'Not Shared'}
            </button>
          </div>
        ))}
      </div>
      {confirmationPlaylist && (
        <div className={styles['share-playlist-form__confirmation-dialog']}>
          <p className={styles['share-playlist-form__confirmation-message']}>
            Are you sure you want to change the share status of this playlist?
          </p>
          <button
            onClick={() => handleConfirmation(true)}
            className={styles['share-playlist-form__confirmation-button']}
          >
            OK
          </button>
          <button
            className={classNames(
              styles['share-playlist-form__confirmation-button'],
              styles['share-playlist-form__confirmation-button--cancel']
            )}
            onClick={() => handleConfirmation(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default SharePlaylistForm;