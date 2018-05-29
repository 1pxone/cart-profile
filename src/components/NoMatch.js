import React, {Component} from 'react';
import { connect } from 'react-redux';

class NoMatch extends Component{
    render(){
        return (
            <div className={this.props.config.containerClass}>
                <div className="row">
                    <div className="col-12">
                        <span className="r-section__title">По адресу <code className="codeTag">{decodeURIComponent(window.location.pathname)}</code> делать нечего</span>
                        <div className="toHome__wrapper">
                            <a href="/" className="r-btn-default">Перейти в магазин</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        config: state.getConfigSuccess
    }
};

export default connect(mapStateToProps)(NoMatch);
