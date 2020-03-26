import React, {useEffect, useState} from "react";
import Button from "../../components/Button";
import './style.scss';

function Modal({show, toClose, content, header}) {
    const [clickIN, setClickIN] = useState(false);
    const [clickOUT, setClickOUT] = useState(false);

    useEffect(() => {//отлавливаем click вне модалки и закрываем ее
        if ((clickOUT) && (!clickIN)) {
            setClickIN(false);
            setClickOUT(false);
            toClose();
        }
        if (clickOUT) {
            setClickIN(false);
            setClickOUT(false);
        }
    }, [clickOUT, clickIN, toClose],);

    let modal = null;
    if (show) {
        modal = (
            <div id="openModal" className="modal" onClick={() => setClickOUT(true)}>
                <div className="modal-dialog" onClick={() => setClickIN(true)}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{header}</h3>
                            <Button onClick={toClose} className="close">×</Button>
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
