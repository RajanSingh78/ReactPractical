import { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import ProductCard from "./components/ProductCard";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [view, setView] = useState("table");

  const totalStockValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );

  return (
    <div className="container-fluid p-4 bg-dark text-light min-vh-100">
      <h5 className="mb-3">
        Total Products: {products.length} | Total Stock Value: ₹{totalStockValue}
      </h5>

      <div className="row">
        
        <div className="col-md-4">
          <ProductForm
            products={products}
            setProducts={setProducts}
            editProduct={editProduct}
            setEditProduct={setEditProduct}
          />
        </div>

        <div className="col-md-8">
          <div className="mb-2">
            <button className="btn btn-primary me-2" onClick={() => setView("table")}>
              Table View
            </button>
            <button className="btn btn-secondary" onClick={() => setView("card")}>
              Card View
            </button>
          </div>

          <input
            className="form-control mb-2"
            placeholder="Search by product name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select mb-3"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Grocery</option>
          </select>

          {view === "table" ? (
            <ProductTable
              products={products}
              search={search}
              filterCategory={filterCategory}
              setProducts={setProducts}
              setEditProduct={setEditProduct}
            />
          ) : (
            <ProductCard products={products} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
