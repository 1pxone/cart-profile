import React, {Component} from 'react';


class Heading extends Component{
    render(){
        switch (window.location.pathname) {
            case "/cart":
                return (<span className="r-view-heading">Корзина</span>)
            case "/cart/auth":
                return (<span className="r-view-heading">Авторизация</span>)
            case "/cart/purchase":
                return (<span className="r-view-heading">Оформление заказа</span>)
            case "/cart/success":
                return (<span className="r-view-heading">Заказ создан</span>)
            default:
                return null;

        }
    }
}

export default Heading;
