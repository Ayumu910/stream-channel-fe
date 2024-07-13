import React, { useState, useEffect } from 'react';
import useCategories from '../../hooks/useCategories';
import styles from '../../styles/AddToCategoryForm.module.css';
import classNames from 'classnames';

interface AddToCategoryFormProps {
  streamerId: string | undefined;
  onClose: () => void;
}

const AddToCategoryForm: React.FC<AddToCategoryFormProps> = ({ streamerId, onClose }) => {
  const { categories, isLoading, error } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string | null>(null); //応急処置、あとで設計を変更
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId || !streamerId) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/categories/${selectedCategoryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ streamer_url: `https://www.youtube.com/channel/${streamerId}` }),
      });

      if (!response.ok) {
        throw new Error('Failed to add streamer to category');
      }

      setMessage('Streamer added to category successfully!');
      setIsSuccess(true);
    } catch (error) {
      setMessage('Failed to add streamer to category. Please try again.');
      setIsSuccess(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles['add-to-category-form']}>
        <div className={styles['add-to-category-form__loading']}>Loading categories...</div>
        <button className={styles['add-to-category-form__cancel']} onClick={onClose}>Close</button>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['add-to-category-form']}>
        <div className={styles['add-to-category-form__error']}>Error: {error.message}</div>
        <button className={styles['add-to-category-form__cancel']} onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <>
      {message && (
        <div className={classNames(
          styles['add-to-category-form__message'],
          { [styles['add-to-category-form__message--success']]: isSuccess,
            [styles['add-to-category-form__message--error']]: !isSuccess }
        )}>
          {message}
        </div>
      )}
      <div className={styles['add-to-category-form']}>
        <h2 className={styles['add-to-category-form__title']}>Add to Category</h2>
        <form className={styles['add-to-category-form__form']} onSubmit={handleSubmit}>
          <div className={styles['add-to-category-form__list']}>
            {categories.map((category) => (
              <div key={category.category_id} className={styles['add-to-category-form__item']}>
                <input
                  type="radio"
                  id={`category-${category.category_id}`}
                  name="category"
                  value={category.category_id}
                  checked={selectedCategoryId === category.category_id}
                  onChange={() => setSelectedCategoryId(category.category_id)}
                  className={styles['add-to-category-form__radio']}
                />
                <label
                  htmlFor={`category-${category.category_id}`}
                  className={styles['add-to-category-form__label']}
                >
                  {category.category_title}
                </label>
              </div>
            ))}
          </div>
          <div className={styles['add-to-category-form__actions']}>
            <button
              type="submit"
              className={styles['add-to-category-form__submit']}
              disabled={!selectedCategoryId}
            >
              OK
            </button>
            <button
              type="button"
              className={styles['add-to-category-form__cancel']}
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

export default AddToCategoryForm;