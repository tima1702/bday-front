import React, {useCallback, useEffect, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import './style.scss';

import {
    calendarDeleteTemplate,
    calendarEditTemplate,
    calendarFetchListOfTemplates,
    calendarFetchTemplate, calendarFetchTemplateWithBday
} from "../../Reducers/templates";

import Table from "../../components/table";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import ShowTemplate from "../../components/ShowTemplate";
import FormTemplate from "../../components/FormTemplate";
import SnackBar from "../../components/SnackBar";
import Spinner from "../../components/Spinners";
import ButtonGroup from "../../components/ButtonGroup";
import ListOfBdays from "../../components/ListOfBdays";

export default function () {
    const dispatch = useDispatch();
    const {payload} = useSelector(state => state.templates.list, shallowEqual);
    const isLoading = useSelector(state => state.templates.list.isLoading, shallowEqual);
    const template = useSelector(state => state.templates.template, shallowEqual);
    const templateWithBday = useSelector(state => state.templates.templateWithBday, shallowEqual);

    const [showSimpleModal, setShowSimpleModal] = useState(false);//уточняющая модалка
    const [currentId, setCurrentId] = useState(null);//айди template, с которым в данный момент работает пользователь
    const [collapseTableOfTemplates, setCollapseTableOfTemplates] = useState(false);//уточняющая модалка
    const [showModal, setShowModal] = useState(false);//модалка для редактирования шаблона
    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackBarContent, setSnackBarContent] = useState('');
    const [activeButton, setActiveButton] = useState(show);

    let buttonGroup = {
        className: 'div-button-group',
        buttons: [
            {
                className: 'btn-button-group',
                children: show,
                onClick: () => {
                    setActiveButton(show);
                },
                active: (activeButton === show),
                disabled: false,
            },
            {
                className: 'btn-button-group',
                children: edit,
                onClick: () => {
                    setShowModal(true);
                },
                active: (activeButton === edit),
                disabled: false,
            },
            {
                className: 'btn-button-group',
                children: del,
                onClick: () => {
                    setShowSimpleModal(true);
                },
                active: (activeButton === del),
                disabled: false,
            },
            {
                className: 'btn-button-group',
                children: open,
                onClick: () => {
                    setActiveButton(open);
                },
                active: ((activeButton===open)||(activeButton===openTemplateWithBday)),
                disabled: false,
            },
            {
                className: 'btn-button-group btn-close-button-group',
                children: '×',
                onClick: () => {
                    setCollapseTableOfTemplates(false);
                },
                disabled: false,
            },
        ]
    };

    useEffect(() => {
        dispatch(calendarFetchListOfTemplates());
    }, [dispatch]);

    const handleDelete = useCallback((id) => {
        dispatch(calendarDeleteTemplate(id)).then(() => {
            setCurrentId(null);
            setShowSimpleModal(false);
            dispatch(calendarFetchListOfTemplates());
            setCollapseTableOfTemplates(false);
        }).catch(() => {
            //обработать возможные ошибки
        })
    }, []);

    const handleGetTemplate = useCallback((id) => {
        dispatch(calendarFetchTemplate(id));
    }, []);

    const handleGetTemplateWithBday = useCallback((templateId, bdayId) => {
        dispatch(calendarFetchTemplateWithBday(templateId, bdayId)).then(() => {

        }).catch(() => {
            //обработать возможные ошибки
        })
    }, []);

    const handleEditTemplate = useCallback((id, data) => {
        dispatch(calendarEditTemplate(id, data)).then((resp) => {
            //выводим сообщение
            if (resp.ok) {
                setSnackBarContent('Template successfully edit');
            } else {
                setSnackBarContent('Error: ' + resp.statusText);
            }
            setShowSnackBar(true);
            setTimeout(() => setShowSnackBar(false), 3000);

            setCurrentId(null);
            setShowSimpleModal(false);
            dispatch(calendarFetchListOfTemplates());
            setCollapseTableOfTemplates(false);
        }).catch(() => {
            //обработать возможные ошибки
        })
    }, []);

    if (!isLoading) {
        tablePattern.content = [];
        try {
            payload.forEach((item, index) => {
                let action = [<Button key={'ButtonShow' + index} children={'Show'} className={"btnEdit"}
                                      onClick={() => {
                                          setActiveButton(show);
                                          if (!collapseTableOfTemplates) (setCollapseTableOfTemplates(true));
                                          if (currentId === item.id) {
                                              setCollapseTableOfTemplates(!collapseTableOfTemplates);
                                          }

                                          setCurrentId(item.id);
                                          handleGetTemplate(item.id);
                                      }}/>,
                    <Button key={'ButtonDelete' + index} children={'×'} className={"btn-delete-x"}
                            onClick={() => {
                                setCurrentId(item.id);
                                setShowSimpleModal(true);
                            }}/>];

                if (collapseTableOfTemplates) {
                    action = []
                }
                tablePattern.content.push([
                    {
                        name: 'number',
                        className: 'td-sm',
                        children: index + 1,
                        classNameRow: (currentId === item.id) && (collapseTableOfTemplates) ? 'trActive' : '',
                    },
                    {
                        name: 'name',
                        children: item.title,
                        className: 'th-l',
                        onClickRow: () => {
                            setActiveButton(show);
                            if (!collapseTableOfTemplates) {
                                setCollapseTableOfTemplates(true);
                            }
                            if (currentId === item.id) {
                                setCollapseTableOfTemplates(!collapseTableOfTemplates);
                            }
                            handleGetTemplate(item.id);
                            setCurrentId(item.id);

                        }
                    },
                    {
                        name: 'action',
                        className: 'td-action',
                        children: action,
                    },
                ])
            });
        } catch (e) {
        }
    }

    let rightPanel;
    if (collapseTableOfTemplates) {//если наадо показывать правую часть экрана
        let tabContent;
        switch (activeButton) {
            case openTemplateWithBday:
                tabContent = (templateWithBday.isLoading ? <Spinner className='loader2'/> :
                    [<Button key={'buttonBack'} className={'button-go'} children={'<< Back'} onClick={()=>setActiveButton(open)}/>
                    ,<ShowTemplate key={'ShowBack'} payload={templateWithBday.payload}/>]);
                break;
            case open:
                tabContent = (<ListOfBdays onClickGo={(id) => {
                    setActiveButton(openTemplateWithBday);
                    handleGetTemplateWithBday(currentId, id);
                }}/>);
                break;
            case show:
            default: /*получить шаблон и вывести его для просмотра*/
                tabContent = (template.isLoading ? <Spinner className='loader1'/> :
                    <ShowTemplate payload={template.payload}/>);
                break;
        }

        rightPanel = (<div className={'div-panel-right'}>
            <ButtonGroup buttonGroup={buttonGroup}/>
            {tabContent}
        </div>);
    } else {
        rightPanel = '';
    }

    return (
        <div>
            <Modal show={showModal} header={'Edit template'}
                   content={<FormTemplate edit={true} editData={template.payload} onSave=
                       {(data) => {
                           handleEditTemplate(currentId, data);
                           setShowModal(false);
                       }}
                   />} toClose={() => setShowModal(false)}/>

            <Modal show={showSimpleModal} header={'Delete'}
                   content={<>You sure?
                       <Button className={'btn-modal-yes'}
                               children={'No'}
                               onClick={() => setShowSimpleModal(false)}/>
                       <Button className={'btn-modal-yes'} children={'Yes'}
                               onClick={() => handleDelete(currentId)}/>
                   </>}
                   toClose={() => setShowSimpleModal(false)}/>
            <SnackBar show={showSnackBar} content={snackBarContent}/>

            <div className={(collapseTableOfTemplates) ? 'div-panel-left' : ''}><Table
                classNameTable={tablePattern.classNameTable} classNameTableHead={tablePattern.classNameTableHead}
                header={tablePattern.header} content={tablePattern.content}
                isLoading={isLoading}/></div>
            {rightPanel}
        </div>
    );

}

const show = 'Show';
const edit = 'Edit';
const del = 'Delete';
const open = 'Open with Bday';
const openTemplateWithBday = 'openTemplateWithBday';

let tablePattern = {
    classNameTable: 'table-ofTemplates',
    classNameTableHead: '',
    header: [
        {name: 'number', alias: '№', className: 'heading'},
        {name: 'name', alias: 'Name', className: 'heading'},
        {name: 'action', alias: '', className: 'heading'},
    ],
    content: []
};
