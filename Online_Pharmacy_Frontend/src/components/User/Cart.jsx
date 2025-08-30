import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/User/Cart.css';

const Cart = () => {
  const { cart = [], setCart } = useOutletContext();
  const [total, setTotal] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

    useEffect(() => {
    const newTotal = cart.reduce((sum, item) => {
        const validQty = Number(item.qty);
        const validPrice = Number(item.price);
        if (!isNaN(validQty) && validQty > 0 && !isNaN(validPrice)) {
        return sum + validPrice * validQty;
        }
            return sum;
        }, 0);
        setTotal(newTotal);
    }, [cart]);

  // 🔄 Update quantity for a specific item
  const updateQty = (id, newQty) => {
    const qty = Math.max(1, newQty); // prevent 0 or negative
    const updated = cart.map(item =>
      item.id === id ? { ...item, qty } : item
    );
    setCart(updated);
  };

  // ❌ Remove item from cart
  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
  };

  const handlePayment = () => {
    console.log('Proceeding to payment with:', cart);
    // You can redirect or trigger backend logic here
  };

  return (

      <div className="cart-page">
        <h2 className='cart-headline'>🛒 Your Cart</h2>
        {Array.isArray(cart) && cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl || '/default-drug.png'} alt={item.name} />
                <div className="cart-details">
                  <h4 className='cart-item-name'>{item.name}</h4>
                  <p>Type: {item.type}</p>
                  <p>Price: ₹{item.price}</p>
                  <label>
                    Qty:
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    />
                  </label>
                  <p>Subtotal: ₹{item.price * item.qty}</p>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))}

            <div className="cart-total">
              <h3>Total Amount: ₹{total}</h3>
              <button className="checkout-btn" onClick={handlePayment}>Proceed to Payment</button>
            </div>
          </div>
        )}
      </div>
  );
};

export default Cart;