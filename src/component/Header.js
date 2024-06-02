import React, { useState } from 'react';
import { FaUserCircle, FaSave, FaExclamationTriangle } from 'react-icons/fa';
import './Header.css';

const Header = ({ title, onLogout, hasUnsavedChanges, handleSaveNote }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="main-header">
            <h1 className="main-header-title">{title}</h1>
            <div className="main-header-icons">
                <div className="save-icon" onClick={handleSaveNote}>
                    {hasUnsavedChanges ? (
                        <FaSave size={26} color="green" />
                    ):(
                        <div></div>
                    )}
                </div>
                <div className="account-icon" onClick={toggleDropdown}>
                    <FaUserCircle size={30} />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={onLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
