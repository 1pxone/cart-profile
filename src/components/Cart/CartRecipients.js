import React, {Component} from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { recipientsPatch, recipientsDelete, recipientsAdd } from '../../actions/recipients';
import Preloader from '../Preloader';
import RecipientsForm from './RecipientsForm';
import { phoneFormat } from '../../utils/';

class CartRecipients extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form:{
                isActive:  this.props.recipient ? this.props.recipient.isActive : true,
                firstName:  this.props.recipient ? this.props.recipient.firstName : "",
                lastName: this.props.recipient ? this.props.recipient.lastName : "",
                phone:  this.props.recipient ? this.props.recipient.phone : ""
            },
            isOpen: false,
            recipientId: this.props.recipient ? this.props.recipient.id : ""
        }
        this.toggleModal = this.toggleModal.bind(this);
    };

    toggleModal(){
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

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
        if(this.props.recipient){
            this.props.recipientsPatch(this.state.recipientId, this.state.form);
        } else {
            this.props.recipientsAdd(this.state.form);
        };
    };

    deleteAddress(e){
        e.preventDefault();
        this.props.recipientsDelete(this.state.recipientId)
    }

    componentWillReceiveProps(nextProps){
        if(this.state.isOpen && !nextProps.recipientsIsUpdating){
            this.toggleModal()
        }
    }

    render(){
        if(this.props.userIsLoading || this.props.recipientsIsLoading){
            return (
                <div className="r-section row">
                    <Preloader cls="usericon"/>
                </div>
            )
        }

        return (
            <div className="row r-subsection">
                <div className="col-12" >
                    <div className="r-secction__heading">
                        <span className="r-section__subtitle">Кто будет получать заказ?</span>
                    </div>
                    {this.props.isAuth ? null : <RecipientsForm recipient={null}/> }
                </div>
                {this.props.recipients.filter(a => (a['isActive'] === true)).map((recipient, i)=>(
                    <div className="recipient__wrapper col-6" key={i}>
                        <span>{recipient.firstName} {recipient.lastName} {phoneFormat(recipient.phone)}</span>
                        <span onClick={()=>this.toggleModal()} className="rcard__more">Изменить</span>
                        <Modal isOpen={this.state.isOpen} onClose={()=>this.toggleModal()} heading="Изменить получателя">
                            <RecipientsForm recipient={recipient} on="modal" onClose={()=>this.toggleModal()}/>
                        </Modal>
                    </div>
                ))}
                {/*{this.props.recipients.filter(a => (a['isActive'] !== true)).map((recipient, i)=>(
                    <div className="recipient__wrapper col-6" key={i}>
                        <span>{recipient.firstName} {recipient.lastName} {phoneFormat(recipient.phone)}</span>
                        <span onClick={()=>this.toggleModal()} className="rcard__more">Изменить</span><span onClick={()=>this.props.recipientsDelete(recipient.id)} className="rcard__more">×</span>
                        <Modal isOpen={this.state.isOpen} onClose={()=>this.toggleModal()} heading="Изменить получателя">
                            <RecipientsForm recipient={recipient} on="modal" onClose={()=>this.toggleModal()}/>
                        </Modal>
                    </div>
                ))}*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userIsLoading: state.userIsLoading,
        recipients: state.recipients,
        recipientsIsLoading: state.recipientsIsLoading,
        recipientsIsUpdating: state.recipientsIsUpdating,
        recipientsIsAdding: state.recipientsIsAdding,
        recipientsAddSuccess: state.recipientsAddSuccess,
        recipientsAddHasErrored: state.recipientsAddHasErrored,
        user: state.user,
        isAuth: state.userIsAuth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        recipientsPatch: (id, data) => dispatch(recipientsPatch(id, data)),
        recipientsDelete: (id) => dispatch(recipientsDelete(id)),
        recipientsAdd: (data) => dispatch(recipientsAdd(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartRecipients);
