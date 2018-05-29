import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SubscribeDash extends Component{
    render(){
        var u = this.props.user;
        return (
            <section className="dashBlock col-12 col-lg-6">

                <div className="r-secction__heading">
                    <span className="r-section__subtitle">Подписка на новости</span>
                </div>
                <div className="rcard-wrapper rcard__label">
                    <div className="rcard-inner">
                        <div className="rcard-content">
                            {u.isSubscriber ?
                                <span className="fs-small">Вы подписаны на получение новостей.</span>
                                :
                                <span className="fs-small">В настоящее время вы не подписаны на получение каких-либо новостей.</span>
                            }
                        </div>
                    </div>
                    <div className="rcard-inner">
                        <Link to="/account/subscribe" className="r-btn-default w-full">Настройки</Link>
                    </div>
                </div>
            </section>
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

export default connect(mapStateToProps)(SubscribeDash);
