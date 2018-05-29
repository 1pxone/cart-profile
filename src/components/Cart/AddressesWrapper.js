import React, {Component} from 'react';
import { connect } from 'react-redux';
import AddressCard from '../Addresses/AddressCard0';
import AddressAdd from '../Addresses/AddressAdd0';
import Modal from '../Modal';
import Preloader from '../Preloader';
import {UnmountClosed} from 'react-collapse';
// import {presets} from 'react-motion';


class AddressesBlock extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            showAddresses: false
        };
        this.toggleHideAddresses = this.toggleHideAddresses.bind(this);
        this.toggleAddresses = this.toggleAddresses.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    };

    toggleAddresses(){
        this.setState(prevState => ({
            showAddresses: !prevState.showAddresses
        }));
    };

    toggleHideAddresses(){
        this.setState(prevState => ({
            showAddresses: false
        }));
    };

    toggleModal(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(this.props.addresses) !== JSON.stringify(nextProps.addresses)){
            this.toggleHideAddresses();
        }
        if(nextProps.addSuccess && this.state.isOpen && !nextProps.isPatching){
            this.toggleModal()
        }
    }

    render(){
        var addressesAll = this.props.addresses;
        var addressesNoExId = addressesAll.filter(a => !('externalId' in a));
        var addressesHasActive = addressesNoExId.filter(a => (a['isActive'] === true));
        var addressesNotActive = addressesNoExId.filter(a => (a['isActive'] === false));
        // var addressesNotActiveBlock =  addressesNotActive.sort((a, b) => { return a.id < b.id;}).map((address, i)=>(<AddressCard address={address} key={i}/>));

        if (this.props.isLoading ) {
            return <Preloader cls="usericon"/>;
        };

        if (this.props.hasErrored ) {
            return (<span>Error!</span>)
        };

        //No addresses
        if(!addressesAll.length){
            return (
                <div className="col-12 col-lg-6 addressesWrapper">
                    <span className="r-section__subtitle">Укажите адрес</span>
                    <AddressAdd />
                </div>
            )
        } else if(addressesAll.length && addressesNoExId.length && addressesHasActive.length === 0){
            return (
                <div className="col-12 col-lg-6 addressesWrapper">
                    <div className="r-secction__heading">
                        <span className="r-section__subtitle">Укажите адрес</span>
                        <span className="change__button" onClick={()=>this.toggleModal()}>Добавить адрес</span>
                    </div>
                    {addressesNoExId.map((address, i)=>(<AddressCard address={address} key={i}/>))}
                    <Modal isOpen={this.state.isOpen} onClose={()=>this.toggleModal()} heading="Добавить адрес">
                        <AddressAdd on="modal" onClose={()=>this.toggleModal()}/>
                    </Modal>
                </div>
            )
        } else if(addressesAll.length && addressesNoExId.length && addressesHasActive.length){
            if(addressesNotActive.length){
                return (
                    <div className="col-12 col-lg-6 addressesWrapper">
                        <div className="r-secction__heading">
                            <span className="r-section__subtitle">Укажите адрес</span>
                            <span className={"change__button " + (this.state.showAddresses ? "change__button--show" : "change__button--hide")} onClick={()=>this.toggleAddresses()}>{this.state.showAddresses ? "Отмена" : "Изменить"}</span>
                        </div>

                        {addressesHasActive.map((address, i)=>(<AddressCard address={address} key={i}/>))}
                        <UnmountClosed isOpened={this.state.showAddresses} springConfig={{stiffness: 300, damping:30}}>
                            {addressesNotActive.map((address, i)=>(<AddressCard address={address} key={i}/>))}
                        </UnmountClosed>
                        {this.state.showAddresses ?
                            <button className="otherAddresses__button" onClick={()=>this.toggleModal()}>Добавить адрес доставки</button>
                            :
                            null
                        }
                        <Modal isOpen={this.state.isOpen} onClose={()=>this.toggleModal()} heading="Добавить адрес">
                            <AddressAdd on="modal" onClose={()=>this.toggleModal()}/>
                        </Modal>
                    </div>
                )
            } else {
                return (
                    <div className="col-12 col-lg-6 addressesWrapper" >
                        <div className="r-secction__heading">
                            <span className="r-section__subtitle">Укажите адрес</span>
                            <span className="change__button" onClick={()=>this.toggleModal()}>Добавить адрес</span>
                        </div>
                        {addressesHasActive.map((address, i)=>(<AddressCard address={address} key={i}/>))}
                        <Modal isOpen={this.state.isOpen} onClose={()=>this.toggleModal()} heading="Добавить адрес">
                            <AddressAdd on="modal" onClose={()=>this.toggleModal()}/>
                        </Modal>
                    </div>
                )
            }
        } else {
            return null
        }
    };
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.addressesIsLoading,
        deliveryisLoading: state.deliveryMethodsIsLoading,
        isPatching: state.addressesIsUpdating,
        deliveryMethods: state.deliveryMethods,
        addresses: state.addresses,
        hasErrored: state.addressesHasErrored,
        addSuccess: state.addressesAddSuccess,
        cartIsUpdating: state.cartIsUpdating
    };
};

export default connect(mapStateToProps, null)(AddressesBlock);
