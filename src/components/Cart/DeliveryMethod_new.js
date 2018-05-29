import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectDelivery } from '../../actions/cart_new';
import Modal from '../Modal';

class DeliveryMethod extends Component{
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
            if(this.props.summary && Object.keys(this.props.summary).length && this.props.summary.delivery && this.props.summary.delivery.id !== id){
                this.props.selectDelivery(id)
            } else if(this.props.summary && Object.keys(this.props.summary).length && this.props.summary.delivery && this.props.summary.delivery.id === id) {
                //
            } else {
                this.props.selectDelivery(id)
            };
        } else if (!this.wrapperRef && !this.state.isOpen) {
            if(this.props.summary && Object.keys(this.props.summary).length && this.props.summary.delivery && this.props.summary.delivery.id !== id){
                this.props.selectDelivery(id)
            } else if(this.props.summary && Object.keys(this.props.summary).length && this.props.summary.delivery && this.props.summary.delivery.id === id) {
                //
            } else {
                this.props.selectDelivery(id)
            };
        }
    };

    toggleModal(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    render(){
        var checkSummary = this.props.summary && Object.keys(this.props.summary).length && this.props.summary.delivery;
        var {id, title, description, fullDescription, cost} = this.props.method;
        return (
            <React.Fragment>
                <label htmlFor={"delivery_"+id} className={"rcard-wrapper rcard__label " + (this.props.isPatching ? "rcard__patching" : "")  + (checkSummary && this.props.summary.delivery.id === id  ? " active" : " uncative")}>
                    <div className="rcard-inner">
                        <div className="rcard-content">
                            <span className="rcard__title">{title}</span>
                            <span className="rcard__price">{cost === 0 ? "Бесплатно" : cost + " ₽"}</span>
                            <span className="rcard__decription" dangerouslySetInnerHTML={{__html: description }}/>
                            {fullDescription && fullDescription !== "" ?
                                <span onClick={(e)=>this.toggleModal(e)} className="rcard__more" ref={this.setWrapperRef}>Подробнее об этом способе доставки</span>
                                :
                                null
                            }
                        </div>
                        <div className="rcard-toggle">
                            <input id={"delivery_"+id} name="delivery_method" type="radio" checked={checkSummary && this.props.summary.delivery.id === id ? true : false}  onChange={(e) => this.selectThis(e,id)}/>
                            <label htmlFor={"delivery_"+id} className="rcard-toggle__label"></label>
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
        isPatching: state.deliveryMethodsIsUpdating,
        summary: state.cartSummary
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectDelivery: (id) => dispatch(selectDelivery(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryMethod);
