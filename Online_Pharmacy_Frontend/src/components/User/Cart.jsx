import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../../styles/User/Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const { cart = [], setCart } = useOutletContext();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

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

    useEffect(() => {
      if (userId) {
        
        fetch(`http://localhost:5000/api/cart/${userId}`)
          .then(res => res.json())
          .then(data => {
            const formatted = data.items.map(item => ({
              id: item.id || item.drugId, 
              name: item.drugName,
              price: item.price,
              qty: item.quantity,
              type: item.type,
              imageUrl: item.imageUrl,
              drugId: item.drugId
        }));
            setCart(formatted);
          })
            .catch(err => console.error("Failed to fetch cart", err));
      }
    }, [userId]);

  
  const updateQty = (id, newQty) => {
    const qty = Math.max(1, newQty); 
    const updated = cart.map(item =>
      item.id === id ? { ...item, qty } : item
    );
    setCart(updated);
  };

  const removeItem = async (drugId) => {
  try {
    const response = await fetch('http://localhost:5000/api/user/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, drugId })
    });

    if (response.ok) {
      const updatedCart = await response.json();
      const formatted = updatedCart.items.map(item => ({
        id: item.id || item.drugId,
        name: item.drugName,
        price: item.price,
        qty: item.quantity,
        type: item.type,
        imageUrl: item.imageUrl,
        drugId: item.drugId
      }));
      setCart([...formatted]); 
    } else {
      console.error("Failed to remove item from backend");
    }
  } catch (err) {
    console.error("Error removing item:", err);
  }
};

  const handleCancel = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
      const data = await res.json();
      const formatted = data.items.map(item => ({
        id: item.id || item.drugId,
        name: item.drugName,
        price: item.price,
        qty: item.quantity,
        type: item.type,
        imageUrl: item.imageUrl,
        drugId: item.drugId
      }));
      setCart([...formatted]); 
    } catch (err) {
      console.error("Failed to refresh cart before navigating back", err);
    }

    navigate("/user/dashboard/drugs"); 
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
                <button className="remove-btn" onClick={() => removeItem(item.drugId)}>Remove</button>
              </div>
            ))}

            <div className="cart-total">
              <h3>Total Amount: ₹{total}</h3>
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              <button className="checkout-btn" onClick={() => navigate("/user/dashboard/payment-user")}>Proceed to Payment</button>

            </div>
          </div>
        )}
      </div>
  );
};

export default Cart;