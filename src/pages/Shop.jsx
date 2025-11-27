import React, { useEffect, useState } from "react";
import { ChevronDown, Grid, List, X, SlidersHorizontal } from "lucide-react";
import * as service from "../services/service";
import { useNavigate, useSearchParams } from "react-router-dom";
import notFound from "../assets/404.png";
import hero from "../assets/shop/hero.png";

const Shop = () => {
    const [openSections, setOpenSections] = useState([]);
    const [view, setView] = useState("grid");
    const [showSidebar, setShowSidebar] = useState(false);

    const [selectedFilters, setSelectedFilters] = useState([]);

    const [fullProducts, setFullProducts] = useState([]); // ALL PRODUCTS (unpaginated)
    const [pageProducts, setPageProducts] = useState([]); // BACKEND PAGINATED PRODUCTS

    const [categories, setCategories] = useState([]);
    const [reviews, setReviews] = useState({});

    const [page, setPage] = useState(1);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(1);

    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";

    const navigate = useNavigate();

    const toggleSection = (section) => {
        setOpenSections((prev) =>
            prev.includes(section)
                ? prev.filter((s) => s !== section)
                : [...prev, section]
        );
    };

    const capitalizeWords = (sentence) =>
        sentence
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    // ---------------------------------------------------------
    // 1️⃣ LOAD ALL PRODUCTS ONCE (UNPAGINATED)
    // ---------------------------------------------------------
    const loadFullProducts = async () => {
        try {
            const res = await service.getAllProducts(search);
            const allProducts = res.data.products || [];
            setFullProducts(allProducts);

            // Collect all reviews
            const reviewPromises = allProducts.map((p) =>
                service
                    .getReviewByProduct(p._id)
                    .then((res) => [p._id, res.data.reviews || []])
                    .catch(() => [p._id, []])
            );

            const reviewsData = await Promise.allSettled(reviewPromises);
            const reviewsMap = {};

            reviewsData.forEach((item) => {
                if (item.status === "fulfilled") {
                    const [id, rev] = item.value;
                    reviewsMap[id] = rev;
                }
            });

            setReviews(reviewsMap);
        } catch (err) {
            console.log("Error loading all products", err);
        }
    };

    // ---------------------------------------------------------
    // 2️⃣ LOAD PAGINATED PRODUCTS FROM BACKEND
    // ---------------------------------------------------------
    const loadPaginatedProducts = async () => {
        try {
            const res = await service.getAllProducts(
                `?search=${search}&page=${page}&limit=${limit}`
            );

            setPageProducts(res.data.products);
            setTotalPages(res.data.totalPages || 1);
        } catch (error) {
            console.log("Error loading paginated products", error);
        }
    };

    // ---------------------------------------------------------
    // 3️⃣ LOAD CATEGORIES
    // ---------------------------------------------------------
    const loadCategories = async () => {
        try {
            const res = await service.getAllCategory();
            setCategories(res.data.categories);
            setOpenSections(res.data.categories.map((c) => c.title));
        } catch (err) {
            console.log("Error loading categories");
        }
    };

    // load all data at beginning
    useEffect(() => {
        loadFullProducts();
        loadCategories();
    }, []);

    // reload pagination when page or search changes
    useEffect(() => {
        loadPaginatedProducts();
    }, [page, search]);

    // reset to page 1 on filter change
    useEffect(() => {
        setPage(1);
    }, [selectedFilters]);

    // ---------------------------------------------------------
    // 4️⃣ FILTER LOGIC (APPLY ON FULL PRODUCTS)
    // ---------------------------------------------------------
    const filteredProducts =
        selectedFilters.length === 0
            ? fullProducts
            : fullProducts.filter((p) =>
                  selectedFilters.includes(p.subcategory?.toLowerCase())
              );

    const usingFilters = selectedFilters.length > 0;

    // ---------------------------------------------------------
    // 5️⃣ LOCAL PAGINATION WHEN FILTERS ARE ACTIVE
    // ---------------------------------------------------------
    const localTotalPages = Math.ceil(filteredProducts.length / limit);

    const displayProducts = usingFilters
        ? filteredProducts.slice((page - 1) * limit, page * limit)
        : pageProducts;

    const finalTotalPages = usingFilters ? localTotalPages : totalPages;

    // ---------------------------------------------------------
    // RENDER
    // ---------------------------------------------------------
    return (
        <div>
            {/* HERO */}
            <div className="w-full h-screen-75 lg:h-screen overflow-hidden">
                <img src={hero} alt="Hero" className="w-full h-full object-cover object-top" />
            </div>

            <div className="flex flex-col md:flex-row bg-white min-h-screen relative">
                {/* overlay */}
                <div
                    className={`fixed inset-0 bg-black/50 z-40 ${
                        showSidebar ? "opacity-100 visible" : "opacity-0 invisible"
                    } md:hidden`}
                    onClick={() => setShowSidebar(false)}
                ></div>

                {/* SIDEBAR */}
                <aside
                    className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white p-6 shadow-xl md:shadow-none border-r z-50 transition-transform ${
                        showSidebar ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
                >
                    <div className="flex justify-between items-center mb-8 md:hidden">
                        <h2 className="text-xl font-extrabold text-blue-800">Filters</h2>
                        <button
                            onClick={() => setShowSidebar(false)}
                            className="p-2 rounded-full bg-blue-50"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {categories.map((c) => (
                        <div key={c._id} className="mb-4 p-3 hover:border-blue-100 border rounded-lg">
                            <button
                                onClick={() => toggleSection(c.title)}
                                className="flex justify-between w-full text-blue-700 font-bold uppercase"
                            >
                                {c.title}
                                <ChevronDown
                                    size={16}
                                    className={`${openSections.includes(c.title) ? "rotate-180" : ""}`}
                                />
                            </button>

                            {openSections.includes(c.title) && (
                                <ul className="pt-3 space-y-3">
                                    {c.name?.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.includes(item)}
                                                onChange={() =>
                                                    setSelectedFilters((prev) =>
                                                        prev.includes(item)
                                                            ? prev.filter((f) => f !== item)
                                                            : [...prev, item]
                                                    )
                                                }
                                                className="w-4 h-4 accent-blue-600"
                                            />
                                            <label className="text-gray-700">
                                                {capitalizeWords(item)}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </aside>

                {/* MAIN */}
                <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-blue-900 mb-8">
                        Shop All Products
                    </h1>

                    {/* FILTER TAGS */}
                    {selectedFilters.length > 0 && (
                        <div className="mb-6 flex gap-3 flex-wrap">
                            {selectedFilters.map((f) => (
                                <span
                                    key={f}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                >
                                    {capitalizeWords(f)}
                                </span>
                            ))}

                            <button
                                onClick={() => setSelectedFilters([])}
                                className="text-red-500 text-sm underline"
                            >
                                Clear All
                            </button>
                        </div>
                    )}

                    {/* GRID */}
                    <div
                        className={`grid gap-8 ${
                            view === "grid"
                                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                : "grid-cols-1"
                        }`}
                    >
                        {displayProducts.length > 0 ? (
                            displayProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white rounded-xl shadow-lg p-3 cursor-pointer"
                                    onClick={() => navigate(`/perfumes/${product._id}`)}
                                >
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />

                                    <h3 className="font-bold mt-3">{product.title}</h3>
                                    <p className="text-sm text-gray-600">{product.bio}</p>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center col-span-full">
                                <img src={notFound} className="w-[400px]" />
                            </div>
                        )}
                    </div>

                    {/* PAGINATION */}
                    {finalTotalPages > 1 && (
                        <div className="flex justify-center mt-10 gap-2">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Previous
                            </button>

                            {[...Array(finalTotalPages).keys()].map((num) => (
                                <button
                                    key={num + 1}
                                    onClick={() => setPage(num + 1)}
                                    className={`px-4 py-2 border rounded-lg ${
                                        page === num + 1 ? "bg-blue-600 text-white" : ""
                                    }`}
                                >
                                    {num + 1}
                                </button>
                            ))}

                            <button
                                disabled={page === finalTotalPages}
                                onClick={() => setPage((p) => p + 1)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Shop;
