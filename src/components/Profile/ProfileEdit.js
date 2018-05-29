import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateUserData } from '../../actions/user';
import InputMask from 'react-input-mask';

class ProfileEdit extends Component{
    constructor(props) {
      super(props);
      this.state = {
          form:{
              "firstname": props.user.firstname,
              "surname": props.user.surname,
              "birthday": props.user.birthday,
              "gender": props.user.gender,
              "phone": props.user.phone
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
       this.formatDate = this.formatDate.bind(this);
    }

    onChange = (e) => {
      const form = this.state.form;
      form[e.target.name] = e.target.value;
      if(e.target.name === "birthday"){
           form[e.target.name] =this.formatDate(e.target.value);
      } else {
         form[e.target.name] = e.target.value;
      }
      this.setState({...this.state, form});
    }

    selectPhoneCode = (e) => {
        var current = this.state.current;
        current = e.target.value;
        this.setState({...this.state, current});
    }

    updateUser(e){
        e.preventDefault();
        const form = this.state.form;
        form.birthday = this.formatDate(form.birthday);
        this.props.updateUserData(form);
    }

    formatDate(date){
        var parts = date.split(".");
        return `${parts[2]}-${parts[1]}-${parts[0]}`
    }

    render(){
        var errorblock = this.props.errors.map((error,index) => (
            <p><small className="text-danger" key={index}><span aria-hidden="true">&times;</span> {error}</small></p>
        ));

        return(
            <form onSubmit={(e)=>this.updateUser(e)} className={"changePass-form " + (this.props.isPatching ? "isPatching": "")}>
                <div className="r-input__wrapper">
                    <label className="r-input__label"><span>Имя *</span>
                        <input type="text" className="r-input__text" required name="firstname" onChange={this.onChange} defaultValue={this.state.form.firstname} />
                    </label>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label"><span>Фамилия *</span>
                        <input type="text" className="r-input__text" required name="surname" onChange={this.onChange} defaultValue={this.state.form.surname} />
                    </label>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label"><span>Дата рождения *</span>
                        <input type="date" className="r-input__text" name="birthday" onChange={this.onChange} defaultValue={this.formatDate(this.state.form.birthday)} />
                    </label>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label">
                        <span>Пол *</span>
                        <select className="r-input__select" name="gender" onChange={this.onChange} defaultValue={this.state.form.gender}>
                            <option value="" disabled selected>Не указан</option>
                            <option value="Male">Мужской</option>
                            <option value="Female">Женский</option>
                         </select>
                    </label>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label">
                        <span>Телефон *</span>
                        <div className="r-input-group">
                        <select className="r-input__select r-input__select--group" onChange={this.selectPhoneCode} value={this.state.current}>
                            <option value="0">RU</option>
                            <option value="1">KZ</option>
                            <option value="2">BY</option>
                         </select>
                         <InputMask disabled={this.props.registerRequest ? 'disabled':''} mask={this.state.phonecode[this.state.current].mask} className="r-input__text r-input__text--group" type="tel" placeholder={this.state.phonecode[this.state.current].placeholder} required name="fos_user_registration_form[phone]" autoComplete='tel-national' onChange={this.onChange} defaultValue={this.state.form.phone} maskChar={" "} alwaysShowMask={true}/>
                        </div>
                    </label>
                </div>
                {errorblock}
                <div className="r-input__controls">
                    <button type="button" className={"r-input-alternative"} onClick={this.props.onClose}>Отмена</button>
                    <button type="submit" className={"r-input-submit " + (this.props.isPatching ? "isPatching": "")}>Сохранить</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        errors: state.userChangePassErrors,
        isPatching: state.userIsUpdating,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserData: (form) => dispatch(updateUserData(form))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
