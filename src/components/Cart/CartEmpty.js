import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CartEmpty extends Component{
    render(){
        return (this.props.isAuth ?
            <div className="row">
                <div className="col-12">
                    <span className="r-section__title">В Вашей корзине пока нет товаров</span>
                    <div className="toHome__wrapper">
                        <a href="/" className="r-btn-default">Перейти в магазин</a>
                    </div>
                </div>
            </div>
            :
            <div className="row">
                <div className="col-12">
                    <span className="r-section__title">В Вашей корзине пока нет товаров</span>
                    <span className="fs-small">Если в корзине были товары – <Link to="/cart/login" className="change__button">войдите</Link> в свою учетную запись, чтобы посмотреть список.</span>
                    <div className="toHome__wrapper">
                        <a href="/" className="r-btn-default">Перейти в магазин</a>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.userIsAuth,
        config: state.getConfigSuccess,
        isPatching: state.cartIsUpdating
    }
};

export default connect(mapStateToProps, null)(CartEmpty);
