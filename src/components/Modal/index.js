import React, {} from "react";
import Button from "../../components/Button";
import './style.scss';

function Modal({show, toClose, content,header}) {
    let modal = null;
    if (show) {
        modal = (
            <div id="openModal" className="modal">
                <div className="modal-dialog">
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
