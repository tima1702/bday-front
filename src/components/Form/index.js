import React, {useState} from 'react';
import './style.scss'
import Button from "../Button";
import Input from "../Input";
import ErrorBlock from "../Error";
import moment from "moment";

function Form({editData, onSave}) {
    const [data, setData] = useState(editData);
    const [err, setErr] = useState(validation(data));

    return (
        <form className={'formAddBday'}>
            <label>First Name<ErrorBlock content={err.firstName}/>
                <Input
                    placeholder={'Enter first name..'}
                    value={data.firstName}
                    handleChange={(e) => {
                        setData({...data, firstName: e.target.value});
                        setErr(validation({...data, firstName: e.target.value}));
                    }}/>
            </label>
            <label>Last Name<ErrorBlock content={err.lastName}/>
                <Input
                    placeholder={'Enter last name..'}
                    value={data.lastName}
                    handleChange={(e) => {
                        setData({...data, lastName: e.target.value});
                        setErr(validation({...data, lastName: e.target.value}));
                    }}/>
            </label>
            <label>Date<ErrorBlock content={err.date}/>
                <Input
                    placeholder={'DD/MM/YYYY'}
                    value={data.date}
                    handleChange={(e) => {
                        setData({...data, date: e.target.value});
                        setErr(validation({...data, date: e.target.value}));
                    }}/>
            </label>
            <Button onClick={() => onSave(data)} disabled={err.show ? ('disabled') : ('')}
                    className="btnSave">Save</Button>
        </form>
    );
}

export default Form;

function validation(data) {
    let err = {
        show: false,
        firstName: '',
        lastName: '',
        date: '',
    };
    //валидация как на сервере
    const reg = new RegExp('^[a-zA-Zа-яА-Я]{2,15}$');
    err.firstName = reg.test(data.firstName) ? '' : 'incorrect value';
    err.lastName = reg.test(data.lastName) ? '' : 'incorrect value';
    //err.date = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(data.date) ? '' : 'incorrect value (date format: DD/MM/YYYY)';
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(data.date)) {
        if ((moment(data.date + ' +0000', 'DD-MM-YYYY Z').unix() > 0) && (moment(data.date + ' +0000', 'DD-MM-YYYY Z').unix() < 2147483648)) {
            err.date = '';
        }
        else{
            err.date = 'incorrect value';
        }
    } else {
        err.date = 'incorrect value (date format: DD/MM/YYYY)';
    }

    err.firstName = (data.firstName.length < 1) ? 'the field cannot be empty!' : err.firstName;
    err.lastName = (data.lastName.length < 1) ? 'the field cannot be empty!' : err.lastName;
    err.date = (data.date.length < 1) ? 'the field cannot be empty!' : err.date;

    // incorrect value
    err.show = Boolean(err.firstName.length + err.lastName.length + err.date.length);
    return err;
}
