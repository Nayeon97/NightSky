import React, { useState, useEffect, useReducer, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Introduction from './pages/Introduction';
import UserMain from './pages/main/Main';
import UserInfo from './pages/UserInfo';
import Nav from './components/nav/Nav';
import Diary from './pages/diary/Diary';
import Challenge from './pages/challenge/Challenge';
import Login from './pages/login/Login';
import './App.css';

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" exact element={<Introduction />} />
        <Route path="/userMain" element={<UserMain />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/diaryEditor" element={<Diary />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
