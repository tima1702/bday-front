import React, {useCallback, useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {calendarDeleteBday, calendarFetchList, calendarEditBday} from '../../Reducers/calendar';
import './style.scss';
import Table from "../../components/table";
import Button from "../../components/Button";
import iconDelete from '../../image/iconDelete.png';
import iconEdit from '../../image/iconEdit.png';
import Form from "../../components/Form";
import moment from "moment";
import Modal from "../../components/Modal";

function ShowAllBdayPage() {
    const {payload} = useSelector(state => state.calendar.list, shallowEqual);
    const isLoading = useSelector(state => state.calendar.list.isLoading, shallowEqual);
    const dispatch = useDispatch();
    const [editData, setEditData] = useState({id: null, firstName: '', lastName: '', data: {}, date: ''});//редактируемые данные, которые отобажаются в модалке
    const [showModal, setShowModal] = useState(false);//модалка для редактирования ДР
    const [viewMode, setViewMode] = useState(false);//активаця режима просмотра
    const [showSimpleModal, setShowSimpleModal] = useState(false);//уточняющая модалка
    const [currentId, setCurrentId] = useState(null);//айди ДР, с которым в данный момент работает пользователь

    useEffect(() => {
        dispatch(calendarFetchList());
    }, [dispatch]);

    const handleDelete = useCallback((id) => {
        dispatch(calendarDeleteBday(id)).then(() => {
            setCurrentId(null);
            setShowSimpleModal(false);
            dispatch(calendarFetchList());
        }).catch(() => {
            //обработать возможные ошибки
        })
    }, []);

    const handleEdit = useCallback((id, date) => {
        dispatch(calendarEditBday(id, date)).then(() => {
            dispatch(calendarFetchList());
        }).catch(() => {
            //обработать возможные ошибки
        })
    }, []);

    let table = [];

    if (!isLoading) {
        tablePattern.content = [];
        if (viewMode) {//VIEW MODE
            let i = 1;
            for (const item in payload) {
                tablePattern.content = [];
                tablePattern.content.push([
                    {
                        name: 'name',
                        children: item,
                        className: 'heading',
                        colSpan: '2'
                    },
                ]);
                payload[item].forEach((subItem, subIndex) => {
                    tablePattern.content.push([
                        {
                            name: 'date', className: 'td-m',
                            children: subItem.day
                        },
                        {
                            name: 'name',
                            children: subItem.fullName,
                            className: 'th-l',
                        },
                    ]);
                });

                table.push(<Table key={'table' + item}
                                  classNameTable={'tableForViewMode'}
                                  classNameBlock={'blockForViewMode'}
                                  classNameTableHead={'heading'}
                                  header={tablePattern.header} content={tablePattern.content}
                                  isLoading={isLoading}/>);
                i++;

            }
        } else {
            for (const item in payload) {
                if (payload[item].length > 0) {//пишем название месяца только если там есть ДР
                    tablePattern.content.push([
                        {
                            name: 'name',
                            children: item,
                            className: 'heading',
                            colSpan: '3'
                        },
                    ]);
                }
                payload[item].forEach((subItem, subIndex) => {
                    let action = [<Button key={'ButtonEdit' + subIndex} children={'Edit'} className={"btnEdit"}
                                          onClick={() => {
                                              setShowModal(true);
                                              setEditData({
                                                  id: subItem.id,
                                                  firstName: subItem.firstName,
                                                  lastName: subItem.lastName,
                                                  data: {},
                                                  date: ''
                                              })
                                          }}/>,
                        <Button key={'ButtonDelete' + subIndex} children={'Delete'} className={"btnDelete"}
                                onClick={() => {
                                    setCurrentId(subItem.id)
                                    setShowSimpleModal(true);
                                }}/>];
                    // handleDelete(subItem.id)
                    tablePattern.content.push([
                        {
                            name: 'date', className: 'td-m',
                            children: subItem.day
                        },
                        {
                            name: 'name',
                            children: subItem.fullName,
                            className: 'th-l',
                        },
                        {
                            name: 'action',
                            className: 'td-action',
                            children: action,
                        }
                    ]);
                });
            }
            table.push(<Table key={'mainTable'} classNameTable={tablePattern.classNameTable}
                              classNameTableHead={tablePattern.classNameTableHead}
                              header={tablePattern.header} content={tablePattern.content}
                              isLoading={isLoading}/>);
        }

    }
    //console.log('..........', payload);
    //return <div>CalendarPage{JSON.stringify(payload)}</div>;
    return <div>
        <Modal show={showSimpleModal} header={'Delete'}
               content={<>You sure?<Button className={'yesButton'} children={'Yes'}
                                           onClick={() => handleDelete(currentId)}/>
               </>}
               toClose={() => setShowSimpleModal(false)}/>
        <Modal show={showModal} header={'Edit birthday'}
               content={<Form onSave={(data) => handleEdit(data.id, {
                   firstName: data.firstName,
                   lastName: data.lastName,
                   data: data.data,
                   date: moment(data.date + ' +0000', 'DD-MM-YYYY Z').unix(),
               })} editData={editData}/>}
               toClose={() => setShowModal(false)}/>
        <br/>
        <Button className={'viewModeButton'} children={'view mode'} onClick={() => setViewMode(!viewMode)}/><br/>
        <br/>
        <div>{table}</div>
    </div>;
}

export default ShowAllBdayPage;

let tablePattern = {
    classNameTable: '',
    classNameTableHead: '',
    header: [
        // {name: 'date', alias: 'date', className: 'td-sm'},
        // {name: 'fullName', alias: 'Name', className: 'td-l'},
        // {name: 'action', alias: '', className: 'td-action'},
    ],
    content: []
};
