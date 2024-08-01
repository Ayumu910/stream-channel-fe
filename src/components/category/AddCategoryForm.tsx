import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import useCategories from '../../hooks/useCategories';
import { isValidStreamerUrl } from '../../utils/urlValidator';
import styles from '../../styles/AddCategoryForm.module.css';
import { X, Plus } from 'lucide-react';

interface AddCategoryFormProps {
  onClose: () => void;
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onClose }) => {
  const { categories, refetchCategories } = useCategories();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);  //展開状態のカテゴリを管理する
  const [streamerUrl, setStreamerUrl] = useState('');                             //フォーム用 の State
  const [newCategoryName, setNewCategoryName] = useState('');                     //フォーム用の State
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  //配信者をカテゴリに追加
  const handleAddStreamer = useCallback(async (categoryId: string) => {
    if (!streamerUrl) return;

    if (!isValidStreamerUrl(streamerUrl)) {
      setMessage({ type: 'error', text: 'Invalid URL format. Please enter a valid YouTube or Twitch URL.' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/categories/${categoryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ streamer_url: streamerUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to add streamer');
      }

      //成功後はメッセージを表示してフォームをリセットし、再 fetch
      setMessage({ type: 'success', text: 'Streamer added successfully!' });
      setStreamerUrl('');
      setExpandedCategory(null);
      await refetchCategories();
    } catch (error) {
      console.error('Error adding streamer:', error);
      //失敗時にもメッセージを表示
      setMessage({ type: 'error', text: 'Failed to add streamer. Please try again.' });
    }
  }, [streamerUrl, refetchCategories]);

  //カテゴリを追加
  const handleAddCategory = async () => {
    if (!newCategoryName) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.VITE_LOCAL_API_URL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newCategoryName }),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      //成功後はメッセージを表示してフォームをリセットし、再 fetch
      setMessage({ type: 'success', text: 'Category added successfully!' });
      setNewCategoryName('');
      await refetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
      //失敗時にもメッセージを表示
      setMessage({ type: 'error', text: 'Failed to add category. Please try again.' });
    }
  };

  return (
    <div className={styles['add-category-form']}>
      <button className={styles['add-category-form__close-button']} onClick={onClose}>
        <X size={18} />
      </button>
      <h2 className={styles['add-category-form__title']}>Add Streamer to Category</h2>
      {message && (
        <div className={classNames(
          styles['add-category-form__message'],
          {
            [styles['add-category-form__message--success']]: message.type === 'success',
            [styles['add-category-form__message--error']]: message.type === 'error'
          }
        )}>
          {message.text}
        </div>
      )}
      <div className={styles['add-category-form__category-list']}>
        {categories.map((category) => (
          <div key={category.category_id} className={styles['add-category-form__category-item']}>
            <div className={styles['add-category-form__category-header']}>
              <span className={styles['add-category-form__category-name']}>{category.category_title}</span>
              <button
                className={styles['add-category-form__expand-button']}
                onClick={() => setExpandedCategory(
                  expandedCategory === category.category_id ? null : category.category_id
                )}
              >
                <Plus size={20} />
              </button>
            </div>
            {expandedCategory === category.category_id && (
              <div className={styles['add-category-form__streamer-url-form']}>
                <input
                  type="text"
                  value={streamerUrl}
                  onChange={(e) => setStreamerUrl(e.target.value)}
                  placeholder="Enter streamer URL"
                  className={styles['add-category-form__streamer-url-input']}
                />
                <button
                  onClick={() => handleAddStreamer(category.category_id)}
                  className={styles['add-category-form__add-streamer-button']}
                >
                Add
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <hr className={styles['add-category-form__divider']}/>
      <div className={styles['add-category-form__new-category']}>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter new category name"
          className={styles['add-category-form__new-category-input']}
        />
        <button
          onClick={handleAddCategory}
          className={styles['add-category-form__add-category-button']}
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;