import React, {useState} from "react";
import Button from "../../components/Button";
import './style.scss';

function Modal({show, toClose, content, header}) {
    const [clickMouseDown, setClickMouseDown] = useState(false);
    const [mouseOut, setMouseOut] = useState(false);

    window.oncontextmenu = (() => {
        setClickMouseDown(true);
    });

    let modal = null;
    if (show) {
        modal = (
            <div id="openModal" className="modal" onClick={() => {
                if ((mouseOut) && (!clickMouseDown)) {//отлавливаем click вне модалки и закрываем ее
                    toClose();
                }
                setClickMouseDown(false);
            }}>
                <div className="modal-dialog" onMouseDown={() => setClickMouseDown(true)}
                     onMouseOut={() => setMouseOut(true)} onMouseOver={() => setMouseOut(false)}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{header}</h3>
                            <Button onClick={toClose} className="btn-close">×</Button>
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (<>{modal}</>);
}

export default Modal;
