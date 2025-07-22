import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ background: '#f57c00', padding: '1rem', color: 'white' }}>
      <Link to="/" style={{ margin: '0 1rem', color: 'white' }}>Home</Link>
      <Link to="/donate" style={{ margin: '0 1rem', color: 'white' }}>Donate</Link>
      <Link to="/admin" style={{ margin: '0 1rem', color: 'white' }}>Admin</Link>
    </nav>
  );
}
