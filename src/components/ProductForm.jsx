import { useState, useEffect } from "react";

function ProductForm({ products, setProducts, editProduct, setEditProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: null,
    imagePreview: "",
    manual: null,
    manualName: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editProduct) setForm(editProduct);
  }, [editProduct]);

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.price || form.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!form.category) newErrors.category = "Category is required";
    if (form.stock === "" || form.stock < 0) newErrors.stock = "Stock must be 0 or more";
    if (!form.image) newErrors.image = "Product image is required";
    if (!form.manual) newErrors.manual = "Product manual (PDF) is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    setForm({
      ...form,
      image: file,
      imagePreview: URL.createObjectURL(file)
    });
  };

  const handleManual = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF allowed");
      return;
    }

    setForm({
      ...form,
      manual: file,
      manualName: file.name
    });
  };

  const submit = () => {
    if (!validate()) return;

    if (editProduct) {
      setProducts(
        products.map(p =>
          p.id === editProduct.id ? { ...form, id: editProduct.id } : p
        )
      );
      setEditProduct(null);
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }

    setForm({
      name: "",
      price: "",
      category: "",
      stock: "",
      image: null,
      imagePreview: "",
      manual: null,
      manualName: ""
    });

    setErrors({});
  };

  return (
    <div className="card p-3 bg-secondary text-light">
      <h5>{editProduct ? "Edit Product" : "Add Product"}</h5>

      
      <label>
        Product Name <span className="text-danger">*</span>
      </label>
      <input
        className="form-control mb-1"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <small className="text-danger">{errors.name}</small>}

      
      <label className="mt-2">
        Price <span className="text-danger">*</span>
      </label>
      <input
        type="number"
        className="form-control mb-1"
        value={form.price}
        onChange={e => setForm({ ...form, price: +e.target.value })}
      />
      {errors.price && <small className="text-danger">{errors.price}</small>}

      
      <label className="mt-2">
        Category <span className="text-danger">*</span>
      </label>
      <select
        className="form-select mb-1"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        <option>Electronics</option>
        <option>Clothing</option>
        <option>Grocery</option>
      </select>
      {errors.category && <small className="text-danger">{errors.category}</small>}

      
      <label className="mt-2">
        Stock Quantity <span className="text-danger">*</span>
      </label>
      <input
        type="number"
        className="form-control mb-1"
        value={form.stock}
        onChange={e => setForm({ ...form, stock: +e.target.value })}
      />
      {errors.stock && <small className="text-danger">{errors.stock}</small>}

    
      <label className="mt-2">
        Product Image <span className="text-danger">*</span>
      </label>
      <input type="file" className="form-control mb-1" onChange={handleImage} />
      {errors.image && <small className="text-danger">{errors.image}</small>}

      
      <label className="mt-2">
        Product Manual (PDF) <span className="text-danger">*</span>
      </label>
      <input type="file" className="form-control mb-1" onChange={handleManual} />
      {errors.manual && <small className="text-danger">{errors.manual}</small>}

      {form.manualName && <small>Selected: {form.manualName}</small>}

      <button className="btn btn-dark mt-3" onClick={submit}>
        {editProduct ? "Update Product" : "Add Product"}
      </button>
    </div>
  );
}

export default ProductForm;
