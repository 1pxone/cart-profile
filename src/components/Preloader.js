import React, {Component} from 'react';

class Preloader extends Component{
    render(){
        var preloader = '/preloader.svg'
        return (
            <div className={`react-preloader ` + this.props.cls}>
                <img src={preloader} alt=""/>
            </div>
        );
    }
}

export default Preloader;
