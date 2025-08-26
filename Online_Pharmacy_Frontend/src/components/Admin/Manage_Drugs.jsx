// import React, { useState, useEffect } from 'react';
// import '../../styles/Admin/Manage_Drugs.css';

// const ManageDrugs = () => {
//   const [drugs, setDrugs] = useState([]);
//   const [view, setView] = useState('list'); // 'list' | 'add' | 'update'
//   const [selectedDrug, setSelectedDrug] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     price: '',
//     quantity: '',
//     imageUrl: ''
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:5000/api/drugs')
//       .then(res => res.json())
//       .then(data => setDrugs(data))
//       .catch(err => console.error('Fetch failed:', err));
//   }, []);

//   const handleDelete = (id) => {
//     fetch(`http://localhost:5000/api/drugs/${id}`, {
//       method: 'DELETE'
//     })
//       .then(() => {
//         setDrugs(drugs.filter(drug => drug.id !== id));
//       })
//       .catch(err => console.error('Delete failed:', err));
//   };

//   const handleUpdateClick = (drug) => {
//     setSelectedDrug(drug);
//     setFormData(drug);
//     setView('update');
//   };
  
//   if (!res.ok) throw new Error('Server error');
//   const handleAddClick = () => {
//     setFormData({ name: '', type: '', price: '', quantity: '', imageUrl: '' });
//     setView('add');
//   };

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData({ ...formData, imageUrl: reader.result });
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!formData.name || !formData.type || !formData.price || !formData.quantity) {
//       setError('Please fill all required fields.');
//       return;
//     }

//     const url = view === 'add'
//       ? 'http://localhost:5000/api/drugs'
//       : `http://localhost:5000/api/drugs/${selectedDrug.id}`;

//     const method = view === 'add' ? 'POST' : 'PUT';

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const updatedDrug = await res.json();

//       if (view === 'add') {
//         setDrugs([...drugs, updatedDrug]);
//         setSuccess('Drug added successfully!');
//       } else {
//         setDrugs(drugs.map(d => d.id === updatedDrug.id ? updatedDrug : d));
//         setSuccess('Drug updated successfully!');
//       }

//       setView('list');
//     } catch (err) {
//       console.error(`${view} failed:`, err);
//       setError(`${view} failed. Please try again.`);
//     }
//   };

//   const filteredDrugs = drugs.filter(drug =>
//     drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     drug.type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="manage-drugs">
//       {view === 'list' && (
//         <>
//           <div className="header">
//             <h2>🛒 Drug Catalog</h2>
//             <button className="add-btn" onClick={handleAddClick}>➕ Add Drug</button>
//           </div>
//           <input
//             type="text"
//             placeholder="Search by name or type"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-bar"
//           />
//           <p>Total Drugs: {filteredDrugs.length}</p>
//           <div className="drug-grid">
//             {filteredDrugs.map(drug => (
//               <div className="drug-card" key={drug.id}>
//                 <img src={drug.imageUrl || '/default-drug.png'} alt={drug.name} className="drug-img" />
//                 <h3>{drug.name}</h3>
//                 <p>{drug.type}</p>
//                 <p className="price">₹{drug.price}</p>
//                 <p>Qty: {drug.quantity}</p>
//                 <div className="actions">
//                   <button onClick={() => handleUpdateClick(drug)}>✏️ Update</button>
//                   <button onClick={() => handleDelete(drug.id)}>🗑️ Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {(view === 'add' || view === 'update') && (
//         <div className="form-wrapper scrollable">
//           <form className="drug-form" onSubmit={handleFormSubmit}>
//             <h3>{view === 'add' ? 'Add New Drug' : 'Update Drug'}</h3>
//             {error && <p className="error-msg">{error}</p>}
//             {success && <p className="success-msg">{success}</p>}
//             <input type="text" name="name" placeholder="Drug Name" value={formData.name} onChange={handleFormChange} required />
//             <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleFormChange} required />
//             <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleFormChange} required />
//             <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleFormChange} required />
//             <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleFormChange} />
//             <input type="file" accept="image/*" onChange={handleImageUpload} />
//             {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="preview-img" />}
//             <button type="submit">✅ {view === 'add' ? 'Add Drug' : 'Update Drug'}</button>
//             <button type="button" onClick={() => setView('list')}>↩️ Cancel</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageDrugs;

import React, { useState, useEffect } from 'react';
import '../../styles/Admin/Manage_Drugs.css';

const ManageDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [view, setView] = useState('list'); // 'list' | 'add' | 'update'
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    quantity: '',
    imageUrl: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/drugs')
      .then(response => response.json())
      .then(data => setDrugs(data))
      .catch(err => console.error('Fetch failed:', err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/drugs/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setDrugs(drugs.filter(drug => drug.id !== id));
      })
      .catch(err => console.error('Delete failed:', err));
  };

  const handleUpdateClick = (drug) => {
  setSelectedDrug(drug);
  setFormData({
    name: drug.name || '',
    type: drug.type || '',
    price: drug.price?.toString() || '',
    quantity: drug.quantity?.toString() || '',
    imageUrl: drug.imageUrl || ''
  });
    setSuccess('');
    setError('');
    setView('update');
  };

  const handleAddClick = () => {
    setFormData({ name: '', type: '', price: '', quantity: '', imageUrl: '' });
    setSuccess('');
    setError('');
    setView('add');
  };


  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // ✅ Size check: limit to 2MB
    if (file.size > 2 * 1024 * 1024) {
        setError('Image too large. Please upload a file under 2MB.');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
    };

    reader.readAsDataURL(file);
    };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.type || !formData.price || !formData.quantity) {
      setError('Please fill all required fields.');
      return;
    }

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity)
    };

    const url = view === 'add'
      ? 'http://localhost:5000/api/drugs'
      : `http://localhost:5000/api/drugs/${selectedDrug.id}`;

    const method = view === 'add' ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Server error');

      const updatedDrug = await response.json();

      if (view === 'add') {
        setDrugs([...drugs, updatedDrug]);
        setSuccess('Drug added successfully!');
      } else {
        setDrugs(drugs.map(d => d.id === updatedDrug.id ? updatedDrug : d));
        setSuccess('Drug updated successfully!');
      }

      setFormData({ name: '', type: '', price: '', quantity: '', imageUrl: '' });
      setView('list');
    } catch (err) {
      console.error(`${view} failed:`, err);
      setError(`${view} failed. Please try again.`);
    }
  };

  const filteredDrugs = drugs.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drug.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-drugs">
      {view === 'list' && (
        <>
          <div className="header">
            <h2>🛒 Drug Catalog</h2>
            <button className="drug-add-btn" onClick={handleAddClick}>➕ Add Drug</button>
          </div>
          <input
            type="text"
            placeholder="Search by name or type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <p className='total-drugs'>Total Drugs: {filteredDrugs.length}</p>
          <div className="drug-scroll">
          <div className="drug-grid">
            {filteredDrugs.map(drug => (
              <div className="drug-card" key={drug.id}>
                <img src={drug.imageUrl || '/default-drug.png'} alt={drug.name} className="drug-img" />
                <h3>{drug.name}</h3>
                <p>{drug.type}</p>
                <p className="price">₹{drug.price}</p>
                <p>Qty: {drug.quantity}</p>
                <div className="actions">
                  <button onClick={() => handleUpdateClick(drug)}>✏️ Update</button>
                  <button onClick={() => handleDelete(drug.id)}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </>
      )}

      {(view === 'add' || view === 'update') && (
        <div className="form-wrapper scrollable">
          <form className="drug-form" onSubmit={handleFormSubmit}>
            <h3>{view === 'add' ? 'Add New Drug' : 'Update Drug'}</h3>
            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}
            <input type="text" name="name" placeholder="Drug Name" value={formData.name} onChange={handleFormChange} required />
            <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleFormChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleFormChange} required />
            <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleFormChange} required />
            <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleFormChange} />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="preview-img" />}
            <button type="submit">✅ {view === 'add' ? 'Add Drug' : 'Update Drug'}</button>
            <button type="button" onClick={() => setView('list')}>↩️ Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageDrugs;