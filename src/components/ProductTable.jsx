function ProductTable({ products, setProducts, setEditProduct, search, filterCategory }) {

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => filterCategory ? p.category === filterCategory : true);

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <table className="table table-dark table-bordered">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Manual</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {filtered.length === 0 ? (
          <tr>
            <td colSpan="7" className="text-center text-warning">
              No products available
            </td>
          </tr>
        ) : (
          filtered.map(p => (
            <tr key={p.id}>
              <td><img src={p.imagePreview} width="50" /></td>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td>
                <a href={URL.createObjectURL(p.manual)} target="_blank" rel="noreferrer">
                  View
                </a>
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => setEditProduct(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ProductTable;
