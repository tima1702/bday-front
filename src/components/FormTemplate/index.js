import React, {useEffect, useState} from 'react';
import './style.scss'
import Button from "../Button";
import TextArea from "../TextArea";
import Input from "../Input";
import ErrorBlock from "../Error";
import {compareObj} from "../../Utils/objects";


function FormTemplate({editData, onSave, edit}) {//если edit=true - Значит форма открыта для редактирования
    const [data, setData] = useState(editData);
    const [err, setErr] = useState({
        show: false,
        title: '',
        text: '',
        blocks: '',
        attachments: '',
    });
    const [blocks, setBlocks] = useState((JSON.stringify(data.blocks) === '[]') ? '' : JSON.stringify(data.blocks));

    useEffect(() => {

    });

    function clickHelp(e) {
        e.preventDefault();
        window.open('https://api.slack.com/tools/block-kit-builder');
    }

    return (
        <>
            <form className={'formAddTemplate'}>
                <label>Title<ErrorBlock content={err.title}/>
                    <Input
                        placeholder={'Enter template name..'}
                        value={data.title}
                        handleChange={(e) => {
                            setData({...data, title: e.target.value});
                            //setErr(validation({...data, title: e.target.value}, blocks, setData));
                        }}/>
                </label>

                <label>Text<ErrorBlock content={err.text}/>
                    <TextArea
                        placeholder={'Enter text..'}
                        value={data.text}
                        handleChange={(e) => {
                            setData({...data, text: e.target.value});
                            //setErr(validation({...data, text: e.target.value}, blocks, setData));
                        }}/>
                </label><Button onClick={clickHelp} className="btnHelp tooltip">?
                <span
                    className="tooltiptext">open page in new tab - "https://api.slack.com/tools/block-kit-builder"</span></Button>
                <label>Blocks
                    <ErrorBlock content={err.blocks}/> {/*проверять на json*/}
                    <TextArea
                        className={'bigTextarea'}
                        placeholder={'Insert JSON from "SLACK Block Kit Builder"'}
                        value={blocks}
                        handleChange={(e) => {
                            //замена табуляций на два пробела - иначе скопированный с
                            // block kit builder текст расползается и выглядит нечитабельным
                            setBlocks(e.target.value.replace(/\u0009/g, "  "));
                            //setErr(validation(data, e.target.value, setData));

                        }}/>
                </label>
            </form>
            <Button onClick={() => {
                setErr(validation(data, blocks, setData));
                if (!validation(data, blocks, setData).show) {
                    let per = JSON.parse(blocks);
                    onSave({...data, blocks: [].concat(per.blocks)});
                }
            }}
                    disabled={(compareObj(editData, data) && (edit) && (blocks === JSON.stringify(editData.blocks))) ? ('disabled') : ('')}
                    className="btnSave">Save</Button></>
    );
}

export default FormTemplate;

function validation(data, blocks, setData) {
    let err = {
        show: false,
        title: '',
        text: '',
        blocks: '',
        attachments: '',
    };

    err.title = (data.title.length < 1) ? 'the field cannot be empty!' : err.title;
    err.text = (data.text.length < 1) ? 'the field cannot be empty!' : err.text;
    err.blocks = (blocks.length < 1) ? 'the field cannot be empty!' : err.blocks;

    try {
        let per = JSON.parse(blocks);
        if (typeof per['blocks'] === "undefined") {//если поля blocks нет в объекте
            err.blocks = 'JSON format: {"blocks":[{},{},...,{}]}';
        }

        setData({...data, blocks: [].concat(per.blocks)});
    } catch (e) {
        err.blocks = 'JSON error';// + e;
        try {
            setData({...data, blocks: []});
        } catch (e) {

        }
    }

    err.show = Boolean(err.title.length + err.text.length + err.blocks.length + err.attachments.length);
    return err;
}

