import React, { useEffect, useState } from 'react';
import '../../styles/User/User_Drugs.css';

const UserDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;


  useEffect(() => {
    fetch('http://localhost:5000/api/user/drugs')
      .then(res => res.json())
      .then(data => setDrugs(data))
      .catch(err => console.error('Failed to fetch drugs:', err));
  }, []);

  const handleAddToCart = async (drug) => {
    const payload = {
      userId: userId,
      drugId: drug.id,
      quantity: 1
    };

    try {
      const response = await fetch('http://localhost:5000/api/user/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const message = await response.text();

      if (response.ok) {
        if (!cart.find(item => item.id === drug.id)) {
          setCart([...cart, drug]);
          alert(`Response: ${message}`);

        }
      } else {
        alert('Failed to add drug to cart.');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const filteredDrugs = drugs.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-drugs">
      <div className="cart-header">
        <h2>💊 Browse Drugs</h2>
        <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
          🛒 Cart ({cart.length})
        </div>
      </div>

      {showCart && (
        <div className="cart-dropdown">
          {cart.length === 0 ? (
            <p className='cart-empty'>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <span>{item.name} - ₹{item.price}</span>
                <button onClick={() => handleRemoveFromCart(item.id)}>❌</button>
              </div>
            ))
          )}
        </div>
      )}

      <input
        className="user-drug-search-bar"
        type="text"
        placeholder="Search drugs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="drug-grid">
        {filteredDrugs.map(drug => (
          <div key={drug.id} className="drug-card">
            <img src={drug.imageUrl || '/default-drug.png'} alt={drug.name} />
            <h3>{drug.name}</h3>
            <p className="drug-card-type">{drug.type}</p>
            <p className="drug-card-price">₹{drug.price}</p>
            <button onClick={() => handleAddToCart(drug)}>🛒 Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDrugs;