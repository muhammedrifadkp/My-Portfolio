import React from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import AI from './pages/AI'
import Survey from './pages/Survey'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// Advanced Components
import AIAssistant from './components/AIAssistant'
import { ThemeProvider } from './components/ThemeSystem'

// Security: Initialize security measures
import './utils/security'

const App = () => {
  return (
    <ErrorBoundary>
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
              <Route path='/ai' element={<AI />} />
              <Route path='/survey' element={<Survey />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='*' element={<NotFound />} />
            </Routes>

            {/* Advanced Features */}
            <AIAssistant />
          </BrowserRouter>
        </main>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
