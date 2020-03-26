import React, {useState, useEffect} from 'react';
import './style.scss'

function TextArea({className, value, placeholder, handleChange,readOnly}) {
    return (
        <textarea
            placeholder={placeholder}
            className={className}
            onChange={handleChange}
            value={value}
            readOnly={readOnly}
        />
    );
}

export default TextArea;
