import React, {useState, useEffect} from 'react';
import './style.scss'

function Input({className, value, placeholder, size, handleChange,readOnly}) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            size={size}
            className={className}
            onChange={handleChange}
            value={value}
            readOnly={readOnly}
        />
    );
}

export default Input