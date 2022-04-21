import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUsers } from '../../store/usersSlice';
import { User } from '../../store/types';
import UserCard from '../../components/UserCard/UserCard';
import './UsersList.css';

export const UsersList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { users, isLoading, sortedBy } = useAppSelector(
    (state) => state.usersReducer
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const sortedUsers: User[] = useMemo(() => {
    let usersCopy = JSON.parse(JSON.stringify(users)) as User[];

    if (sortedBy === 'name') {
      return usersCopy.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    } else if (sortedBy === 'city') {
      return usersCopy.sort((a, b) => {
        if (a.address.city > b.address.city) return 1;
        if (a.address.city < b.address.city) return -1;
        return 0;
      });
    } else {
      console.log('Wrong \'sortedBy\' value')
      return usersCopy
    }
  }, [sortedBy, users]);

  return (
    <>
      <div className='users__list'>
        {isLoading ? (
          <div className='loader'>Loading...</div>
        ) : (
          <>
            <div className='users__header title'>Список пользователей</div>
            <div className='users__body'>
              {sortedUsers.map((user) => (
                <UserCard user={user} key={user.id} />
              ))}
            </div>
            <div className='users__footer main-text'>
              Найдено {users.length} пользователей
            </div>
          </>
        )}
      </div>
    </>
  );
};
