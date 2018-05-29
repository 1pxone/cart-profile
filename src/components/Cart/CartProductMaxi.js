import React, {Component} from 'react';
import { priceFormat } from '../../utils';

class CartProductMaxi extends Component{
    render(){
        var item = this.props.item;
        return (
            <div className="cart-product-maxi__wrapper">
                {item.metadata.image ? <div className="cart-product-maxi__image" style={{backgroundImage: `url(${item.metadata.image})`}}/> : null}
                <div className="cart-product-maxi__title">
                    {this.props.link && item.metadata.link ?
                        <a className="cart-product__link" href={item.metadata.link} target="_blank"><span>{item.metadata.title}</span></a>
                        :
                        <span>{item.metadata.title}</span>
                    }
                    <div className="cart-product-maxi__sku">
                        <span>Артикул: {item.sku}</span>
                    </div>
                </div>
                <span className="cart-product-maxi__qtyprice">{item.count}&times; {priceFormat(item.newprice ? item.newprice : item.price)} ₽</span>
            </div>
        );
    }
}

export default CartProductMaxi;
