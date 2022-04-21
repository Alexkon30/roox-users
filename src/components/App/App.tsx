import React from 'react';
import './App.css';
import { store } from '../../store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UsersList } from '../../screens/UsersList/UsersList';
import { UserInfo } from '../../screens/UserInfo/UserInfo';
import Sidebar from '../Sidebar/Sidebar';

export const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path='/' element={<UsersList />} />
          <Route path='/:id' element={<UserInfo />} />
        </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
