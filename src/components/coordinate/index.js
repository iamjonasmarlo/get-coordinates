import React from 'react';
import { FileCopy } from '@material-ui/icons';  
import './coordinate.scss';

function Coordinate(props) {
    function copyData(e) {
        navigator.clipboard.writeText(props.coordinate);
    }
    return (
        <div className="coordinate">
            <div className="coordinate__header">
                {props.title}
            </div>
            <div className="coordinate__data">
                <div className="data" id={props.title}>{props.coordinate}</div>
                <button className="copy" onClick={copyData}><FileCopy /></button>
            </div>
        </div>
    )
}

export default Coordinate;