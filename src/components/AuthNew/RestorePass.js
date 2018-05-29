import React, {Component} from 'react';
import { connect } from 'react-redux';
import { restorePass } from '../../actions/user';
import { push } from 'react-router-redux';
import AuthWrap from './AuthWrap';
import {withRouter} from 'react-router-dom';

class RestorePass extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username:""
      };
    }

    restorePass = (e) => {
        e.preventDefault();
        this.props.restorePass(this.state);

    }

    onChangeRestore = (e) => {
      const restoredata = e.target.value;
      this.setState({username: restoredata});
    }

    render(){

        var onCart;
        if(this.props.match.path.substring(1).split('/')[0] === "cart"){
            onCart = true;
        } else {
            onCart = false
        }

        var errorblock = this.props.errors.map((error,index) => (
            <small className="text-danger" key={index}><span aria-hidden="true">&times;</span> {error}</small>
        ));

        return (
            <AuthWrap>
                <div className="col-12 col-md-6 col-lg-3">
                    <form onSubmit={(e) => this.restorePass(e)} className={"restore__form " + (this.props.restoreRequest ? "isPatching": "")}>
                        <span className="r-section__title">Восстановление пароля</span>
                        <div className="r-input__wrapper">
                            <label className="r-input__label"><span>E-mail *</span>
                                <input disabled={this.props.restoreRequest ? 'disabled':''} type="email" className="r-input__text" required name="username" autoComplete="email" onChange={this.onChangeRestore}/>
                            </label>
                        </div>
                        {errorblock}
                        {this.props.success ? <span className="restore--success">Ссылка на восстановление пароля отправлена на указанный E-mail <a href={'http://' + this.state.username.split("@")[1]}>{this.state.username.split("@")[1]}</a></span> : null}
                        <div className="r-input__controls">
                            {onCart ?
                                <button type="button" className={"r-btn-secondary fs-small "  + (this.props.restoreRequest ? "isPatching": "")}  onClick={()=>this.props.goTo("/cart/login")}>Отмена</button>
                                :
                                <button type="button" className={"r-btn-secondary fs-small "  + (this.props.restoreRequest ? "isPatching": "")}  onClick={()=>this.props.goTo("/account/login")}>Отмена</button>
                            }
                            <button disabled={this.props.restoreRequest ? 'disabled':''} type="submit" className={"r-btn-default "  + (this.props.restoreRequest ? "isPatching": "")}>Отправить</button>
                        </div>
                    </form>
                </div>
            </AuthWrap>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        restoreRequest: state.userRestoreRequest,
        success: state.userRestoreSuccess,
        errors: state.userRestoreErrors,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        restorePass: (email) => dispatch(restorePass(email)),
        goTo: (path) => dispatch(push(path))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestorePass));
