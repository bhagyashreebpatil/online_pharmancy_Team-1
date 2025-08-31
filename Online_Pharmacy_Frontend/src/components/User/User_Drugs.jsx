import React, { useEffect, useState } from 'react';
import '../../styles/User/User_Drugs.css';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const UserDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { cart, setCart } = useOutletContext();
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;


  useEffect(() => {
    fetch('http://localhost:5000/api/user/drugs')
      .then(res => res.json())
      .then(data => setDrugs(data))
      .catch(err => console.error('Failed to fetch drugs:', err));
  }, []);

  // useEffect(() => {
  // // Try loading from localStorage first
  //   const savedCart = localStorage.getItem('userCart');
  //   if (savedCart) {
  //     setCart(JSON.parse(savedCart));
  //   } else {
  //     // Fallback to backend fetch
  //     fetch(`http://localhost:5000/api/user/cart/101`)
  //       .then(res => res.json())
  //       .then(data => setCart(data.items))
  //       .catch(err => console.error('Failed to load cart:', err));
  //   }
  // }, []);

  // useEffect(() => {
  //   // Save cart to localStorage whenever it changes
  //   localStorage.setItem('userCart', JSON.stringify(cart));
  // }, [cart]);

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
        if (!cart.find(item => item.drugId === drug.id)) {
          // setCart([...cart, { ...drug, qty: 1 }]);
          setCart([...cart, { ...drug, drugId: drug.id, qty: 1 }]);
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
        <h1>💊 Browse Drugs</h1>
        <div className="cart-icon" onClick={() => navigate('/user/dashboard/cart')}>
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

