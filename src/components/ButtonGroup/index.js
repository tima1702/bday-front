import React from 'react';
import './style.scss'

function ButtonGroup({buttonGroup}) {

    return (<div className={buttonGroup.className}>
        {buttonGroup.buttons.map((item, i) => (
            <button key={'buttonGroup'+i}
                    className={item.className+(item.active?' btn-active-button-group':'')}
                    disabled={item.disabled}
            onClick={item.onClick}>{item.children}</button>
        ))}
    </div>);
}

export default ButtonGroup;
