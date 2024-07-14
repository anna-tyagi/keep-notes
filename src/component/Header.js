import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSave } from 'react-icons/fa';
import './Header.css';

const Header = ({ title, onLogout, hasUnsavedChanges, handleSaveNote, onTitleChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editableTitle, setEditableTitle] = useState(title);

    useEffect(() => {
        setEditableTitle(title);
    }, [title]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleTitleChange = (event) => {
        setEditableTitle(event.target.value);
        onTitleChange(event.target.value);
    };

    const handleTitleClick = () => {
        setIsEditing(true);
    };

    const handleTitleBlur = () => {
        setIsEditing(false);
        // Optionally, you can call a function to save the title if it has been edited
        // saveTitle(editableTitle);
    };

    return (
        <div className="main-header">
            {isEditing ? (
                <input
                    className="main-header-title-input"
                    value={editableTitle}
                    onChange={handleTitleChange}
                    onBlur={handleTitleBlur}
                    autoFocus
                />
            ) : (
                <h1 className="main-header-title" onClick={handleTitleClick}>
                    {editableTitle}
                </h1>
            )}
            <div className="main-header-icons">
                <div className="save-icon" onClick={handleSaveNote}>
                    {hasUnsavedChanges ? (
                        <FaSave size={26} color="green" />
                    ) : (
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
