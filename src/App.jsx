import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LevelTestPage from './pages/LevelTestPage';
import MakeStudyPage from './pages/MakeStudyPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/level-test" element={<LevelTestPage />} />
          <Route path="/make-my-study" element={<MakeStudyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
