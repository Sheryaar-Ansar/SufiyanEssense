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
import Checkout from './pages/Checkout'
import ThankYou from './pages/ThankYou'
import WhatsAppButton from './components/WhatsappButton'
import Deals from './pages/Deals'
import FAQs from './pages/FAQs'
import RefundExchangePolicy from './pages/RefundExchangePolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
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
              <Route path='/checkout' element={ <Checkout /> } />
              <Route path='/thank-you' element={<ThankYou/>} />
              <Route path='/deals' element={<Deals/>} />
              <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
              <Route path='/refund-exchange' element={<RefundExchangePolicy/>} />
              <Route path='/faqs' element={<FAQs/>} />
              <Route path='/shipping-policy' element={<ShippingPolicy/>} />

            </Routes>
          </main>
          <WhatsAppButton/>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
