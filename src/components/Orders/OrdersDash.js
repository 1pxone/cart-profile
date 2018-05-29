import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SingleOrderDash from './SingleOrderDash'

class OrderDash extends Component{
    render(){
        var u = this.props.user;
        return (
            <section className="dashBlock col-12 col-lg-6">
                <div className="r-secction__heading">
                    <span className="r-section__subtitle">Заказы</span>
                    {u.orders.length > 1 ?
                        <Link to="/account/orders" className="change__button">Все заказы ></Link>
                        :
                        null
                    }
                </div>
                {u.orders.length === 0 ?
                    <span className="fs-small">У вас еще нет заказов</span>
                    :
                    <SingleOrderDash order={u.orders[0]} />
                }
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        config: state.getConfigSuccess
    };
};

export default connect(mapStateToProps)(OrderDash);
