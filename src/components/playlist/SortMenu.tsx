import React, { useState } from 'react';
import classNames from 'classnames';
import styles from '../../styles/SortMenu.module.css';

interface SortMenuProps {
  onSort: (order: 'views' | 'newest' | 'oldest') => void;
}

const SortMenu: React.FC<SortMenuProps> = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (order: 'views' | 'newest' | 'oldest') => {
    onSort(order);
    setIsOpen(false);
  };

  return (
    <div className={styles['sort-menu']}>
      <button
        className={classNames(styles['sort-menu__toggle'], {
          [styles['sort-menu__toggle--open']]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        Sort
      </button>
      <ul
        className={classNames(styles['sort-menu__options'], {
          [styles['sort-menu__options--open']]: isOpen,
        })}
      >
        <li>
          <button onClick={() => handleSort('views')}>Most Viewed</button>
        </li>
        <li>
          <button onClick={() => handleSort('newest')}>Newest</button>
        </li>
        <li>
          <button onClick={() => handleSort('oldest')}>Oldest</button>
        </li>
      </ul>
    </div>
  );
};

export default SortMenu;