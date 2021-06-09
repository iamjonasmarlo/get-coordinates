import React from 'react';
import './column.scss';

class Column extends React.Component {
    render() {
        return (
            <div className={"column column__" + this.props.width}>
                <div className="box">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Column;