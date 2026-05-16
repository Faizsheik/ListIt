import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assests/logo.png';
import { getUserDetails } from '../util/GetUser';
import { Dropdown } from 'antd';
import avatar from '../assests/login.png';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'; // Import icons for toggle button

function Navbar({ active }) {
  const [user, setUser] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track mobile menu toggle
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = getUserDetails();
    setUser(userDetails);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('toDoAppUser');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const items = [
    {
      key: '1',
      label: (
        <span onClick={handleLogout}> Logout</span>
      ),
    },
  ];

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <div className='logo__wrapper'>
          <img src={logo} alt="logo"/>
          <h4>ToDo</h4>
        </div>

        {/* Mobile Hamburger Button */}
        <button className="menu-toggle-btn" onClick={toggleMenu}>
          {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        {/* Appended dynamic class 'show-menu' based on toggle state */}
        <ul className={`navigation-menu ${isMenuOpen ? 'show-menu' : ''}`}>
          <li>
            <Link to="/" className={active === 'home' ? 'activeNav' : ''} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          
          {user && (
            <li>
              <Link to="/to-do-list" className={active === 'myTask' ? 'activeNav' : ''} onClick={() => setIsMenuOpen(false)}>
                My Task
              </Link>
            </li>
          )}

          {user ? (
            <li className="user-dropdown-item">
              <Dropdown
                menu={{ items }}
                placement="bottom"
                arrow
              >
                <div className='userInfoNav'>
                  <img src={avatar} alt="." />
                  <span>{user?.firstName ? `Hello, ${user?.firstName} ${user?.lastName}` : user?.username}</span>
                </div>
              </Dropdown>
            </li>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
              <li><Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;