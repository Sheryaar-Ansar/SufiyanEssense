
import React, { useEffect, useState } from "react";
import { ChevronDown, Grid, List, X, SlidersHorizontal } from "lucide-react";
import * as service from '../services/service';
import { useNavigate, useSearchParams } from "react-router-dom";
import notFound from '../assets/404.png'
import hero from '../assets/shop/hero.png'

const Shop = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(1);

    const [openSections, setOpenSections] = useState([]);
    const [view, setView] = useState("grid");
    const [showSidebar, setShowSidebar] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [reviews, setReviews] = useState([])
    const [searchParams] = useSearchParams()
    const search = searchParams.get('search') || ""



    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate()

    const toggleSection = (section) => {
        setOpenSections((prev) =>
            prev.includes(section)
                ? prev.filter((s) => s !== section)
                : [...prev, section]
        );
    };

    const loadProducts = async () => {
        try {
            const params = {
                page,
                limit,
            };

            // If user selected filters, add them to query:
            if (selectedFilters.length > 0) {
                params.subcategory = selectedFilters.join(",");
            }

            if (search) params.search = search;

            const res = await service.getAllProducts(params);

            const productsData = res.data.products;
            setProducts(productsData);
            setTotalPages(res.data.totalPages);

            // Load reviews after products
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

        } catch (error) {
            console.error("❌ Failed to load products:", error.response?.data || error.message);
            setProducts([]);  // Prevent crash
        }
    };

    const loadCategories = async () => {
        try {
            const res = await service.getAllCategory();
            setCategories(res.data.categories);

            // auto-open all sections once categories arrive
            setOpenSections(res.data.categories.map((c) => c.title));
        } catch (error) {
            console.error("Failed to load categories");
        }
    };

    const capitalizeWords = (sentence) => {
        return sentence
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
    const filteredProducts = products; // backend filtering only

    // Whenever search or filters change → reset page & reload
    useEffect(() => {
        setPage(1);
        loadProducts();
    }, [search, selectedFilters]);

    // Whenever page changes → reload
    useEffect(() => {
        loadProducts();
    }, [page]);

    useEffect(() => {
        loadCategories();
    }, []);

    console.log("selectedFilter", selectedFilters)
    return (
        <div>
            {/* // Updated: Base background is a very light gray for modern depth. */}
            <div className="w-full h-screen-75 lg:h-screen overflow-hidden">
                <img
                    src={hero}
                    alt="Hero Background"
                    className="w-full h-full object-cover object-top"
                />
            </div>
            <div className="flex flex-col md:flex-row bg-white min-h-screen relative">
                {/* Overlay (mobile) */}
                <div
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 
                ${showSidebar ? "opacity-100 visible" : "opacity-0 invisible"} md:hidden`}
                    onClick={() => setShowSidebar(false)}
                ></div>

                {/* Sidebar */}
                <aside
                    // Updated: Lighter shadow, more defined width, better z-index for mobile overlap.
                    className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 md:w-[280px] lg:w-[20%] 
                bg-white border-r border-sky-100 z-50 md:z-auto transform transition-transform duration-300 p-6 shadow-xl md:shadow-none overflow-y-auto
                ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
                >
                    {/* Mobile Header */}
                    <div className="flex justify-between items-center mb-8 md:hidden">
                        <h2 className="text-xl font-extrabold text-blue-800">Filters</h2>
                        <button
                            onClick={() => setShowSidebar(false)}
                            className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition"
                        >
                            <X size={20} className="text-blue-800" />
                        </button>
                    </div>

                    {/* ---- Dynamic Category List ---- */}
                    {categories.length > 0 ? (
                        categories.map((c) => (
                            <div key={c._id} className="mb-4 p-3 rounded-lg border border-transparent hover:border-blue-100 transition duration-200">
                                <button
                                    onClick={() => toggleSection(c.title)}
                                    // Updated: Clear blue theme for headings. Hover effect.
                                    className="flex justify-between w-full text-base font-bold text-blue-700 hover:text-blue-900 transition duration-150 uppercase tracking-wider"
                                >
                                    {c.title}
                                    <ChevronDown
                                        className={`transition-transform duration-300 ${openSections.includes(c.title) ? "rotate-180" : ""}`}
                                        size={16}
                                    />
                                </button>

                                {/* Items */}
                                {openSections.includes(c.title) && (
                                    <ul className="pl-1 pt-3 space-y-3">
                                        {c.name?.map((item, idx) => (
                                            <li key={idx} className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    id={item}
                                                    checked={selectedFilters.includes(item)}
                                                    onChange={() => {
                                                        setSelectedFilters((prev) => {
                                                            const updated = prev.includes(item)
                                                                ? prev.filter((f) => f !== item)
                                                                : [...prev, item];

                                                            setPage(1); // reset page when filtering
                                                            return updated;
                                                        });
                                                    }}

                                                    className="w-4 h-4 cursor-pointer accent-blue-600"
                                                />

                                                <label htmlFor={item} className="text-gray-700 text-sm hover:text-blue-700 transition font-medium cursor-pointer">
                                                    {capitalizeWords(item)}
                                                </label>
                                            </li>

                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 p-3">Loading categories...</p>
                    )}
                </aside>

                {/* Main Product Section */}
                {/* Removed redundant ml classes since the sidebar is now fixed/static and has a defined width. Added max-w-7xl for content containment. */}
                <main className="flex-1 p-5 md:p-10 max-w-full md:max-w-7xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-blue-900 mb-8">Shop All Products</h1>
                    {/* Top Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 p-4 bg-white rounded-xl shadow-lg border border-blue-50/50">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowSidebar(true)}
                                // Updated: Blue theme button for mobile filters. Subtle 3D-like shadow on hover.
                                className="md:hidden flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-blue-300/50 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-400/60 transition duration-300"
                            >
                                <SlidersHorizontal size={16} />
                                Filters
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Updated: Styled select box to match theme */}
                            <select className="border border-blue-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm appearance-none bg-white">
                                <option>Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest</option>
                            </select>

                            <div className="flex items-center space-x-2 p-1 bg-gray-100 rounded-xl shadow-inner border border-gray-200">
                                {/* Updated: View toggle buttons for a modern, tactile look */}
                                <button
                                    onClick={() => setView("grid")}
                                    className={`p-2 rounded-lg transition duration-200 ${view === "grid" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}
                                >
                                    <Grid size={18} />
                                </button>
                                <button
                                    onClick={() => setView("list")}
                                    className={`p-2 rounded-lg transition duration-200 ${view === "list" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}
                                >
                                    <List size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {selectedFilters.length > 0 && (
                        <div className="mb-6 flex items-center gap-3 flex-wrap">
                            {selectedFilters.map((f) => (
                                <span
                                    key={f}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                                >
                                    {capitalizeWords(f)}
                                </span>
                            ))}

                            <button
                                onClick={() => setSelectedFilters([])}
                                className="ml-2 text-red-500 text-sm underline hover:text-red-700"
                            >
                                Clear All
                            </button>
                        </div>
                    )}

                    {/* Product Grid */}
                    <div
                        className={`grid gap-8 ${view === "grid"
                            // Updated: Slightly tighter grid on larger screens for a modern feel
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            : "grid-cols-1"
                            }`}
                    >
                        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                // Updated: Card design for a 3D/modern look. Subtle base shadow, lifted shadow on hover. Tailwind 'group' class for complex hover.
                                className="group bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-200/50 cursor-pointer"
                                onClick={() => navigate(`/perfumes/${product._id}`)}
                            >
                                <div className="w-full aspect-square md:aspect-[3/4] overflow-hidden bg-gray-50/50">
                                    {/* Image hover effect is handled via JS, but added transition for smoother visual */}
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onMouseEnter={(e) =>
                                        (e.currentTarget.src =
                                            product.hover)
                                        }
                                        onMouseLeave={(e) =>
                                        (e.currentTarget.src =
                                            product.images[0])
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
                        <div className="flex justify-center items-center gap-4 my-10">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
                            >
                                Prev
                            </button>

                            <span className="text-lg font-semibold text-blue-800">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Shop;
