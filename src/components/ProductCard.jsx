function ProductCard({ products }) {
  if (products.length === 0) return <p>No products available</p>;

  return (
    <div className="row">
      {products.map(p => (
        <div className="col-md-4 mb-3" key={p.id}>
          <div className="card">
            <img src={p.imagePreview} className="card-img-top" height="200" />
            <div className="card-body">
              <h5>{p.name}</h5>
              <p>₹{p.price}</p>
              <p>{p.category}</p>
              <p>Stock: {p.stock}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
