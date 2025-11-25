
import React, { useEffect, useState } from "react";
import { Star, ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import * as service from "../services/service";
import icon1 from '../assets/productDetail/Icon_Enhanced_Macerated.webp'
import icon2 from '../assets/productDetail/Icon_High_EDP_Concentrations.webp'
import icon3 from '../assets/productDetail/Icon_Safe_Ingredients_IFRA_Compliance.webp'
import profilePicture from '../assets/productDetail/blank-profile-picture.webp'
import { useCart } from "../contexts/CartContext";


const ShopDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, setIsCartOpen, loadCart } = useCart()

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [showShipping, setShowShipping] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5; // show 5 reviews per page




    const [newReview, setNewReview] = useState({
        username: "",
        email: "",
        comment: "",
        rating: 0,
        images: null, // NEW
    });

    // Load product + reviews
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await service.getProductById(id);
                const prod = res.data.product;
                setProduct(prod);
                setMainImage(`${import.meta.env.VITE_IMAGE_API}${prod.images[0]}`);

                const reviewRes = await service.getReviewByProduct(prod._id);
                setReviews(reviewRes.data.reviews || []);
            } catch (err) {
                console.error("Failed to load product or reviews", err);
            }
        };

        fetchData();
    }, [id]);

    // Submit new review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(); // must send multipart/form-data
            formData.append("username", newReview.username);
            formData.append("email", newReview.email);
            formData.append("comment", newReview.comment);
            formData.append("rating", newReview.rating);

            // Append each selected image file
            if (newReview.images?.length > 0) {
                newReview.images.forEach((img) => {
                    formData.append("images", img); // must match backend field name
                });
            }

            // Call backend API that uploads to Cloudinary
            const res = await service.createReview(id, formData);

            // Get the newly created review from response
            const createdReview = res.data.review;

            // Update frontend state instantly
            setReviews((prev) => [createdReview, ...prev]);

            // Reset review form
            setNewReview({
                username: "",
                email: "",
                comment: "",
                rating: 0,
                images: null,
            });

            setReviewModalOpen(false);
            alert("Review submitted successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to submit review");
        }
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const averageRating = reviews.length
        ? Math.round(
            (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 2
        ) / 2
        : 0;
    //   console.log('Reviews', product)
    const handleAddToCart = async (id, quantity, product) => {
        await addToCart(id, quantity, product);
        setIsCartOpen(true); // <-- open drawer after cart updates
        loadCart()
        // console.log(addToCart)

    }

    if (!product) return <p className="text-center text-xl py-20 text-blue-600">Loading...</p>;

    return (
        <div className="bg-white min-h-screen py-10">
            {/* Back button */}
            <div
                onClick={() => navigate(-1)}
                // MODIFIED: Stronger shadow, blue text, rounded-full pill shape
                className="flex items-center gap-2 cursor-pointer w-max px-5 py-2 mx-auto sm:ml-10 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-blue-600 font-medium transform hover:-translate-y-0.5"
            >
                <ArrowLeft className="w-5 h-5" />
                <h1>Back to Shop</h1>
            </div>

            {/* Main Product Grid */}
            {/* MODIFIED: Larger max-width, increased gap */}
            <div className="max-w-7xl mx-auto mt-12 grid lg:grid-cols-2 gap-16 p-6">
                {/* LEFT – Images */}
                <div>
                    {/* MODIFIED: Very large rounded corners, deep shadow for 3D effect */}
                    <div className="rounded-3xl shadow-2xl bg-white overflow-hidden transform hover:scale-[1.01] transition-transform duration-500 ease-out">
                        <img
                            src={mainImage}
                            alt={product.title}
                            // MODIFIED: Larger image area on MD/LG screens
                            className="w-full h-96 lg:h-[550px] object-cover"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-4 mt-6 justify-center lg:justify-start">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="thumbnail"
                                // MODIFIED: Ring for hover/active state, rounded-xl, subtle 3D hover
                                className={`w-24 h-24 rounded-xl object-cover cursor-pointer transition-all duration-300 transform hover:scale-105 ${mainImage.includes(img)
                                    ? "ring-4 ring-blue-600 shadow-lg"
                                    : "ring-1 ring-gray-300 hover:ring-blue-300"
                                    }`}
                                onClick={() =>
                                    setMainImage(img)
                                }
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT – Info */}
                {/* MODIFIED: Added a distinct white background with large shadow */}
                <div className="space-y-6 bg-white p-8 rounded-3xl shadow-xl">
                    <h2 className="text-4xl font-extrabold text-gray-800">{product.title}</h2>
                    <p className="text-gray-500 text-lg leading-relaxed">{product.bio}</p>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-3 border-b pb-4 border-blue-100">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                // MODIFIED: Yellow stars
                                className={`w-6 h-6 ${i < averageRating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-gray-300"
                                    }`}
                            />
                        ))}
                        <span className="text-blue-600 font-semibold">({reviews.length} Reviews)</span>
                    </div>

                    {/* Prices */}
                    <div className="flex items-end gap-x-4">
                        {/* MODIFIED: Smaller size, gray-400 for 'faded' effect */}
                        <p className="text-2xl text-gray-400 font-medium line-through">
                            Rs.{" "}
                            {product.price?.toLocaleString() ||
                                ' '}
                        </p>
                        {/* MODIFIED: Larger size, prominent text-blue-600 */}
                        <p className="text-4xl text-blue-600 font-extrabold">
                            Rs. {product.discountedPrice?.toLocaleString() || ""}
                        </p>
                    </div>

                    {/* FORMAT & STOCK Buttons */}
                    <div className="pt-2 flex justify-between gap-2">
                        {/* Format Button */}
                        <button className="text-base uppercase font-bold border-2 border-blue-600 text-blue-600 w-32 h-10 rounded-lg transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg hover:bg-blue-50/50">
                            {product.format}
                        </button>

                        {/* Stock Button */}
                        <button className="text-base font-bold border-2 border-gray-300 text-gray-700 w-32 h-10 rounded-lg transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg hover:bg-gray-100">
                            Stock: {product.stock}
                        </button>
                    </div>


                    {/* Quantity */}
                    <div className="flex items-center gap-6 pt-4">
                        <p className="font-semibold text-lg text-gray-700">Quantity:</p>
                        {/* MODIFIED: Pill shape, blue ring focus, subtle shadow */}
                        <div className="flex items-center bg-blue-50/50 px-1 rounded-full shadow-inner ring-1 ring-blue-200">
                            {/* MODIFIED: Blue text, active press effect, rounded-full on ends */}
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-2 text-blue-600 font-bold text-xl rounded-full transition-colors active:bg-blue-200"
                            >
                                -
                            </button>
                            {/* MODIFIED: Bold, tracking-widest */}
                            <span className="px-4 text-xl font-bold text-gray-800 tracking-wider">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-blue-600 font-bold text-xl rounded-full transition-colors active:bg-blue-200">
                                +
                            </button>
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-500 pt-1">Tax included. Shipping calculated at checkout.</p>

                    {/* Add to Cart Button */}
                    {/* MODIFIED: Blue primary color, strong shadow, 3D transform hover */}
                    <button onClick={() => handleAddToCart(product._id, quantity, product)} className="w-full bg-blue-600 text-white py-4 rounded-full text-xl font-bold shadow-2xl shadow-blue-500/50 hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99]">
                        Add to cart
                    </button>

                    {/* Icons Section */}
                    <div className="flex justify-center items-center mt-6 pt-4 border-t border-blue-100">
                        {/* MODIFIED: Added a subtle border to the image containers */}
                        <div className="flex gap-x-6">
                            <img src={icon1} alt="Enhanced Macerated" className="object-contain w-24 h-24 p-2 rounded-xl bg-blue-50/50 border border-blue-100" />
                            <img src={icon2} alt="High EDP Concentrations" className="object-contain w-24 h-24 p-2 rounded-xl bg-blue-50/50 border border-blue-100" />
                            <img src={icon3} alt="Safe Ingredients" className="object-contain w-24 h-24 p-2 rounded-xl bg-blue-50/50 border border-blue-100" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Accordions (Description & Shipping) */}
            {/* MODIFIED: Larger max-width, increased spacing, distinct background color */}
            <div className="max-w-7xl mx-auto mt-16 space-y-4 p-6">
                {/* Description */}
                {/* MODIFIED: Blue border, strong shadow, pointer cursor */}
                <div className="bg-white rounded-2xl shadow-xl border-t-4 border-blue-600 p-6 cursor-pointer" onClick={() => setShowDescription(!showDescription)}>
                    <div

                        className="flex justify-between items-center"
                    >
                        <h3 className="text-2xl font-bold text-blue-800">Product Description</h3>
                        <span className={`transform transition-transform duration-300 text-blue-600 text-2xl ${showDescription ? 'rotate-180' : 'rotate-0'}`}>
                            <ArrowDown />
                        </span>
                    </div>
                    {showDescription && (
                        <p className="mt-4 text-gray-700 leading-relaxed animate-in fade-in duration-500">{product.description}</p>
                    )}
                </div>

                {/* Shipping */}
                {/* MODIFIED: Blue border, strong shadow, pointer cursor */}
                <div className="bg-white rounded-2xl shadow-xl border-t-4 border-blue-600 p-6 cursor-pointer" onClick={() => setShowShipping(!showShipping)}>
                    <div

                        className="flex justify-between items-center"
                    >
                        <h3 className="text-2xl font-bold text-blue-800">Shipping & Delivery</h3>
                        <span className={`transform transition-transform duration-300 text-blue-600 text-2xl ${showShipping ? 'rotate-180' : 'rotate-0'}`}>
                            <ArrowDown />
                        </span>
                    </div>
                    {showShipping && (
                        <p className="mt-4 text-gray-700 leading-relaxed animate-in fade-in duration-500">
                            Deliveries in Karachi are done within **2-3 days**.
                            <br />
                            All other cities take **3-4 days** to deliver.
                            <br />
                            Kindly place your order at the earliest to get your product as soon as possible.
                            <br />
                            <br />
                            Call us at <span className="text-blue-600 font-semibold">0318-2966076</span>, or leave a voice note if you have any queries.
                        </p>
                    )}
                </div>
            </div>

            {/* Reviews */}
            {/* MODIFIED: Larger max-width, prominent shadow */}
            <div className="max-w-7xl mx-auto mt-20 bg-white p-8 rounded-2xl shadow-2xl">
                <h3 className="text-3xl font-extrabold text-blue-800 mb-8 border-b pb-4 border-blue-200">Customer Reviews</h3>
                <div className="flex justify-between items-center my-6">
                    <h3 className="text-xl font-medium text-gray-700">Total Reviews: <span className="font-bold text-blue-600">{reviews.length}</span></h3>
                    {/* MODIFIED: Primary button style (blue) with 3D press effect */}
                    <button
                        onClick={() => setReviewModalOpen(true)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300 transform active:scale-95"
                    >
                        Add Review
                    </button>
                </div>

                {/* Review List */}
                <div className="space-y-8 mb-10">
                    {reviews.length === 0 ? (
                        <p className="text-gray-500 italic py-5">Be the first to leave a review!</p>
                    ) : (
                        currentReviews.map((r, i) => (
                            <div
                                key={i}
                                //                 {/* MODIFIED: Light blue background, rounded-xl, subtle shadow for separation */}
                                className="p-6 bg-blue-50/50 rounded-xl shadow-md border border-blue-100"
                            >
                                <div className="flex gap-4 items-start">
                                    {/* Static User Image - MODIFIED: Ring of blue color */}
                                    <img
                                        src={profilePicture} // STATIC AVATAR
                                        className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-400"
                                    />

                                    <div className="w-full">
                                        <div className="flex items-center justify-between">
                                            <p className="font-extrabold text-lg text-gray-800">{r.username}</p>

                                            <div className="flex">
                                                {[...Array(5)].map((_, index) => ( // Show 5 stars total
                                                    <Star
                                                        key={index}
                                                        // MODIFIED: Yellow stars
                                                        className={`w-5 h-5 ${index < r.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mt-3">{r.comment}</p>

                                        {/* Display Review Image */}
                                        {r.images && r.images.length > 0 && (
                                            <div className="flex gap-4 mt-4">
                                                {r.images.map((img, index) => (
                                                    <img
                                                        key={index}
                                                        src={img}
                                                        //                             {/* MODIFIED: Rounded corners, border */}
                                                        alt="review"
                                                        className="w-24 h-24 object-cover rounded-xl border-2 border-white shadow-md"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-3 mt-8">
                    {/* MODIFIED: Pill-shaped buttons, blue primary color, subtle shadow */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-5 py-2 rounded-full bg-blue-100/50 text-blue-800 disabled:opacity-40 transition-all hover:bg-blue-200 shadow-sm"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            // MODIFIED: Active state is solid blue, inactive is light blue
                            className={`px-4 py-2 rounded-full font-semibold transition-colors ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-5 py-2 rounded-full bg-blue-100/50 text-blue-800 disabled:opacity-40 transition-all hover:bg-blue-200 shadow-sm"
                    >
                        Next
                    </button>
                </div>
            </div>
            {/* REVIEW MODAL */}
            {isReviewModalOpen && (
                //         {/* MODIFIED: Backdrop styling */}
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
                    {/* MODIFIED: Modal styling, larger rounded corners, prominent shadow */}
                    <div className="bg-white w-full max-w-lg p-8 rounded-3xl shadow-2xl relative transform scale-100 transition-transform duration-300">

                        {/* CLOSE BUTTON */}
                        {/* MODIFIED: Blue color for theme consistency */}
                        <button
                            onClick={() => setReviewModalOpen(false)}
                            className="absolute top-5 right-5 text-blue-600 hover:text-blue-800 text-2xl transition-colors"
                        >
                            &times;
                        </button>

                        <h3 className="text-2xl font-bold mb-6 text-blue-800">Share Your Experience</h3>

                        <form
                            onSubmit={(e) => {
                                handleReviewSubmit(e);
                                setReviewModalOpen(false);
                            }}
                            className="space-y-5"
                        >
                            {/* MODIFIED: Input styling for modern look with blue focus ring */}
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border-2 border-gray-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={newReview.username}
                                onChange={(e) =>
                                    setNewReview({ ...newReview, username: e.target.value })
                                }
                                required
                            />

                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full border-2 border-gray-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={newReview.email}
                                onChange={(e) =>
                                    setNewReview({ ...newReview, email: e.target.value })
                                }
                                required
                            />

                            <textarea
                                placeholder="Write your review..."
                                className="w-full border-2 border-gray-200 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[120px]"
                                value={newReview.comment}
                                onChange={(e) =>
                                    setNewReview({ ...newReview, comment: e.target.value })
                                }
                                required
                            />

                            <select
                                className="w-full border-2 border-gray-200 px-5 py-3 rounded-xl appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={newReview.rating}
                                onChange={(e) =>
                                    setNewReview({ ...newReview, rating: Number(e.target.value) })
                                }
                                required
                            >
                                <option value={0} disabled>Select a Rating (1-5 Stars)</option>
                                {[1, 2, 3, 4, 5].map((v) => (
                                    <option key={v} value={v}>{v} Star</option>
                                ))}
                            </select>

                            {/* File input styling can be tricky, using basic but themed */}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="w-full border-2 border-gray-200 p-3 rounded-xl text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                onChange={(e) =>
                                    setNewReview({
                                        ...newReview,
                                        images: Array.from(e.target.files),
                                    })
                                }
                            />

                            {/* Submit Button - MODIFIED: Primary button style with 3D press effect */}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-full text-lg font-bold shadow-xl shadow-blue-500/50 hover:bg-blue-700 transition-all duration-300 transform active:scale-95"
                            >
                                Submit Review
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ShopDetails;