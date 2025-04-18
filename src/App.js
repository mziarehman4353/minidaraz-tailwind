import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import productsData from "./data/products.json";
import Checkout from "./checkout";
import AdminDashboard from "./AdminDashboard"; // Ensure this file exists
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}


function Home({ isAdmin, setIsAdmin }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAdminLogin = () => {
    const password = prompt("Enter admin password:");
    if (password === "admin123") {
      setIsAdmin(true);
      navigate("/admin");
    } else {
      alert("Incorrect password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 relative">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        MiniDaraz 🛒
      </h1>

      {/* Search & Filter */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Cart ({cart.length})
        </button>
      </div>

      {/* Admin Access */}
      {!isAdmin ? (
        <button
          onClick={handleAdminLogin}
          className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
        >
          Admin Login
        </button>
      ) : (
          <button
              onClick={() => {
                localStorage.setItem("isAdmin", true); // set admin session
                navigate("/admin");
              }}
              className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700"
            >
              Go to Admin Dashboard
          </button>

      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-blue-600 font-medium mt-1">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">No products found.</p>
        )}
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg p-6 z-50 overflow-y-auto border-l border-gray-200">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">🛒 Your Cart</h2>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}

          <hr className="my-4" />
          <div className="text-right font-bold text-lg">
            Total: ${totalPrice.toFixed(2)}
          </div>

          <button
            onClick={() => navigate("/checkout", { state: { cart } })}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

// Final App with Routes
function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <div className="p-10 text-center text-red-600 font-bold text-xl">
                Access Denied. Please login as Admin.
              </div>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
