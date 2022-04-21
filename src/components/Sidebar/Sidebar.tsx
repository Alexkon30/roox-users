import React from 'react'
import { setSortByCity, setSortByName } from '../../store/usersSlice'
import { useAppDispatch } from '../../store/hooks'
import Button from '../Button/Button'
import './Sidebar.css'

const Sidebar = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const sortByNameHandler = () => {
    dispatch(setSortByName())
  }

  const sortByCityHandler = () => {
    dispatch(setSortByCity())
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header main-text">Сортировка</div>
      <div className="sidebar__buttons">
        <Button text='по имени' onClick={sortByNameHandler} color='#4B51EF'/>
        <Button text='по городу' onClick={sortByCityHandler} color='#4B51EF'/>
      </div>
    </div>
  )
}

export default Sidebar