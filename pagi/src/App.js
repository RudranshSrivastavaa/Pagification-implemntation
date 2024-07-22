import React, { useState, useEffect } from 'react'; 
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page) => {
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 10)); 
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="App">
      {products.map((prod) => (
        <span key={prod.id}>
          <img src={prod.thumbnail} alt={prod.title} />
        </span>
      ))}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
