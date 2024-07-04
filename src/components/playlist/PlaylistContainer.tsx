import React from 'react';
import Playlist from './Playlist';
import DeleteButton from '../common/DeleteButton';
import usePlaylists from '../../hooks/usePlaylists';
import styles from '../../styles/PlaylistContainer.module.css';

const PlaylistContainer: React.FC = () => {
  const { playlists, isLoading, error, refetchPlaylists } = usePlaylists();

  const handleDeletePlaylist = async (playlistId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/playlists/${playlistId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete playlist');
      }

      refetchPlaylists();
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  if (isLoading) return <div className={styles['playlist-container__loading']}>Loading playlists...</div>;
  if (error) return <div className={styles['playlist-container__error']}>Error: {error.message}</div>;

  return (
    <div className={styles['playlist-container']}>
      {playlists.map(playlist => (
        <div key={playlist.playlist_id} className={styles['playlist-container__item']}>
          <div className={styles['playlist-container__content']}>
            <Playlist
              playlistId={playlist.playlist_id}
              playlistName={playlist.playlist_title}
              thumbnail={playlist.thumbnail}
            />
          </div>
          <div className={styles['playlist-container__action']}>
            <DeleteButton
              onDelete={() => handleDeletePlaylist(playlist.playlist_id)}
              itemType="playlist"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistContainer;