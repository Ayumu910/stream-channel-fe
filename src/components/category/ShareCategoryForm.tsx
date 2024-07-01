import React, { useState } from 'react';
import classNames from 'classnames';
import useCategories from '../../hooks/useCategories';
import styles from '../../styles/ShareCategoryForm.module.css';

interface ShareCategoryFormProps {
  onClose: () => void;
}

const ShareCategoryForm: React.FC<ShareCategoryFormProps> = ({ onClose }) => {
  const { categories, refetchCategories } = useCategories();
  const [confirmationCategory, setConfirmationCategory] = useState<string | null>(null);

  const handleShareToggle = (categoryId: string) => {
    setConfirmationCategory(categoryId);
  };

  const handleConfirmation = async (confirm: boolean) => {
    if (!confirm || !confirmationCategory) {
      setConfirmationCategory(null);
      return;
    }

    try {
      const category = categories.find(c => c.category_id === confirmationCategory);
      if (!category) return;

      const newShareStatus = !category.shared;

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/categories/${confirmationCategory}/share`, {
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

      await refetchCategories();
    } catch (error) {
      console.error('Error updating share status:', error);
    } finally {
      setConfirmationCategory(null);
    }
  };

  return (
    <div className={styles['share-category-form']}>
      <button className={styles['share-category-form__close-button']} onClick={onClose}>×</button>
      <h2 className={styles['share-category-form__title']}>Share Categories</h2>
      <div className={styles['share-category-form__category-list']}>
        {categories.map((category) => (
          <div key={category.category_id} className={styles['share-category-form__category-item']}>
            <span className={styles['share-category-form__category-name']}>{category.category_title}</span>
            <button
              className={classNames(
                styles['share-category-form__share-toggle'],
                {
                  [styles['share-category-form__share-toggle--shared']]: category.shared,
                  [styles['share-category-form__share-toggle--not-shared']]: !category.shared
                }
              )}
              onClick={() => handleShareToggle(category.category_id)}
            >
              {category.shared ? 'Shared' : 'Not Shared'}
            </button>
          </div>
        ))}
      </div>
      {confirmationCategory && (
        <div className={styles['share-category-form__confirmation-dialog']}>
          <p className={styles['share-category-form__confirmation-message']}>
            Are you sure you want to change the share status of this category?
          </p>
          <button
            onClick={() => handleConfirmation(true)}
            className={styles['share-category-form__confirmation-button']}
          >
            OK
          </button>
          <button
            className={classNames(
              styles['share-category-form__confirmation-button'],
              styles['share-category-form__confirmation-button--cancel']
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

export default ShareCategoryForm;