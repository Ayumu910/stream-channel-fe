import React, { useState } from 'react';
import classNames from 'classnames';
import AddCategoryForm from './AddCategoryForm';
import ShareCategoryForm from './ShareCategoryForm';
import styles from '../../styles/CategoryActionPane.module.css';

const CategoryActionPane: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showShareForm, setShowShareForm] = useState(false);

  return (
    <div className={styles['category-action-pane']}>
      <button
        className={classNames(
          styles['category-action-pane__button'],
          styles['category-action-pane__button--add']
        )}
        onClick={() => setShowAddForm(true)}
      >
        <span className={styles['category-action-pane__button-icon']}>+</span>
        Streamer Category
      </button>
      <button
        className={classNames(
          styles['category-action-pane__button'],
          styles['category-action-pane__button--share']
        )}
        onClick={() => setShowShareForm(true)}
      >
        <span className={styles['category-action-pane__button-icon']}>🔗</span>
        Share Category
      </button>
      {showAddForm && (
        <div className={styles['category-action-pane__form-overlay']}>
          <div className={styles['category-action-pane__form-container']}>
            <AddCategoryForm onClose={() => setShowAddForm(false)} />
          </div>
        </div>
      )}
      {showShareForm && (
        <div className={styles['category-action-pane__form-overlay']}>
          <div className={styles['category-action-pane__form-container']}>
            <ShareCategoryForm onClose={() => setShowShareForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryActionPane;