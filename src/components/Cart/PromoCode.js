import React, {Component} from 'react';
import {connect} from "react-redux";
import {submitPromo} from "../../actions/cart_new";

class PromoCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promo: this.props.promo || ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitPromo(this.state.promo)
    }

    handleChange = (event) => {
        this.setState({promo: event.target.value});
    }

    render() {
        return (
            <form className="form-promo" onSubmit={(event) => this.handleSubmit(event)}>
                <div className="r-input-group">
                    <input type="text" className="r-input__text r-input__text--group" required placeholder="Ваш промокод" value={this.state.promo} onChange={this.handleChange} disabled={this.props.isLoading ? 'disabled' : ''}/>
                    <button className={"r-btn-default " + (this.props.isLoading ? 'isPatching' : '')} type="submit" disabled={this.props.isLoading ? 'disabled' : ''}><i className="icon-confirm"></i></button>
                </div>
                {this.props.hasErrored && !this.props.isLoading ? <span className="form-promo__errors">Промокод не действителен</span> : null}
            </form>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        hasErrored: state.promoHasErrored,
        isLoading: state.promoIsLoading,
        promo: state.promo

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitPromo: (promo) => dispatch(submitPromo(promo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PromoCode);
