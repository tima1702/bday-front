import React, {useCallback, useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import moment from "moment";
import Calendar from "../../components/calendar";
import './style.scss';
import Table from "../../components/table";
import Button from "../../components/Button";
import FormBday from "../../components/FormBday";
import Modal from "../../components/Modal";
import {calendarDeleteTemplate, calendarFetchListOfTemplates} from "../../Reducers/templates";

export default function () {
    const dispatch = useDispatch();
    const {payload} = useSelector(state => state.templates.list, shallowEqual);
    const isLoading = useSelector(state => state.templates.list.isLoading, shallowEqual);

    const [showSimpleModal, setShowSimpleModal] = useState(false);//уточняющая модалка
    const [currentId, setCurrentId] = useState(null);//айди template, с которым в данный момент работает пользователь
    const [collapseTableOfTemplates, setCollapseTableOfTemplates] = useState(false);//уточняющая модалка

    useEffect(() => {
        dispatch(calendarFetchListOfTemplates());
    }, [dispatch]);

    const handleDelete = useCallback((id) => {
        dispatch(calendarDeleteTemplate(id)).then(() => {
            setCurrentId(null);
            setShowSimpleModal(false);
            dispatch(calendarFetchListOfTemplates());
        }).catch(() => {
            //обработать возможные ошибки
        })
    }, []);

    if (!isLoading) {
        tablePattern.content = [];
        try {
            payload.forEach((item, index) => {
                let action = [<Button key={'ButtonEdit' + index} children={'Show'} className={"btnEdit"}
                                      onClick={() => {
                                          setCollapseTableOfTemplates(!collapseTableOfTemplates);
                                      }}/>,
                    <Button key={'ButtonDelete' + index} children={'Delete'} className={"btnDelete"}
                            onClick={() => {
                                setCurrentId(item.id);
                                setShowSimpleModal(true);
                            }}/>];

                tablePattern.content.push([
                    {
                        name: 'name',
                        children: item.title,
                        className: 'th-l',
                        onClickRow: () => {
                            setCollapseTableOfTemplates(!collapseTableOfTemplates);
                        }
                    },
                    {
                        name: 'action',
                        className: 'td-action',
                        children: action,
                    }
                ])
            });
        } catch (e) {
        }
    }

    let rightPanel = '';
    if (collapseTableOfTemplates) {//если наадо показывать правую часть экрана
        rightPanel = (<div className={'divRightPanel'}>
            We apologize, this section is under construction.
            </div>);
    } else {
        rightPanel = '';
    }

    return (
        <div>
            <Modal show={showSimpleModal} header={'Delete'}
                   content={<>You sure?
                       <Button className={'yesButton'}
                               children={'No'}
                               onClick={() => setShowSimpleModal(false)}/>
                       <Button className={'yesButton'} children={'Yes'}
                               onClick={() => handleDelete(currentId)}/>
                   </>}
                   toClose={() => setShowSimpleModal(false)}/>
            <div className={(collapseTableOfTemplates) ? 'divTableOfTemplates' : ''}><Table
                classNameTable={tablePattern.classNameTable} classNameTableHead={tablePattern.classNameTableHead}
                header={tablePattern.header} content={tablePattern.content}
                isLoading={isLoading}/></div>
            {rightPanel}
        </div>
    );
}

let tablePattern = {
    classNameTable: 'tableOfTemplates',
    classNameTableHead: '',
    header: [
        {name: 'name', alias: 'Name', className: 'heading'},
        {name: 'action', alias: '', className: 'heading'},
    ],
    content: []
};
