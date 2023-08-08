import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';

function Register() {
  const [nic, setNIC] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nic,
      name,
      role,
      username,
      password
    };

    try {
      const response = await axios.post('/api/register', formData); // Adjust the API endpoint
      console.log('Registration successful:', response.data);
      // Handle success or redirect to a success page
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error or show error message
    }
  };

  return (
    <div>

<h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>NIC:</label>
          <input type="text" value={nic} onChange={(e) => setNIC(e.target.value)} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Role:</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
      
    </div>
  )
}

export default Register
