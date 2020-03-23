import React from 'react';
import './style.scss'
import Button from "../Button";

function Form({className,onSave}) {
    const data = {};
    return (
        <form className={'formAddBday'}>
            <label>First Name
                <input type="text" name="firstName" placeholder="Enter first name.."/>
            </label>
            <label>Last Name
                <input type="text" name="lastName" placeholder="Enter last name.."/>
            </label>
            <label>Date
                <input type="text" name="date" placeholder="DD/MM/YYYY"/>
            </label>
            <Button onClick={() => onSave(data)} className="btnSave">Save</Button>
        </form>
    );
}

export default Form;
