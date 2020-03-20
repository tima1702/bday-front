import React, {useState, useEffect} from 'react';
import './style.scss'
//import Spinner from "../Spinners";

function Table({classNameTable, classNameTableHead, header, content, isLoading}) {

    let modifiedContent;
    if (isLoading) {
        modifiedContent = <tr>
            <td colSpan={header.length}>
                {/*<Spinner className='loader1'/>*/}
            </td>
        </tr>;
    } else {
        if (!content.length) {
            modifiedContent = <tr>
                <td colSpan={header.length}>
                    <div>No data</div>
                </td>
            </tr>
        } else {
            modifiedContent = content.map((item, i) => (
                <tr key={'content' + i}>
                    {item.map((itemChild, j) => (
                        <td key={'content' + i + '.' + j} className={itemChild.className}>
                            {itemChild.children}
                        </td>
                    ))}
                </tr>
            ))
        }
    }
    // if (isLoading) return <div>test</div>
    return (<div>
        <table className={classNameTable}>
            <thead className={classNameTableHead}>
            <tr>
                {header.map((item, i) => (
                    <th key={i} className={item.className}>{item.alias}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {modifiedContent}
            </tbody>
        </table>
    </div>);
}

export default Table