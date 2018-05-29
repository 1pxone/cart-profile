import React, {Component} from 'react';

class Alert extends Component{
    render(){
        return (
            <div className={`alert ` + this.props.alertType} role="alert">
                {this.props.alertMsg}   
            </div>
        );
    }
}

export default Alert;
