import React from 'react'

const Navbar = ({ setPage }) => {
  return (
    <nav>
      <button onClick={(e) => setPage('plants')}>Plants</button>
      <button onClick={(e) => setPage('people')}>People</button>
    </nav>
  );
};

export default Navbar;
