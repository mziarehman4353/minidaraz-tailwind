import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name" required className="w-full px-4 py-2 border rounded" />
        <input type="email" placeholder="Email" required className="w-full px-4 py-2 border rounded" />
        <textarea placeholder="Shipping Address" required className="w-full px-4 py-2 border rounded"></textarea>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Order Summary:</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <p>{item.title} × {item.quantity}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <p className="text-right font-bold mt-2">Total: ${total.toFixed(2)}</p>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
