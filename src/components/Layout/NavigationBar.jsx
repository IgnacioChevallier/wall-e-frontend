import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiHome, FiList, FiSend, FiPlusCircle, FiLogOut } from 'react-icons/fi'; // Import icons

const NavigationBar = () => {
  const { logout } = useAuth();

  // Helper component for NavLink content
  const NavItem = ({ to, icon: Icon, label, end = false }) => (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <>
          <Icon size={22} />
          <span className={isActive ? 'active-label' : ''}>{label}</span>
        </>
      )}
    </NavLink>
  );

  return (
    <nav className="navbar">
      <NavItem to="/" icon={FiHome} label="Home" end={true} />
      <NavItem to="/history" icon={FiList} label="History" />
      <NavItem to="/send" icon={FiSend} label="Send" />
      <NavItem to="/add" icon={FiPlusCircle} label="Add Money" />
      <button onClick={logout} className="navbar-button logout-button">
        <FiLogOut size={22} />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default NavigationBar; 