import React from "react";  
import './Label.css';
class Label extends React.Component {
    render() {
       const Bkstyle = this.props.isActive ? { background: 'green' } : { background: 'gray' };
        return (
            <div className="list-label" style={Bkstyle}>
                <span>{this.props.isActive ? 'Active' : 'Inactive'}</span>
            </div>
        );
    }
}
export default Label;
