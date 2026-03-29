import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LevelTestPage from './pages/LevelTestPage';
import TestResultPage from './pages/TestResultPage.jsx'
import MakeStudyPage from './pages/MakeStudyPage';
import MyStudiesPage from './pages/MyStudiesPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/level-test" element={<LevelTestPage />} />
          <Route path="/my-test-result" element={<TestResultPage  />} />
          <Route path="/make-my-study" element={<MakeStudyPage />} />
          <Route path="/my-studies-list" element={<MyStudiesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
