import React, {Component} from 'react';
import { connect } from 'react-redux';
import AccountWrapper from '../AccountWrapper';

class Subscribe extends Component{
    render(){
        var u = this.props.user;
        return (
            <AccountWrapper>
                <section className="dashBlock">
                    <div className="r-secction__heading">
                        <span className="r-section__subtitle">Подписка на новости</span>
                    </div>
                    {u.isSubscriber ?
                        <span>Вы подписаны на получение новостей.</span>
                        :
                        <span>В настоящее время вы не подписаны на получение каких-либо новостей.</span>
                    }
                </section>
            </AccountWrapper>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        hasErrored: state.userHasErrored,
        isLoading: state.userIsLoading
    }
};

export default connect(mapStateToProps)(Subscribe);
