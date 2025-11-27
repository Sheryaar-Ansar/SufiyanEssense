import React, { useEffect, useState } from "react";
import axios from "axios";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        subcategory: "",
    });

    const [page, setPage] = useState(1);
    const limit = 10;

    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Fetch Products
    const fetchProducts = async () => {
        setLoading(true);

        try {
            const params = {
                page,
                limit,
            };

            // Add selected subcategory filter if exists
            if (selectedFilters.subcategory) {
                params.subcategory = selectedFilters.subcategory;
            }

            const res = await axios.get("/api/products", { params });

            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);

        } catch (error) {
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Re-fetch products whenever page or filters change
    useEffect(() => {
        fetchProducts();
    }, [page, selectedFilters]);

    // Handle selecting a subcategory
    const handleFilterChange = (value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            subcategory: value,
        }));

        setPage(1); // Reset to page 1 when selecting a new filter
    };

    // Pagination handlers
    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <div className="shop">

            {/* Filters */}
            <div className="filters">
                <h3>Subcategories</h3>

                <button
                    onClick={() => handleFilterChange("")}
                    className={selectedFilters.subcategory === "" ? "active" : ""}
                >
                    All
                </button>

                <button
                    onClick={() => handleFilterChange("floral")}
                    className={selectedFilters.subcategory === "floral" ? "active" : ""}
                >
                    Floral
                </button>

                <button
                    onClick={() => handleFilterChange("woody")}
                    className={selectedFilters.subcategory === "woody" ? "active" : ""}
                >
                    Woody
                </button>

                <button
                    onClick={() => handleFilterChange("fruity")}
                    className={selectedFilters.subcategory === "fruity" ? "active" : ""}
                >
                    Fruity
                </button>
            </div>

            {/* Products */}
            <div className="products">
                {loading ? (
                    <p>Loading...</p>
                ) : products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    products.map((item) => (
                        <div className="product-card" key={item._id}>
                            <img src={item.images?.[0]} alt={item.title} />
                            <h4>{item.title}</h4>
                            <p>${item.price}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button disabled={page === 1} onClick={handlePrev}>
                    Prev
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button disabled={page === totalPages} onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Shop;
