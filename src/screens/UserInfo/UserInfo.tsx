import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  setName,
  setUsername,
  setEmail,
  setCity,
  setPhone,
  setStreet,
  setWebsite,
  setZipcode,
} from '../../store/userInfoSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserById, checkUser } from '../../store/userInfoSlice';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './UserInfo.css';

export const UserInfo = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [readonly, setReadonly] = useState<boolean>(true);
  const [comment, setComment] = useState<string>('');

  const changeCommentHandler = (value: string) => {
    setComment(value);
  };

  useEffect(() => {
    dispatch(fetchUserById(id))
  }, []);

  const setEditableHandler = () => {
    setReadonly(false);
  };

  const { currentUser, validateStats } = useAppSelector(
    (state) => state.userInfoReducer
  );


  const logFormData = () => {
    dispatch(checkUser(comment));
  };

  const inputs = [
    {
      title: 'Name',
      placeholder: 'Иван Иванов',
      value: currentUser.name ?? '',
      changeHandler: (val: string) => dispatch(setName(val)),
      isValid: validateStats.isValidName,
    },
    {
      title: 'User name',
      placeholder: 'Ivan',
      value: currentUser.username ?? '',
      changeHandler: (val: string) => dispatch(setUsername(val)),
      isValid: validateStats.isValidUsername,
    },
    {
      title: 'E-mail',
      placeholder: 'example@mail.com',
      value: currentUser.email ?? '',
      changeHandler: (val: string) => dispatch(setEmail(val)),
      isValid: validateStats.isValidEmail,
    },
    {
      title: 'Street',
      placeholder: 'ул. Пример',
      value: currentUser.address?.street ?? '',
      changeHandler: (val: string) => dispatch(setStreet(val)),
      isValid: validateStats.isValidStreet,
    },
    {
      title: 'City',
      placeholder: 'Москва',
      value: currentUser.address?.city ?? '',
      changeHandler: (val: string) => dispatch(setCity(val)),
      isValid: validateStats.isValidCity,
    },
    {
      title: 'Zip code',
      placeholder: '1234234',
      value: currentUser.address?.zipcode ?? '',
      changeHandler: (val: string) => dispatch(setZipcode(val)),
      isValid: validateStats.isValidCode,
    },
    {
      title: 'Phone',
      placeholder: '89991112233',
      value: currentUser.phone ?? '',
      changeHandler: (val: string) => dispatch(setPhone(val)),
      isValid: validateStats.isValidPhone,
    },
    {
      title: 'Website',
      placeholder: 'www.example.com',
      value: currentUser.website ?? '',
      changeHandler: (val: string) => dispatch(setWebsite(val)),
      isValid: validateStats.isValidWebsite,
    },
    {
      title: 'Comment',
      inputType: 'area',
      value: comment,
      changeHandler: changeCommentHandler,
    },
  ];

  return (
    <div className='user-info'>
      <div className='user-info__header'>
        <div className='title'>Профиль пользователя</div>
        <Button
          text='Редактировать'
          color='#4B51EF'
          onClick={setEditableHandler}
        />
      </div>
      <div className='user-info__body'>
        {inputs.map((item, i) => (
          <Input {...item} readonly={readonly} key={i} />
        ))}
      </div>
      <div className='user-info__footer'>
        <Button text='Отправить' color={readonly ? '#AFAFAF' : '#52CF4F'} onClick={logFormData} disabled={readonly}/>
      </div>
    </div>
  );
};
