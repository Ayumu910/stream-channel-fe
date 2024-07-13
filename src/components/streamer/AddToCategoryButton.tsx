import React, { useState } from 'react';
import { Heart } from 'lucide-react';   //アイコンライブラリ
import AddToCategoryForm from './AddToCategoryForm';
import styles from '../../styles/AddToCategoryButton.module.css';

interface AddToCategoryButtonProps {
  streamerId: string | undefined;
}

const AddToCategoryButton: React.FC<AddToCategoryButtonProps> = ({ streamerId }) => {
  const [showForm, setShowForm] = useState(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <button className={styles['add-to-category-button']} onClick={handleOpenForm}>
        <Heart className={styles['add-to-category-button__icon']} />
        お気に入り
      </button>
      {showForm && (
        <div className={styles['add-to-category-button__form-overlay']}>
          <AddToCategoryForm streamerId={streamerId} onClose={handleCloseForm} />
        </div>
      )}
    </>
  );
};

export default AddToCategoryButton;