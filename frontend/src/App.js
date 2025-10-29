import React, { useEffect, useState } from "react";
import "./App.css";
import {
  getProducts,
  getCart,
  addToCart,
  removeFromCart,
  checkout,
} from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkoutDetails, setCheckoutDetails] = useState(null);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const loadCart = async () => {
    const res = await getCart();
    setCart(res.data.items);
    setTotal(res.data.total);
  };

  const handleAddToCart = async (id) => {
    await addToCart(id, 1);
    loadCart();
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    loadCart();
  };

  const handleCheckout = async () => {
    const res = await checkout(cart);
    setCheckoutDetails(res.data.receipt);
    loadCart();
  };

  return (
    <div className="container">
      <h1 className="title">🛍 Mock E-Com Cart</h1>

      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button onClick={() => handleAddToCart(p.id)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.subtotal.toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="total">Total: ${total.toFixed(2)}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}

      {checkoutDetails && (
        <div className="receipt">
          <h3>✅ Order Successful!</h3>
          <p>Order ID: {checkoutDetails.orderId}</p>
          <p>Total: ${checkoutDetails.total.toFixed(2)}</p>
          <p>Time: {new Date(checkoutDetails.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
