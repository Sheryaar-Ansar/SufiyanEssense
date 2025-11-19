
import React, { useEffect, useState } from 'react'
import hero from '../assets/home/hero.jpeg'
import * as service from '../services/service'
import { ArrowRight, Star } from 'lucide-react' // Added Star for reviews
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

const Home = () => {
  const [products, setProducts] = useState([])
  const [reviews, setReviews] = useState([])
  const [allReviews, setAllReviews] = useState(0)
  const loadProducts = async () => {
    try {
      const res = await service.getAllProducts()
      setProducts(res.data.products)
    } catch (error) {
      console.error('Failed to load Products')
    }
  }
  const loadReviews = async () => {
    try {
      const res = await service.getAllReviews()
      console.log(res)
      setAllReviews(res.data.allReviews)
      setReviews(res.data.pendingReviews)
    } catch (error) {
      console.error('Failed to load Reviews')
    }
  }

  // --- LOGIC UPDATES ---
  // Slice to show only the first 3 products as requested
  const deals = products.filter((e) => e.subcategory === 'summer').slice(0, 3)
  const bestSeller = products.filter((e) => e.subcategory === 'winter').slice(0, 3)
  // ---------------------

  // Function to render stars (using Tailwind colors)
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i < fullStars ? "currentColor" : "none"} // Fill based on rating
          className={i < fullStars ? "text-amber-400" : "text-gray-300"}
        />
      );
    }
    return <div className="flex items-center space-x-0.5">{stars}</div>;
  };


  useEffect(() => {
    loadProducts(), loadReviews()
  }, [])

  // Placeholder navigate function (assuming it's available from react-router-dom)
  const navigate = (path) => console.log(`Navigating to: ${path}`);


  return (
    // Global Container: Light background for modern depth
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto space-y-20 pb-20">

        {/* 1. Hero Section */}
        <div className="relative w-full overflow-hidden shadow-xl rounded-b-3xl">
          <img
            src={hero}
            alt="Hero background"
            className="w-full h-full object-cover max-h-[600px] brightness-75"
          />
          {/* Add a modern overlay for contrast and branding */}
          <div className="absolute inset-0 bg-blue-900/40 flex flex-col justify-center items-center text-center p-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
              Discover Your New Signature Scent
            </h1>
            <p className="text-lg text-blue-100/90 max-w-xl mb-8">
              Experience the best in quality and long-lasting fragrances.
            </p>
            <button
              className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full text-lg shadow-2xl shadow-blue-500/50 
                                       hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.03] cursor-pointer"
             onClick={()=>navigate('/perfumes')}>
              Shop Now
            </button>
          </div>
        </div>

        {/* 2. Crazy Deals Section */}
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
              🔥 Crazy Deals
            </h1>
            <button
              onClick={() => navigate('/perfumes/deals')}
              className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition group"
            >
              View All
              <ArrowRight size={18} className="transition transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Product Grid (Responsive 1-2-3 Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((product) => (
              <div
                key={product._id}
                // Card Design: White background, rounded corners, subtle shadow, 3D lift on hover
                className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-50 transition duration-500 transform hover:-translate-y-2 hover:shadow-3xl hover:shadow-blue-200/50 cursor-pointer"
                onClick={() => navigate(`/perfumes/${product._id}`)}
              >
                <div className="w-full aspect-[3/4] overflow-hidden bg-gray-50/50">
                  <img
                    src={`${import.meta.env.VITE_IMAGE_API}${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onMouseEnter={(e) =>
                      (e.currentTarget.src = `${import.meta.env.VITE_IMAGE_API}${product.hover}`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.src = `${import.meta.env.VITE_IMAGE_API}${product.images[0]}`)
                    }
                  />
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-extrabold text-blue-900 text-xl group-hover:text-blue-600 transition truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{product.bio}</p>
                  <p className="text-xs text-blue-500 font-medium uppercase tracking-wider">{product.format}</p>

                  <div className="flex items-center justify-between gap-1 pt-2">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating || 5)} {/* Assuming product.rating exists, defaults to 5 */}
                      <span className="text-gray-500 text-xs font-light">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full shadow-inner">
                      {product.stock} left
                    </div>
                  </div>

                  <div className="flex items-end gap-3 pt-2">
                    <span className="text-gray-400 line-through text-sm">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <span className="text-3xl text-blue-800 font-black">
                      Rs. {product.discountedPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-gray-200/70" />

        {/* 3. Best Seller Section (Identical Modern Layout) */}
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight">
              ✨ Best Sellers
            </h1>
            <button
              onClick={() => navigate('/perfumes/bestsellers')}
              className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition group"
            >
              View All
              <ArrowRight size={18} className="transition transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Product Grid (Responsive 1-2-3 Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSeller.map((product) => (
              <div
                key={product._id}
                // Card Design: White background, rounded corners, subtle shadow, 3D lift on hover
                className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-blue-50 transition duration-500 transform hover:-translate-y-2 hover:shadow-3xl hover:shadow-blue-200/50 cursor-pointer"
                onClick={() => navigate(`/perfumes/${product._id}`)}
              >
                <div className="w-full aspect-[3/4] overflow-hidden bg-gray-50/50">
                  <img
                    src={`${import.meta.env.VITE_IMAGE_API}${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onMouseEnter={(e) =>
                      (e.currentTarget.src = `${import.meta.env.VITE_IMAGE_API}${product.hover}`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.src = `${import.meta.env.VITE_IMAGE_API}${product.images[0]}`)
                    }
                  />
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-extrabold text-blue-900 text-xl group-hover:text-blue-600 transition truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{product.bio}</p>
                  <p className="text-xs text-blue-500 font-medium uppercase tracking-wider">{product.format}</p>

                  <div className="flex items-center justify-between gap-1 pt-2">
                    <div className="flex items-center gap-1">
                      {renderStars(product.rating || 5)}
                      <span className="text-gray-500 text-xs font-light">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow-inner">
                      Top Seller
                    </div>
                  </div>

                  <div className="flex items-end gap-3 pt-2">
                    <span className="text-gray-400 line-through text-sm">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <span className="text-3xl text-blue-800 font-black">
                      Rs. {product.discountedPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CTA Banner Section (Gradient) */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div
            // Blue-to-white gradient, rounded, decent height, 3D shadow effect
            className="w-full h-56 flex justify-center items-center rounded-3xl p-10 shadow-2xl shadow-blue-500/30
                                   bg-gradient-to-br from-blue-700 to-blue-400 transition duration-500 hover:from-blue-800 hover:to-blue-500"
          >
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white mb-4 drop-shadow-md">
                Ready to find your perfect scent?
              </h2>
              <button
                onClick={() => navigate('/shop')}
                className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full text-lg shadow-xl shadow-black/20 
                                           hover:bg-gray-100 transition duration-300 transform hover:scale-105"
              >
                Explore The Shop
              </button>
            </div>
          </div>
        </div>

        {/* 5. Customer Reviews Section (Carousel/Slider Structure) */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight mb-2">
              What Customers Say About Us?
            </h1>
            <h1 className="text-lg text-gray-500 font-medium">
              Based on {allReviews} authentic reviews.
            </h1>
          </div>

          {/* Reviews Container - Designed for a single-item carousel view */}
          <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} autoplay={true}>
                {reviews?.map((r, index) => (
                  // Review Card: White background, strong shadow for 3D/lift effect
                  <div
                    key={index}
                    className="flex-shrink-0 w-full p-8 md:p-12 bg-white rounded-3xl shadow-2xl shadow-blue-100/70 border border-blue-100/50"
                  >
                    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                      <div className="mb-4">
                        {renderStars(r.rating || 5)} {/* Render star rating */}
                      </div>
                      <p className="text-xl md:text-2xl font-serif italic text-gray-800 mb-6">
                        "{r.comment}"
                      </p>
                      <img
                        src={`${import.meta.env.VITE_IMAGE_API}${r.images?.[0]}`}
                        alt={r.username}
                        className="w-16 h-16 rounded-full object-cover border-4 border-blue-500/50 mb-3 shadow-md"
                      />
                      <p className="text-lg font-bold text-blue-800">{r.username}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Thanks for choosing us!
                      </p>
                    </div>
                  </div>
                ))}
              
          </Slider>
          </div>
      </div>
    </div >
  )
}

export default Home