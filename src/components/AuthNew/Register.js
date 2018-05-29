import React, {Component} from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/user';
import InputMask from 'react-input-mask';
import { push } from 'react-router-redux';
import AuthWrap from './AuthWrap';
import {withRouter} from 'react-router-dom';


class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
          form:{
            "fos_user_registration_form[firstName]": "",
            "fos_user_registration_form[surname]": "",
            "fos_user_registration_form[email]": "",
            "fos_user_registration_form[plainPassword][first]": "",
            "fos_user_registration_form[plainPassword][second]": "",
            "fos_user_registration_form[phone]": "",
            "fos_user_registration_form[isSubscriber]": true
        },
        phonecode:[
            {
                mask: "+7 (999) 999-99-99",
                placeholder: "(___) ___-__-__"
            },
            {
                mask: "+7 (999) 999-99-99",
                placeholder: "(___) ___-__-__"
            },
            {
                mask: "+375 (99) 999-99-99",
                placeholder: "(__) ___-__-__"
            }
        ],
        current: 0
      }
    }

    onChange = (e) => {
        const form = this.state.form;
        form[e.target.name] = e.target.value;
        this.setState({...this.state, form});
    }

    selectPhoneCode = (e) => {
        var current = this.state.current;
        var form = this.state.form;
        current = e.target.value;
        form['fos_user_registration_form[phone]'] = '';
        this.setState({...this.state, current, form });
    }

    register = (e) => {
        e.preventDefault();
        this.props.register(this.state.form);
    }

    render(){

        var onCart;
        if(this.props.match.path.substring(1).split('/')[0] === "cart"){
            onCart = true;
        } else {
            onCart = false
        }

        var errorblock = this.props.errors.map((error,index) => (
            <p><small className="text-danger" key={index}><span aria-hidden="true">&times;</span> {error}</small></p>
        ));

        return (
            <AuthWrap>
                <div className="col-12 col-lg-6">
                    <form onSubmit={(e)=>this.register(e)} className={"registration__form " + (this.props.registerRequest ? "isPatching": "")}>
                        <span className="r-section__title">Регистрация учетной записи</span>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="r-input__wrapper">
                                    <label className="r-input__label"><span>Ваше имя *</span>
                                    <input autoComplete='given-name' disabled={this.props.registerRequest ? 'disabled':''} type="text" className="r-input__text" required name="fos_user_registration_form[firstName]" onChange={this.onChange}/>
                                    </label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="r-input__wrapper">
                                    <label className="r-input__label"><span>Ваша фамилия *</span>
                                    <input autoComplete='family-name' disabled={this.props.registerRequest ? 'disabled':''} type="text" className="r-input__text" required name="fos_user_registration_form[surname]" onChange={this.onChange}/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="r-input__wrapper">
                                    <label className="r-input__label"><span>E-mail *</span>
                                    <input disabled={this.props.registerRequest ? 'disabled':''} type="email" className="r-input__text" required name="fos_user_registration_form[email]" autoComplete="email" onChange={this.onChange} />
                                    </label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="r-input__wrapper">
                                    <label className="r-input__label">
                                        <span>Телефон *</span>
                                        <div className="r-input-group">
                                        <select className="r-input__select r-input__select--group" onChange={this.selectPhoneCode} value={this.state.current}>
                                            <option value="0">RU</option>
                                            <option value="1">KZ</option>
                                            <option value="2">BY</option>
                                         </select>
                                         <InputMask disabled={this.props.registerRequest ? 'disabled':''} mask={this.state.phonecode[this.state.current].mask} className="r-input__text r-input__text--group" type="tel" placeholder={this.state.phonecode[this.state.current].placeholder} required name="fos_user_registration_form[phone]" autoComplete='tel-national' onChange={this.onChange} value={this.state.form.phone} maskChar={" "} alwaysShowMask={true}/>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="r-input__wrapper">
                                    <label className="r-input__label"><span>Пароль *</span>
                                    <input autoComplete="current-password" disabled={this.props.registerRequest ? 'disabled':''} type="password" className="r-input__text" required name="fos_user_registration_form[plainPassword][first]"onChange={this.onChange}/>
                                    </label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="r-input__wrapper">
                                    <label className="r-input__label"><span>Повторите пароль *</span>
                                    <input autoComplete="current-password" disabled={this.props.registerRequest ? 'disabled':''} type="password" className="r-input__text" required name="fos_user_registration_form[plainPassword][second]" onChange={this.onChange}/>
                                    </label>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="r-input__wrapper">
                                    <label className="r-input__label"><input type="checkbox" className="r-input__check" name="fos_user_registration_form[isSubscriber]" onChange={this.onChange} defaultChecked={this.state.form['fos_user_registration_form[isSubscriber]']?  'checked' : ''}/> <span>Подписаться на получение информационных рассылок и промо-акций</span></label>
                                </div>
                            </div>
                        </div>
                        {errorblock}
                        <div className="r-input__controls">
                            {onCart ?
                                <button type="submit" className={"r-btn-default w-full " + (this.props.registerRequest ? "isPatching": "")} disabled={this.props.registerRequest ? 'disabled': '' }>Созадать учетную запись и продолжить</button>
                                :
                                <button type="submit" className={"r-btn-default w-full " + (this.props.registerRequest ? "isPatching": "")} disabled={this.props.registerRequest ? 'disabled': '' }>Созадать учетную запись</button>
                            }
                        </div>
                        <div className="auth__toggle">
                            {onCart ?
                                <button type="button" className={"r-btn-secondary w-full fs-small " + (this.props.registerRequest ? "isPatching": "")} disabled={this.props.registerRequest ? 'disabled': '' } onClick={()=>this.props.goTo("/cart/login")}>Использовать существующий аккаунт</button>
                                :
                                <button type="button" className={"r-btn-secondary w-full fs-small " + (this.props.registerRequest ? "isPatching": "")} disabled={this.props.registerRequest ? 'disabled': '' } onClick={()=>this.props.goTo("/account/login")}>Использовать существующий аккаунт</button>
                            }
                        </div>
                        <span className="privacy-policy--text">Осуществляя регистрацию на этом сайте, вы подтверждаете свою дееспособность, согласие на получение информации о статусе заказов и новостей и {this.props.config.privacyPolicyLink ? <a href={this.props.config.privacyPolicyLink} target="_blank">согласие на предоставление и обработку ваших персональных данных.</a> : null}</span>
                    </form>
                </div>
            </AuthWrap>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        registerRequest: state.userRegisterRequest,
        errors: state.userRegisterErrors,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (form) => dispatch(register(form)),
        goTo: (path) => dispatch(push(path))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
