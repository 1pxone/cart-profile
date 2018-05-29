import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addressDelete, selectAddress  } from '../../actions/addresses_new';
// import { selectAddress } from '../../actions/cart_new';
import AddressAdd from './AddressAdd0';
import Modal from '../Modal';

class AddressCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    };

    setWrapperRef(node) {
        this.wrapperRef = node;
    };

    selectThis(e,id){
        if (this.wrapperRef && !this.wrapperRef.contains(e.target) && !this.state.isOpen) {
            if(this.props.summary && Object.keys(this.props.summary).length && this.props.summary.address && this.props.summary.address.id !== id){
                this.props.selectAddress(id)
            } else if(this.props.summary && Object.keys(this.props.summary).length && this.props.summary.address && this.props.summary.address.id === id) {
                //
            } else {
                this.props.selectAddress(id)
            };
        };
    };

    toggleModal(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    componentWillReceiveProps(nextProps){
        if(!nextProps.isPatching && this.state.isOpen){
            this.toggleModal()
        }
    }

    render(){
        // var checkSummary = this.props.summary && Object.keys(this.props.summary).length && this.props.summary.address;
        var {id, additionalInfo, address, postcode, city, country, isActive} = this.props.address;
        return (
            <React.Fragment>
                <div className={"rcard-wrapper rcard__label " + (this.props.isPatching ? "rcard__patching" : "") + (isActive  ? " active" : " uncative")} onClick={(e) => this.selectThis(e,id)}>
                    <div className="rcard-inner">
                        <div className="rcard-content">
                            <span className="rcard__decription">{city}, {country}, {postcode}, {address}</span>
                            <span className="rcard__decription">{additionalInfo}</span>
                            <span onClick={()=>this.toggleModal()} className="rcard__more" ref={this.setWrapperRef}>Редактировать</span>
                        </div>
                        <div className="rcard-toggle">
                            <input id={"address_"+id} name="isActive" type="radio" checked={isActive ? true : false} onChange={(e) => this.selectThis(e,id)}/>
                            <label htmlFor={"address_"+id} className="rcard-toggle__label"></label>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isOpen} onClose={()=>this.toggleModal()} heading="Изменить адрес">
                    <AddressAdd curaddress={this.props.address} on="modal" onClose={()=>this.toggleModal()}/>
                </Modal>
            </React.Fragment>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.addressesIsLoading,
        isPatching: state.addressesIsUpdating,
        addresses: state.addresses,
        summary: state.cartSummary
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteAddress: (id) => dispatch(addressDelete(id)),
        selectAddress: (id) => dispatch(selectAddress(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressCard);
