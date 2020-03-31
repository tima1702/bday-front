import React, {useCallback, useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {calendarDeleteBday, calendarFetchListOfBdays, calendarEditBday} from '../../Reducers/calendar';
import './style.scss';
import Table from "../../components/table";
import Button from "../../components/Button";
import FormBday from "../../components/FormBday";
import moment from "moment";
import Modal from "../../components/Modal";
import SnackBar from "../../components/SnackBar";

function ShowAllBdayPage() {
    const {payload} = useSelector(state => state.calendar.list, shallowEqual);
    const isLoading = useSelector(state => state.calendar.list.isLoading, shallowEqual);
    const dispatch = useDispatch();
    const [editData, setEditData] = useState({id: null, firstName: '', lastName: '', data: {}, date: ''});//редактируемые данные, которые отобажаются в модалке
    const [showModal, setShowModal] = useState(false);//модалка для редактирования ДР
    const [viewMode, setViewMode] = useState(false);//активаця режима просмотра
    const [showSimpleModal, setShowSimpleModal] = useState(false);//уточняющая модалка
    const [currentId, setCurrentId] = useState(null);//айди ДР, с которым в данный момент работает пользователь
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarContent, setSnackBarContent] = useState('');

    useEffect(() => {
        dispatch(calendarFetchListOfBdays());
    }, [dispatch]);

    const handleDelete = useCallback((id) => {
        dispatch(calendarDeleteBday(id)).then(() => {
            setCurrentId(null);
            setShowSimpleModal(false);
            dispatch(calendarFetchListOfBdays());
        }).catch(() => {
            //обработать возможные ошибки
        })
    }, []);

    const handleEdit = useCallback((id, date) => {
        dispatch(calendarEditBday(id, date)).then((resp) => {
            //выводим сообщение
            if (resp.ok) {
                setSnackBarContent('Birthday successfully edit');
            } else {
                setSnackBarContent('Error: '+resp.statusText);
            }
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000);

            dispatch(calendarFetchListOfBdays());
        }).catch(() => {
            //обработать возможные ошибки
        })
    }, []);

    let table = [];

    if (!isLoading) {
        table = [];
        tablePattern.content = [];
        if (viewMode) {//VIEW MODE
            const maxBdaysInMonth = getMaxBdaysInMonth(payload);
            let per = 0;
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
                //
                for (let i = 0; i < maxBdaysInMonth[~~(per / 3)]; i++) {
                    try {
                        tablePattern.content.push([
                            {
                                name: 'date', className: 'td-m',
                                children: payload[item][i].day
                            },
                            {
                                name: 'name',
                                children: payload[item][i].fullName,
                                className: 'td-l',
                            },
                        ]);
                    } catch (e) {//добавляем пустые строки, чтобы таблицы выглядели красиво
                        tablePattern.content.push([
                            {
                                name: 'date', className: 'td-m',
                                children: '\u00A0',
                            },
                            {
                                name: 'name',
                                children: '\u00A0',
                                className: 'td-l',
                            },
                        ]);
                    }
                }
                // payload[item].forEach((subItem) => {
                //     tablePattern.content.push([
                //         {
                //             name: 'date', className: 'td-m',
                //             children: subItem.day
                //         },
                //         {
                //             name: 'name',
                //             children: subItem.fullName,
                //             className: 'td-l',
                //         },
                //     ]);
                // });

                table.push(<Table key={'table' + item}
                                  classNameTable={'tableForViewMode'}
                                  classNameBlock={'blockForViewMode'}
                                  classNameTableHead={'heading'}
                                  header={tablePattern.header} content={tablePattern.content}
                                  isLoading={isLoading}/>);
                per++;

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
                                    setCurrentId(subItem.id);
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

    } else {
        //вывести спиннер, если данные с сервера еще не подгрузились
        table.push(<Table key={'mainTable'} classNameTable={tablePattern.classNameTable}
                          classNameTableHead={tablePattern.classNameTableHead}
                          header={tablePattern.header} content={tablePattern.content}
                          isLoading={isLoading}/>);
    }
    //console.log('..........', payload);
    //return <div>CalendarPage{JSON.stringify(payload)}</div>;
    return <div>
        <Modal show={showSimpleModal} header={'Delete'}
               content={<>You sure?
                   <Button className={'yesButton'}
                           children={'No'}
                           onClick={() => setShowSimpleModal(false)}/>
                   <Button className={'yesButton'} children={'Yes'}
                           onClick={() => handleDelete(currentId)}/>
               </>}
               toClose={() => setShowSimpleModal(false)}/>
        <Modal show={showModal} header={'Edit birthday'}
               content={<FormBday onSave={(data) => {
                   handleEdit(data.id, {
                       firstName: data.firstName,
                       lastName: data.lastName,
                       data: data.data,
                       date: moment(data.date + ' +0000', 'DD-MM-YYYY Z').unix(),
                   });
                   setShowModal(false);
               }} editData={editData}/>}
               toClose={() => setShowModal(false)}/>
        <SnackBar show={showSnackBar} content={snackBarContent}/>
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

function getMaxBdaysInMonth(payload) {
    //возвращается [a,b,c,d], где абсд - максимальные кол-ва др
    // в группе месяцев (для рисования одинаковых таблиц)
    let array = [1, 1, 1, 1];
    let per = 0;
    for (const item in payload) {
        // ~~ - это сокращенный Math.floor()
        // (~~(per/3)) - разбиваем месяцы на группы по три (остаток от деления на 3 округленный до целого)
        array[~~(per / 3)] = (array[~~(per / 3)] < payload[item].length) ? payload[item].length : array[~~(per / 3)];
        per++;
    }
    return array;
}
