import React, {useEffect, useState} from 'react';
import './style.scss'
import Button from "../Button";
import Input from "../Input";
import ErrorBlock from "../Error";
import moment from "moment";
import {compareObj} from "../../Utils/objects";

function FormBday({editData, onSave, edit}) {
    const [data, setData] = useState(editData);
    const [err, setErr] = useState({
        show: false,
        firstName: '',
        lastName: '',
        date: '',
    });

    useEffect(() => {
        //console.log(data.date.length);
       // console.log(data.date);
    });

    return (
        <>
            <form className={'formAddBday'}>
                <label>First Name<ErrorBlock content={err.firstName}/>
                    <Input
                        placeholder={'Enter first name..'}
                        value={data.firstName}
                        handleChange={(e) => {
                            setData({...data, firstName: e.target.value});
                            //setErr(validation({...data, firstName: 'Иван'}));
                        }}/>
                </label>
                <label>Last Name<ErrorBlock content={err.lastName}/>
                    <Input
                        placeholder={'Enter last name..'}
                        value={data.lastName}
                        handleChange={(e) => {
                            setData({...data, lastName: e.target.value});
                            //setErr(validation({...data, lastName: e.target.value}));
                        }}/>
                </label>
                <label>Date<ErrorBlock content={err.date}/>
                    <Input
                        placeholder={'DD/MM/YYYY'}
                        value={data.date}
                        handleChange={(e) => {
                            setData({...data, date: e.target.value});
                            //setErr(validation({...data, date: '01/01/1999'}));
                        }}/>
                </label>
            </form>
            <Button onClick={() => {
                //валидация и только потом закрытие формы и др
                setErr(validation(data));
                if (!validation(data).show) {
                    onSave(data);
                }

            }}
                    disabled={(compareObj(editData, data) && (edit)&&(data.date.length===0)) ? ('disabled') : ('')}
                    className="btnSave">Save</Button></>
    );
}

export default FormBday;

function validation(data) {
    let err = {
        show: false,
        firstName: '',
        lastName: '',
        date: '',
    };
    //валидация как на сервере
    const reg = new RegExp('^[a-zA-Zа-яА-Я-]{2,30}$');
    err.firstName = reg.test(data.firstName) ? '' : 'incorrect value';
    err.lastName = reg.test(data.lastName) ? '' : 'incorrect value';
    //err.date = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(data.date) ? '' : 'incorrect value (date format: DD/MM/YYYY)';
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(data.date)) {
        if ((moment(data.date + ' +0000', 'DD-MM-YYYY Z').unix() > 0) && (moment(data.date + ' +0000', 'DD-MM-YYYY Z').unix() < 2147483648)) {
            err.date = '';
        } else {
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
