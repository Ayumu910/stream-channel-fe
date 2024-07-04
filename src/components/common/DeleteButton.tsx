import React from 'react';
import styles from '../../styles/DeleteButton.module.css';

interface DeleteButtonProps {
  onDelete: () => void;
  itemType: 'category' | 'streamer' | 'playlist';
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, itemType }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <button
      className={styles['delete-button']}
      onClick={handleClick}
      data-type={itemType}
    >
      <span className={styles['delete-button__icon']}>🗑️</span>
      Delete
    </button>
  );
};

export default DeleteButton;