import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Shop from './pages/Shop'
import ShopDetails from './pages/ShopDetails'
import Home from './pages/Home'
import ContactUs from './pages/Contactus'
import AboutUs from './pages/AboutUs'
import { useCart } from './contexts/CartContext'
function App() {
  const { loadCart, cart } = useCart()
  useEffect(() => {
    loadCart()
  }, [])

  return (
    <>
      <Router>
        <div className='flex flex-col min-h-screen'>


          <Navbar />
          <main className='grow mt-35'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/perfumes' element={<Shop />} />
              <Route path='/perfumes/:id' element={<ShopDetails />} />
              <Route path='/contact' element={<ContactUs />} />
              <Route path='/about' element={<AboutUs />} />

            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
