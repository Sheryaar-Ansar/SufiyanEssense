import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<div className="text-3xl font-bold underline">Hello, Tailwind CSS!</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
