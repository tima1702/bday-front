import React, {} from 'react';
import './style.scss'

function ErrorBlock({content}) {
    return content.length?(
        <div className={'div-error'}>
            {content}
        </div>
    ):null;
}

export default ErrorBlock;
