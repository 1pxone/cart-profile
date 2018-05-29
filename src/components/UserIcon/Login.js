import React, {Component} from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/user';
import { push } from 'react-router-redux';

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
        var errorblock = this.props.errors.map((error,index) => (
            <small className="text-danger" key={index}><span aria-hidden="true">&times;</span> {error}</small>
        ));

        return (
            <form onSubmit={(e)=>this.signIn(e)} className={"login__form--dropdown " + (this.props.loginRequest ? "isPatching": "")}>
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
                            <a href="/account/restore" className="r-btn-secondary display-block">Восстановить пароль</a>
                        </div>
                    </label>
                </div>
                {errorblock}
                <div className="r-input__controls">
                    <button type="submit" className={"r-btn-default w-full " + (this.props.loginRequest ? "isPatching": "")} disabled={this.props.loginRequest ? 'disabled': '' }>Войти</button>
                </div>
                <div className="auth__toggle">
                    <a href="/account/register" className="r-btn-secondary w-full fs-small display-block">Зарегистрировать новый аккаунт</a>
                </div>
            </form>
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
        login: (username, password) => dispatch(login(username, password)),
        goTo: (path) => dispatch(push(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
