import React, {} from 'react';
import './style.scss'

function ErrorBlock({content}) {
    return content.length?(
        <div className={'error'}>
            {content}
        </div>
    ):null;
}

export default ErrorBlock;
