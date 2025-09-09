// // 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../../styles/Admin/Admin_Profile.css';

// const AdminProfile = () => {
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     gender: '',
//     dob: '',
//     profileImage: ''
//   });

//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5000/api/admin/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setProfile(response.data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     setProfile({ ...profile, profileImage: URL.createObjectURL(file) }); // Live preview
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const formData = new FormData();
//       formData.append('phone', profile.phone);
//       formData.append('address', profile.address);
//       formData.append('gender', profile.gender);
//       formData.append('dob', profile.dob);
//       if (imageFile) {
//         formData.append('profileImage', imageFile);
//       }

//       await axios.post('http://localhost:5000/api/admin/profile/details', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       alert('✅ Profile updated successfully!');
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       alert('❌ Failed to save profile.');
//     }
//   };

//   return (
//     <div className="admin-profile-container">
//       <h2>👤 Admin Profile</h2>
//       <div className="profile-card">
//         <div className="profile-image-section">
//           <img
//             src={profile.profileImage || '/default-avatar.png'}
//             alt="Profile"
//             className="profile-image"
//           />
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>

//         <input
//           type="text"
//           name="name"
//           value={profile.name}
//           placeholder='Enter your name'
//         />

//         <input
//           type="email"
//           name="email"
//           value={profile.email}
//           placeholder='Enter your email'
//         />

//         <input
//           type="text"
//           name="phone"
//           value={profile.phone}
//           onChange={handleChange}
//           placeholder="Enter your phone number"
//         />

//         <input
//           type="text"
//           name="address"
//           value={profile.address}
//           onChange={handleChange}
//           placeholder="Enter your address"
//         />

//         <select name="gender" value={profile.gender} onChange={handleChange}>
//           <option value="">Select</option>
//           <option value="Female">Female</option>
//           <option value="Male">Male</option>
//           <option value="Other">Other</option>
//         </select>

//         <input
//           type="date"
//           name="dob"
//           value={profile.dob}
//           onChange={handleChange}
//         />

//         <div className="profile-buttons">
//           <button onClick={handleSubmit}>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Admin/Admin_Profile.css';

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dob: '',
    profileImage: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setProfile({ ...profile, profileImage: URL.createObjectURL(file) });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('phone', profile.phone);
      formData.append('address', profile.address);
      formData.append('gender', profile.gender);
      formData.append('dob', profile.dob);
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }

      await axios.post('http://localhost:5000/api/admin/profile/details', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('✅ Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('❌ Failed to save profile.');
    }
  };

  if (loading) return <div className="admin-profile-container">Loading profile...</div>;

  return (
    <div className="admin-profile-container">
      <h2>👤 Admin Profile</h2>
      <div className="profile-card">
        <div className="profile-image-section">
          <img
            src={profile.profileImage || '/default-avatar.png'}
            alt="Profile"
            className="profile-image"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <input type="text" name="name" value={profile.name} disabled />
        <input type="email" name="email" value={profile.email} disabled />

        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />

        <input
          type="text"
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />

        <select name="gender" value={profile.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
        />

        <div className="profile-buttons">
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;