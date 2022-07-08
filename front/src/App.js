import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Report from './pages/report/reportPage';
import UserMain from './pages/main/Main';
import Diary from './pages/diary/Diary';
import Challenge from './pages/challenge/Challenge';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Note from './pages/note/Note';
import View from './pages/note/View';
import AboutUs from './pages/AboutUs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userMain" element={<UserMain />} />
          <Route path="/diaryEditor" element={<Diary />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/report" exact element={<Report />} />
          <Route path="/note" element={<Note />} />
          <Route path="/diary/:diaryId" element={<View />} />
          <Route path="*" exact element={<Landing />} />
        </Routes>
      </Router>
      <ToastContainer
        style={{ fontSize: '15px' }}
        position="top-center"
        autoClose={1200}
        closeOnClick={true}
      />
    </>
  );
}

export default App;
