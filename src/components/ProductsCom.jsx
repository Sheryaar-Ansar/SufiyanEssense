import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as service from '../services/service'

const ProductsCom = ({ subcategory, title }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([])
    const [view, setView] = useState('grid')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await service.getCategoryProducts({ subcategory })
                const productsData = res.data.products || res.data
                setProducts(productsData); // adjust according to your API response
                const reviewPromises = productsData.map(product =>
                    service.getReviewByProduct(product._id)
                        .then(res => [product._id, res.data.reviews || []])
                        .catch(() => [product._id, []])
                );

                const reviewsData = await Promise.allSettled(reviewPromises);

                const reviewsMap = {};
                reviewsData.forEach(item => {
                    if (item.status === "fulfilled") {
                        const [id, rev] = item.value;
                        reviewsMap[id] = rev;
                    }
                });

                setReviews(reviewsMap);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [subcategory]);
    console.log(products);
    

    if (loading) return <p>Loading {title}...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (products.length === 0) return <p>No products found.</p>;

    return (
        <div className="my-8 mx-auto">
            {title && <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>}
            <hr className="mt-4 text-gray-100" />
            <div
                className={`grid gap-8 ${view === "grid"
                    // Updated: Slightly tighter grid on larger screens for a modern feel
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1 place-items-center"
                    }`}
            >
                {products.length > 0 ? products.map((product) => (
                    <div
                        key={product._id}
                        // Updated: Card design for a 3D/modern look. Subtle base shadow, lifted shadow on hover. Tailwind 'group' class for complex hover.
                        className="group bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-200/50 cursor-pointer"
                        onClick={() => navigate(`/perfumes/${product._id}`)}
                    >
                        <div className="w-full aspect-square md:aspect-[3/4] overflow-hidden bg-gray-50/50">
                            {/* Image hover effect is handled via JS, but added transition for smoother visual */}
                            <img
                                src={product.images?.[0]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onMouseEnter={(e) =>
                                (e.currentTarget.src =
                                    product.hover)
                                }
                                onMouseLeave={(e) =>
                                (e.currentTarget.src =
                                    product.images?.[0])
                                }
                            />
                        </div>

                        <div className="p-5 space-y-2">
                            <h3 className="font-extrabold text-blue-900 text-lg group-hover:text-blue-600 transition truncate">
                                {product.title}
                            </h3>
                            <p className="text-sm text-gray-600 truncate">{product.bio}</p>
                            <p className="text-xs text-blue-500 font-medium">{product.format}</p>

                            <div className="flex items-center justify-between gap-1 pt-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-amber-500 text-base">
                                        {"★".repeat(reviews[product._id]?.length ? Math.round(reviews[product._id].reduce((a, b) => a + b.rating, 0) / reviews[product._id].length) : 0)}
                                    </span>
                                    <span className="text-gray-500 text-xs font-light">
                                        ({reviews[product._id]?.length || 0})
                                    </span>
                                </div>
                                <div>
                                    {/* Updated: Stock badge with subtle background */}
                                    <h1 className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">{product.stock} left</h1>
                                </div>
                            </div>

                            <div className="flex items-end gap-3 pt-1">
                                {/* Updated: Discount price is the focus blue, original price is muted gray. */}
                                <span className="text-gray-400 line-through text-sm">
                                    Rs. {product.price.toLocaleString()}
                                </span>
                                <span className="text-2xl text-blue-800 font-black">
                                    Rs. {product.discountedPrice.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="flex min-h-xl items-center justify-center w-full">
                        <img src={notFound} alt="" className="w-[700px]" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsCom;
