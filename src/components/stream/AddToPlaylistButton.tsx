import React, { useState } from 'react';
import AddToPlaylistForm from './AddToPlaylistForm';
import styles from '../../styles/AddToPlaylistButton.module.css';

interface AddToPlaylistButtonProps {
  url: string;
}

const AddToPlaylistButton: React.FC<AddToPlaylistButtonProps> = ({ url }) => {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <button className={styles['add-to-playlist-button']} onClick={handleOpenForm}>
        保存
      </button>
      {showForm && (
        <div className={styles['add-to-playlist-button__form-overlay']}>
          <AddToPlaylistForm url={url} onClose={handleCloseForm} />
        </div>
      )}
    </>
  );
};

export default AddToPlaylistButton;