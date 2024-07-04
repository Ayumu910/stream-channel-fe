import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import usePlaylists from '../../hooks/usePlaylists';
import { isValidStreamUrl } from '../../utils/urlValidator';
import styles from '../../styles/AddPlaylistForm.module.css';

interface AddPlaylistFormProps {
  onClose: () => void;
}

const AddPlaylistForm: React.FC<AddPlaylistFormProps> = ({ onClose }) => {
  const { playlists, refetchPlaylists } = usePlaylists();
  const [expandedPlaylist, setExpandedPlaylist] = useState<number | null>(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleAddStream = useCallback(async (playlistId: number) => {
    if (!streamUrl) return;

    if (!isValidStreamUrl(streamUrl)) {
      setMessage({ type: 'error', text: 'Invalid URL format. Please enter a valid YouTube or Twitch URL.' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/playlists/${playlistId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ stream_url: streamUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to add stream');
      }

      setMessage({ type: 'success', text: 'Stream added successfully!' });
      setStreamUrl('');
      setExpandedPlaylist(null);
      await refetchPlaylists();
    } catch (error) {
      console.error('Error adding stream:', error);
      setMessage({ type: 'error', text: 'Failed to add stream. Please try again.' });
    }
  }, [streamUrl, refetchPlaylists]);

  const handleAddPlaylist = async () => {
    if (!newPlaylistName) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ playlist_title: newPlaylistName }),
      });

      if (!response.ok) {
        throw new Error('Failed to add playlist');
      }

      setMessage({ type: 'success', text: 'Playlist added successfully!' });
      setNewPlaylistName('');
      await refetchPlaylists();
    } catch (error) {
      console.error('Error adding playlist:', error);
      setMessage({ type: 'error', text: 'Failed to add playlist. Please try again.' });
    }
  };

  return (
    <div className={styles['add-playlist-form']}>
      <button className={styles['add-playlist-form__close-button']} onClick={onClose}>×</button>
      <h2 className={styles['add-playlist-form__title']}>Add Stream to Playlist</h2>
      {message && (
        <div className={classNames(
          styles['add-playlist-form__message'],
          {
            [styles['add-playlist-form__message--success']]: message.type === 'success',
            [styles['add-playlist-form__message--error']]: message.type === 'error'
          }
        )}>
          {message.text}
        </div>
      )}
      <div className={styles['add-playlist-form__playlist-list']}>
        {playlists.map((playlist) => (
          <div key={playlist.playlist_id} className={styles['add-playlist-form__playlist-item']}>
            <div className={styles['add-playlist-form__playlist-header']}>
              <span className={styles['add-playlist-form__playlist-name']}>{playlist.playlist_title}</span>
              <button
                className={styles['add-playlist-form__expand-button']}
                onClick={() => setExpandedPlaylist(
                  expandedPlaylist === playlist.playlist_id ? null : playlist.playlist_id
                )}
              >
                +
              </button>
            </div>
            {expandedPlaylist === playlist.playlist_id && (
              <div className={styles['add-playlist-form__stream-url-form']}>
                <input
                  type="text"
                  value={streamUrl}
                  onChange={(e) => setStreamUrl(e.target.value)}
                  placeholder="Enter stream URL"
                  className={styles['add-playlist-form__stream-url-input']}
                />
                <button
                  onClick={() => handleAddStream(playlist.playlist_id)}
                  className={styles['add-playlist-form__add-stream-button']}
                >
                Add
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <hr className={styles['add-playlist-form__divider']}/>
      <div className={styles['add-playlist-form__new-playlist']}>
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="Enter new playlist name"
          className={styles['add-playlist-form__new-playlist-input']}
        />
        <button
          onClick={handleAddPlaylist}
          className={styles['add-playlist-form__add-playlist-button']}
        >
          Add Playlist
        </button>
      </div>
    </div>
  );
};

export default AddPlaylistForm;