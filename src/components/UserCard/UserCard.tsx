import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../store/types';
import './UserCard.css';

interface CardProps {
  user: User;
}

const UserCard = ({ user }: CardProps): JSX.Element => {
  return (
    <div className='user-card'>
      <div className='user-card__info'>
        <div className='user-card__info_item'>
          <span className='label sub-text'>ФИО:</span>
          <span className='data sub-text'>{user.name}</span>
        </div>
        <div className='user-card__info_item'>
          <span className='label sub-text'>город:</span>
          <span className='data sub-text'>{user.address.city}</span>
        </div>
        <div className='user-card__info_item'>
          <span className='label sub-text'>компания:</span>
          <span className='data sub-text'>{user.company.name}</span>
        </div>
      </div>
      <div className='user-card__btn main-text'>
        <Link to={`/${user.id}`}>Подробнее</Link>
      </div>
    </div>
  );
};

export default UserCard;
