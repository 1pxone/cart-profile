import React, {Component} from 'react';
import { connect } from 'react-redux';
import SingleOrderDash from './SingleOrderDash';
import AccountWrapper from '../AccountWrapper';

class Orders extends Component{
    render(){
        var u = this.props.user;
        return (
            <AccountWrapper>
                <section className="dashBlock">
                    <div className="r-secction__heading">
                        <span className="r-section__subtitle">Заказы</span>
                    </div>
                    {u.orders.length === 0 ?
                        <span className="fs-small">У вас еще нет заказов</span>
                        :
                        u.orders.map((order, i)=>(
                            <SingleOrderDash order={order} key={i}/>
                        ))
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

export default connect(mapStateToProps)(Orders);
