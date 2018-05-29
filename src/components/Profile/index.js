import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../../actions/user';
import AccountWrapper from '../AccountWrapper';
import { phoneFormat, genderFormat } from '../../utils/';
import ProfileChangePass from './ProfileChangePass';
import ProfileEdit from './ProfileEdit';
import Modal from '../Modal';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isPassOpen: false,
            isEditOpen: false
        };
        this.togglePassModal = this.togglePassModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    };

    togglePassModal(){
        this.setState(prevState => ({
            isPassOpen: !prevState.isPassOpen
        }))
    };

    toggleModal(){
        this.setState(prevState => ({
            isEditOpen: !prevState.isEditOpen
        }))
    };

    componentWillReceiveProps(nextProps){
        if(!nextProps.isPassUpdating && this.state.isPassOpen && !nextProps.passChangeErrors.length){
            this.togglePassModal()
        }
        if(!nextProps.isUserUpdating && this.state.isEditOpen){
            this.toggleModal()
        }
    }

    render(){
        var u= this.props.user;
        if (this.props.hasErrored) {
            return (<p>Error!</p>);
        }

        if (this.props.isLoading) {
            return (<p>Loading…</p>);
        }
        return(
            <AccountWrapper>
                <section>
                    <div className="r-secction__heading">
                        <span className="r-section__subtitle">Профиль</span>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="rcard-wrapper">
                                <div className="rcard-inner">
                                    <div className="rcard-content w-full">
                                        <span className="profileData__wrapper"><span className="profileData__key">ФИО:</span> <span className="profileData__value">{u.firstname} {u.surname}</span></span>
                                        <span className="profileData__wrapper"><span className="profileData__key">Телефон:</span> <span className="profileData__value">{phoneFormat(u.phone)}</span></span>
                                        <span className="profileData__wrapper"><span className="profileData__key">Email:</span> <span className="profileData__value">{u.email}</span></span>
                                        <span className="profileData__wrapper"><span className="profileData__key">Пол:</span> <span className="profileData__value">{genderFormat(u.gender)}</span></span>
                                        <span className="profileData__wrapper"><span className="profileData__key">Дата рождения:</span> <span className="profileData__value">{u.birthday === "" ? "Не указана" : u.birthday}</span></span>
                                    </div>
                                </div>
                                <div className="rcard-inner">
                                    <span className="change__button" onClick={()=>this.togglePassModal()}>Изменить пароль</span>
                                    <span className="change__button" onClick={()=>this.toggleModal()}>Редактировать</span>
                                    <Modal isOpen={this.state.isPassOpen} onClose={()=>this.togglePassModal()} heading="Изменить пароль">
                                        <ProfileChangePass onClose={()=>this.togglePassModal()}/>
                                    </Modal>
                                    <Modal isOpen={this.state.isEditOpen} onClose={()=>this.toggleModal()} heading="Редактировать">
                                        <ProfileEdit onClose={()=>this.toggleModal()}/>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </AccountWrapper>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        isPassUpdating: state.userChangePassRequest,
        passChangeErrors: state.userChangePassErrors,
        isUserUpdating: state.userIsUpdating,
        isLoading: state.userIsLoading,
        hasErrored: state.userHasErrored,
        config: state.getConfigSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserData: (url) => dispatch(fetchUserData(url))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
