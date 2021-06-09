import React from 'react';
import './grid.scss';

class Grid extends React.Component {
    render() {
        return (
            <div className="grid-container">
                {this.props.children}
            </div>
        )
    }
}

export default Grid;