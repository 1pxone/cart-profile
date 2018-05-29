import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectPayment } from '../../actions/cart_new';
import Modal from '../Modal';

class PaymentMethod extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
    };

    setWrapperRef(node) {
        this.wrapperRef = node;
    };

    selectThis(e,id){
        if (this.wrapperRef && !this.wrapperRef.contains(e.target) && !this.state.isOpen) {
            if(this.props.summary && Object.keys(this.props.summary).length && this.props.summary.payment && this.props.summary.payment.id !== id){
                this.props.selectPayment(id)
            } else if(this.props.summary && Object.keys(this.props.summary).length && this.props.summary.payment && this.props.summary.payment.id === id) {
                //
            } else {
                this.props.selectPayment(id)
            };
        } else if (!this.wrapperRef && !this.state.isOpen) {
            if(this.props.summary && Object.keys(this.props.summary).length && this.props.summary.payment && this.props.summary.payment.id !== id){
                this.props.selectPayment(id)
            } else if(this.props.summary && Object.keys(this.props.summary).length && this.props.summary.payment && this.props.summary.payment.id === id) {
                //
            } else {
                this.props.selectPayment(id)
            };
        }
    };

    toggleModal(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    render(){
        var checkSummary = this.props.summary && Object.keys(this.props.summary).length && this.props.summary.payment;
        var {id, title, description, fullDescription, icon} = this.props.method;
        return (
            <React.Fragment>
                <label htmlFor={"payment_"+id} className={"rcard-wrapper rcard__label " + (this.props.isPatching ? "rcard__patching" : "")  + (checkSummary && this.props.summary.payment.id === id  ? " active" : " uncative")} >
                    <div className="rcard-inner">
                        <div className="rcard-content">
                            <span className="rcard__title">
                                {icon ? <img src={icon} className="rcard-content__image" alt={icon}/> : null}
                                {title}
                            </span>
                            <span className="rcard__decription" dangerouslySetInnerHTML={{__html: description }}/>
                            {fullDescription && fullDescription !== "" ?
                                <span onClick={(e)=>this.toggleModal(e)} className="rcard__more" ref={this.setWrapperRef}>Подробнее об этом способе оплаты</span>
                                :
                                null
                            }
                        </div>
                        <div className="rcard-toggle">
                            <input id={"payment_"+id} name="payment_method" type="radio" checked={checkSummary && this.props.summary.payment.id === id ? true : false}  onChange={(e) => this.selectThis(e,id)}/>
                            <label htmlFor={"payment_"+id} className="rcard-toggle__label"></label>
                        </div>
                    </div>
                </label>
                {fullDescription && fullDescription !== "" ?
                    <Modal isOpen={this.state.isOpen} onClose={(e)=>this.toggleModal(e)} heading={title}>
                        <div className="rcard-content">
                            <span dangerouslySetInnerHTML={{__html: fullDescription}} />
                        </div>
                    </Modal>
                    :
                    null
                }
            </React.Fragment>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isPatching: state.paymentMethodsIsUpdating,
        summary: state.cartSummary
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectPayment: (id) => dispatch(selectPayment(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);
