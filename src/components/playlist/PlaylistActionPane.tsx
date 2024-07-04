import React, { useState } from 'react';
import classNames from 'classnames';
import AddPlaylistForm from './AddPlaylistForm';
import SharePlaylistForm from './SharePlaylistForm';
import styles from '../../styles/PlaylistActionPane.module.css';

const PlaylistActionPane: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showShareForm, setShowShareForm] = useState(false);

  return (
    <div className={styles['playlist-action-pane']}>
      <button
        className={classNames(
          styles['playlist-action-pane__button'],
          styles['playlist-action-pane__button--add']
        )}
        onClick={() => setShowAddForm(true)}
      >
        <span className={styles['playlist-action-pane__button-icon']}>+</span>
        Add Playlist
      </button>
      <button
        className={classNames(
          styles['playlist-action-pane__button'],
          styles['playlist-action-pane__button--share']
        )}
        onClick={() => setShowShareForm(true)}
      >
        <span className={styles['playlist-action-pane__button-icon']}>🔗</span>
        Share Playlist
      </button>
      {showAddForm && (
        <div className={styles['playlist-action-pane__form-overlay']}>
          <div className={styles['playlist-action-pane__form-container']}>
            <AddPlaylistForm onClose={() => setShowAddForm(false)} />
          </div>
        </div>
      )}
      {showShareForm && (
        <div className={styles['playlist-action-pane__form-overlay']}>
          <div className={styles['playlist-action-pane__form-container']}>
            <SharePlaylistForm onClose={() => setShowShareForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistActionPane;