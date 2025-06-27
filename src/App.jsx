import React from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Features from './pages/Features'
import Navbar from './components/Navbar.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

// Advanced Components
import AIAssistant from './components/AIAssistant'
import { ThemeProvider, ThemeControlPanel } from './components/ThemeSystem'
import VisitorInteractionTracker from './components/VisitorInteractionTracker'
import GameificationSystem from './components/GameificationSystem'

const App = () => {
  return (
    <ThemeProvider>
      <main className='bg-slate-300/20 h-full relative'>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/features' element={<Features />} />
            <Route path='*' element={<Home />} />
          </Routes>

          {/* Advanced Features */}
          <AIAssistant />
          <ThemeControlPanel />
          <VisitorInteractionTracker />
          <GameificationSystem />
        </BrowserRouter>
      </main>
    </ThemeProvider>
  )
}

export default App
