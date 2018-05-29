import React, {Component} from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/user';
import { push } from 'react-router-redux';
import AuthWrap from './AuthWrap';
import {withRouter} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        restore: false,
        logindata:{
          "_username":"",
          "_password":""
        }
      };
    }

    onChangeLogin = (e) => {
      const logindata = this.state.logindata;
      logindata[e.target.name] = e.target.value;
      this.setState({...this.state, logindata});
    }

    signIn = (e) => {
        e.preventDefault();
        this.props.login(this.state.logindata);
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
                    <form onSubmit={(e)=>this.signIn(e)} className={"login__form " + (this.props.loginRequest ? "isPatching": "")}>
                        <span className="r-section__title">Вход в учетную запись</span>
                        <div className="r-input__wrapper">
                            <label className="r-input__label"><span>E-mail *</span>
                                <input disabled={this.props.loginRequest ? 'disabled':''} type="email" className="r-input__text" required name="_username" autoComplete="email" onChange={this.onChangeLogin} />
                            </label>
                        </div>
                        <div className="r-input__wrapper">
                            <label className="r-input__label"><span>Пароль *</span>
                                <input autoComplete="current-password" disabled={this.props.loginRequest ? 'disabled':''} type="password" className="r-input__text" required name="_password" onChange={this.onChangeLogin}/>
                                <div className="r-input__bottom">
                                    {onCart ?
                                        <button type="button" className="r-btn-secondary" onClick={()=>this.props.goTo("/cart/restore")}>Восстановить пароль</button>
                                        :
                                        <button type="button" className="r-btn-secondary" onClick={()=>this.props.goTo("/account/restore")}>Восстановить пароль</button>
                                    }
                                </div>
                            </label>
                        </div>
                        {errorblock}
                        <div className="r-input__controls">
                            {onCart ?
                                <button type="submit" className={"r-btn-default w-full " + (this.props.loginRequest ? "isPatching": "")} disabled={this.props.loginRequest ? 'disabled': '' }>Продолжить</button>
                                :
                                <button type="submit" className={"r-btn-default w-full " + (this.props.loginRequest ? "isPatching": "")} disabled={this.props.loginRequest ? 'disabled': '' }>Войти</button>
                            }
                        </div>
                        <div className="auth__toggle">
                            {onCart ?
                                <button type="button" className={"r-btn-secondary w-full fs-small " + (this.props.loginRequest ? "isPatching": "")} disabled={this.props.loginRequest ? 'disabled': '' } onClick={()=>this.props.goTo("/cart/register")}>Зарегистрировать новый аккаунт</button>
                                :
                                <button type="button" className={"r-btn-secondary w-full fs-small " + (this.props.loginRequest ? "isPatching": "")} disabled={this.props.loginRequest ? 'disabled': '' } onClick={()=>this.props.goTo("/account/register")}>Зарегистрировать новый аккаунт</button>
                            }
                        </div>
                    </form>
                </div>
            </AuthWrap>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loginRequest: state.userLoginRequest,
        errors: state.userLoginErrors,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(login(data)),
        goTo: (path) => dispatch(push(path))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
