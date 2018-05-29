import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addressesFetchData } from '../../actions/addresses_new';
import  AddressCard from './AddressCard0';
import { Link } from 'react-router-dom';
import Preloader from '../Preloader';
import AddressAdd from './AddressAdd0';
import Modal from '../Modal';


class AddressesDash extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    };


    componentDidMount(){
        this.props.fetchData()
    }

    toggleModal(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    componentWillReceiveProps(nextProps){
        if(!nextProps.isUpdating && this.state.isOpen){
            this.toggleModal()
        }
    }

    render(){
        var addressesAll = this.props.addresses;
        var addressesNoExId = addressesAll.filter(a => !('externalId' in a));

        if(this.props.isLoading){
            return(
                <section className="dashBlock col-12 col-lg-6">
                    <div className="r-secction__heading">
                        <span className="r-section__subtitle">Адреса доставок</span>
                    </div>
                    <Preloader cls="dash"/>
                </section>
            )
        }

        return (
           <section className="dashBlock col-12 col-lg-6">
                <div className="r-secction__heading">
                    <span className="r-section__subtitle">Адреса доставок</span>
                    {addressesNoExId.length > 2 ?
                        <Link to="/account/addresses" className="change__button">Все адреса ></Link>
                        :
                        null
                    }
                    {addressesNoExId.length === 0 || addressesNoExId.length < 3 ?
                        <React.Fragment>
                            <span className="change__button" onClick={()=>this.toggleModal()}>Добавить адрес</span>
                            <Modal isOpen={this.state.isOpen} onClose={()=>this.toggleModal()} heading="Добавить адрес">
                                <AddressAdd on="modal" onClose={()=>this.toggleModal()}/>
                            </Modal>
                        </React.Fragment>
                        :
                        null
                    }
                </div>
                {addressesNoExId.length === 0 ?
                    <span className="fs-small display-block">У вас еще нет адресов</span>
                    :
                    addressesNoExId.slice(0,2).sort((a, b)=>b.isActive).map((address, i)=>(
                        <AddressCard address={address} key={i}/>
                    ))
                }
            </section>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.addressesIsLoading,
        isUpdating: state.addressesIsUpdating,
        addresses: state.addresses,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(addressesFetchData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressesDash);
