import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nav from './Nav';

class AccountWrapper extends Component{
    render(){
        return(
            <div className={this.props.config.containerClass}>
                <div className="row">
                    {this.props.isAuth ? <Nav/> : null}
                    <div className="col-12 col-md-9">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.userIsAuth,
        config: state.getConfigSuccess
    }
};

export default connect(mapStateToProps, null)(AccountWrapper);
