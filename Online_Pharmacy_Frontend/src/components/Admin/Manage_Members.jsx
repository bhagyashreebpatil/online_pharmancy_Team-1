import React, { useState, useEffect, useContext } from 'react';
import '../../styles/Admin/Manage_Members.css';
import { DashboardContext } from './DashboardContext';

const ManageMembers = () => {
  const { setMemberCount } = useContext(DashboardContext);
  const [members, setMembers] = useState([]);
  const [view, setView] = useState('list'); 
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .then(data => setMemberCount(data.length))
      .catch(err => console.error('Fetch failed:', err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/members/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setMembers(members.filter(member => member.id !== id));
      })
      .catch(err => console.error('Delete failed:', err));
  };

  const handleUpdateClick = (member) => {
    setSelectedMember(member);
    setFormData(member);
    setView('update');
  };

  const handleAddClick = () => {
    setFormData({ name: '', email: '', role: '' });
    setView('add');
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (view === 'add') {
      fetch('http://localhost:5000/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(newMember => {
          setMembers([...members, newMember]);
          setView('list');
        })
        .catch(err => console.error('Add failed:', err));
    } else if (view === 'update') {
      fetch(`http://localhost:5000/api/members/${selectedMember.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(updated => {
          setMembers(members.map(m => m.id === updated.id ? updated : m));
          setView('list');
        })
        .catch(err => console.error('Update failed:', err));
    }
  };

  return (
    <div className="manage-members">
      {view === 'list' && (
        <>
          <div className="header">
            <h2>👥 Manage Members</h2>
            <button className="member-add-btn" onClick={handleAddClick}>➕ Add Member</button>
          </div>
          <p className='total-members'>Total Members: {members.length}</p>
          <table className="members-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>
                  <td>
                    <button onClick={() => handleUpdateClick(member)}>✏️ Update</button>
                    <button onClick={() => handleDelete(member.id)}>🗑️ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {(view === 'add' || view === 'update') && (
        <form className="member-form" onSubmit={handleFormSubmit}>
          <h3>{view === 'add' ? 'Add New Member' : 'Update Member'}</h3>
          <input
            className="member-input"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <input
            className="member-input"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
          <select
            className="member-input"
            name="role"
            value={formData.role}
            onChange={handleFormChange}
            required
          >
            <option value="">Select Role</option>
            <option value="deliver">Deliver</option>
            <option value="system-auditor">System Auditor</option>
            <option value="cashier">Cashier</option>
            <option value="supplier">Supplier</option>
            <option value="warehouse-staff">Warehouse Staff</option>
          </select>
          <button type="submit">✅ {view === 'add' ? 'Add Member' : 'Update Member'}</button>
          <button type="button" onClick={() => setView('list')}>↩️ Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ManageMembers;