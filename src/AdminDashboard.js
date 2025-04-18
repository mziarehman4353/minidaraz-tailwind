import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  // Check admin session
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/"); // Redirect to home if not admin
    }
  }, [navigate]);

  const [products, setProducts] = useState([
    { id: 1, title: "Laptop", price: 999.99, category: "Electronics", image: "/path/to/image" },
    { id: 2, title: "Smartphone", price: 699.99, category: "Electronics", image: "/path/to/image" },
  ]);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { ...newProduct, id: products.length + 1 },
    ]);
    setNewProduct({ title: "", price: "", category: "", image: "" });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/"); // redirect to home
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Add Product Form */}
      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Add New Product</h3>
        <input
          type="text"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          className="block w-full px-4 py-2 mb-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="block w-full px-4 py-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="block w-full px-4 py-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          className="block w-full px-4 py-2 mb-2 border rounded"
        />
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
        >
          Add Product
        </button>
      </div>

      {/* Products List */}
      <div>
        <h3 className="font-semibold text-xl mb-2">Product List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-md">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
              <h4 className="font-semibold text-lg">{product.title}</h4>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="font-semibold text-blue-600">${product.price}</p>
              <div className="mt-4">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
