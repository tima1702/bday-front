import React from "react";
import './style.scss';

function SnackBar({show, content,}) {
    let snackBar = null;
    if (show) {
        snackBar = (
            <div className={'snackbar'}>{content}</div>
        );
    }
    return (<>{snackBar}</>);
}

export default SnackBar;
