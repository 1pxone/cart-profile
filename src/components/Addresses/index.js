import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addressesFetchData } from '../../actions/addresses_new';
import  AddressCard from './AddressCard0';
import Preloader from '../Preloader';
import AccountWrapper from '../AccountWrapper';
import AddressAdd from './AddressAdd0';
import Modal from '../Modal';

class Addresses extends Component{
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
            <AccountWrapper>
               <section className="dashBlock">
                   <div className="r-secction__heading">
                       <span className="r-section__subtitle">Адреса доставок</span>
                       <span className="change__button" onClick={()=>this.toggleModal()}>Добавить адрес</span>
                       <Modal isOpen={this.state.isOpen} onClose={()=>this.toggleModal()} heading="Добавить адрес">
                           <AddressAdd on="modal" onClose={()=>this.toggleModal()}/>
                       </Modal>
                   </div>
                   {addressesNoExId.length === 0 ?
                       <span className="fs-small">У вас еще нет адресов</span>
                       :
                       <div className="row">
                           {addressesNoExId.sort((a, b)=>b.isActive).map((address, i)=>(
                               <div className="col-12 col-lg-6" key={i}><AddressCard address={address} /></div>
                           ))}
                       </div>
                   }
                </section>
            </AccountWrapper>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.addressesIsLoading,
        addresses: state.addresses,
        isUpdating: state.addressesIsUpdating,
        isAuth: state.userIsAuth,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(addressesFetchData(url))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Addresses);
