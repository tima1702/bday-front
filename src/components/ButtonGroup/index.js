import React from 'react';
import './style.scss'

function ButtonGroup({buttonGroup}) {

    return (<div className={buttonGroup.className}>
        {buttonGroup.buttons.map((item, i) => (
            <button key={'buttonGroup'+i}
                    className={item.className+(item.active?' btn-group-active-btn':'')}
                    disabled={item.disabled}
            onClick={item.onClick}>{item.children}</button>
        ))}
    </div>);
}

export default ButtonGroup;
//
// const buttonGroupObj = {
//     className: 'btn-group',
//     buttons: [
//         {
//             className: 'button',
//             children: '',
//             onClick: '',
//             disabled: '',
//         },
//     ]
// };
