import React, {useState, useEffect} from 'react';
import './style.scss'

function Spinner({className}) {
    return (
        <div className={className} ><div className="loader">Loading...</div></div>
    );
}

export default Spinner