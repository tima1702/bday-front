import React, {} from "react";
import './style.scss';
import Button from "../Button";

function ShowTemplate({payload,toClose}) {

    function clickGO(e) {
        e.preventDefault();
        window.open('https://api.slack.com/tools/block-kit-builder?mode=message&blocks='
            + encodeURI(JSON.stringify(payload.blocks)));
    }

    return (<div className={'divShowTemplate'}>
        <Button onClick={toClose} className="close">×</Button>
        <p><b>TITLE:</b></p>
        <blockquote>
            <p>{payload.title}</p>
        </blockquote>
        <p><b>TEXT:</b></p>
        <blockquote>
            <p>{payload.text}</p>
        </blockquote>
        <p><b>BLOCKS:</b> <Button onClick={clickGO} className="btnHelp tooltip">?
            <span className="tooltiptext">View template with Slack Block Kit Builder</span></Button>
        </p>


            <div>{JSON.stringify(payload.blocks)}</div>

    </div>);
}

export default ShowTemplate;
