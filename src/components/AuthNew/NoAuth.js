import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NoAuth extends Component {
    render(){
        return (
            <div className="rcard-wrapper">
                <div className="rcard-inner">
                    <div className="rcard-content">
                        <span className="rcard__decription">Получите преимущества зарегистрированного пользователя после оформления заказа</span>
                        <div className="r-input__controls">
                            <Link to="/cart/purchase" className="r-btn-default w-full">Продолжить без регистрации</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, null)(NoAuth);
