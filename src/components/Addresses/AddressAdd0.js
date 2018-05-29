import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addressAdd, addressPatch, addressDelete } from '../../actions/addresses_new';
import { fetchDeliveryMethodsPassive } from '../../actions/cart_new';

class AddressAdd extends Component {
    constructor(props) {
        super(props);
            this.state = {
              form:{
                  isActive:  this.props.curaddress ? this.props.curaddress.isActive : true,
                  country:  this.props.curaddress ? this.props.curaddress.country : "Россия",
                  city: this.props.curaddress ? this.props.curaddress.city : "",
                  address:  this.props.curaddress ? this.props.curaddress.address : "",
                  postcode:  this.props.curaddress ? this.props.curaddress.postcode : "",
                  additionalInfo:  this.props.curaddress ? this.props.curaddress.additionalInfo : ""
            },
            addressId: this.props.curaddress ? this.props.curaddress.id : ''
        };
    };

    onChange = (e) => {
        const form = this.state.form;
        if(e.target.name === "isActive"){
            form[e.target.name] = !form.isActive
        } else {
            form[e.target.name] = e.target.value
        }
        this.setState({...this.state, form});
    };

    save(e){
        e.preventDefault();
        var form = this.state.form;
        if(this.props.isAuth){
            if(this.props.curaddress){
                this.props.patchAddress(this.state.addressId, form);
            } else {
                this.props.addNewAddress(form);
            };
        } else {
            var params = `?address[country]=${form.country}&address[city]=${form.city}&address[address]=${form.address}&address[postcode]=${form.postcode}`
            this.props.fetchDeliveryMethodsPassive(params)
        }
    };

    deleteAddress(e){
        e.preventDefault();
        this.props.deleteAddress(this.state.addressId)
    }

    render(){
        return (
            <form onSubmit={(e) => this.save(e)} className={"address-form " + (this.props.isAdding || this.props.isPatching ? "isPatching": "")}>
                <div className="display-flex">
                    <div className="r-input__wrapper r-input__wrapper--half">
                        <label className="r-input__label"><span>Страна *</span>
                            <select autoComplete='country-name'  className="r-input__select" required name="country" onChange={this.onChange} defaultValue={this.state.form.country}  >
                                <option value="Россия">Россия</option>
                                <option value="Беларусь">Беларусь</option>
                                <option value="Казахстан">Казахстан</option>
                            </select>
                        </label>
                    </div>
                    <div className="r-input__wrapper r-input__wrapper--half">
                        <label className="r-input__label"><span>Почтовый индекс *</span>
                            <input autoComplete='postal-code' type="text" className="r-input__text" required name="postcode" onChange={this.onChange} defaultValue={this.state.form.postcode}/>
                        </label>
                    </div>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label"><span>Город *</span>
                        <input autoComplete='on' type="text" className="r-input__text" required name="city" onChange={this.onChange} defaultValue={this.state.form.city}/>
                    </label>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label"><span>Адрес *</span>
                        <input autoComplete='street-address' type="text" className="r-input__text" required name="address" onChange={this.onChange} defaultValue={this.state.form.address}/>
                    </label>
                </div>

                <div className="r-input__wrapper">
                    <label className="r-input__label"><span>Дополнительная информация</span>
                        <textarea className="r-input__area" name="additionalInfo" onChange={this.onChange} defaultValue={this.state.form.additionalInfo}/>
                    </label>
                </div>
                <div className="r-input__wrapper">
                    <label className="r-input__label"><input type="checkbox" className="r-input__check" name="isActive" onChange={this.onChange} defaultChecked={this.props.curaddress && this.props.curaddress.isActive ?  'checked' : this.state.form.isActive}/> <span>Использовать этот адрес по умолчанию</span></label>
                </div>
                <div className="r-input__controls">
                    {this.state.addressId && this.props.on === "modal" ? <button type="button" className={"r-input-alternative " + (this.props.isAdding || this.props.isPatching ? "isPatching": "")} onClick={(e) => this.deleteAddress(e)}>Удалить</button> : null}
                    {this.props.on === "modal" && !this.state.addressId ? <button type="button" className={"r-input-alternative"} onClick={this.props.onClose}>Отмена</button> : null}
                    <button type="submit" className={"r-input-submit " + (this.props.isAdding || this.props.isPatching ? "isPatching": "")}>Сохранить</button>
                </div>
            </form>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isAdding: state.addressesIsAdding,
        isAuth: state.userIsAuth,
        addError: state.addressesAddHasErrored,
        isPatching: state.addressesIsUpdating,
        addresses: state.addresses
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addNewAddress: (data) => dispatch(addressAdd(data)),
        fetchDeliveryMethodsPassive: (params) => dispatch(fetchDeliveryMethodsPassive(params)),
        patchAddress : (id, data) => dispatch(addressPatch(id, data)),
        deleteAddress: (id) => dispatch(addressDelete(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressAdd);
