function ProductList({ products, search, filterCategory, sortOrder, deleteProduct }) {

  let data = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => filterCategory ? p.category === filterCategory : true);

  if (sortOrder === "asc") data.sort((a, b) => a.price - b.price);
  if (sortOrder === "desc") data.sort((a, b) => b.price - a.price);

  if (data.length === 0) return <p>No products available</p>;

  return (
    <table border="1">
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
        {data.map(p => (
          <tr key={p.id} style={{ background: p.stock === 0 ? "#ffcccc" : "" }}>
            <td><img src={p.imagePreview} width="50" /></td>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.category}</td>
            <td>{p.stock}</td>
            <td>
              <a href={URL.createObjectURL(p.manual)} target="_blank">View</a>
            </td>
            <td>
              <button onClick={() => deleteProduct(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
