import React, { useState } from 'react';

import './search-panel.scss';
const SearchPanel = ({ onSearchChange }) => {
    const[searchString, setSearchString] = useState('');

    const handleChange = (e) => {
        setSearchString(e.target.value);
        onSearchChange(e.target.value);
    };

    return (
        <div className="search-panel">
            <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                value={searchString}
                onChange={handleChange} />
        </div>
    );
};

export default SearchPanel;