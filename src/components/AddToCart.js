import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cart_new';
import Modal from './Modal';

class AddToCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            adding: false,
            data: {},
            productdata: {}
        };
        this.collectData = this.collectData.bind(this);
        this.modalShow = this.modalShow.bind(this);
    }

    componentDidMount(){
        if(this.props.sku){
            var productdata = window.productdata.filter(product => product.sku === this.props.sku);
            if(productdata.length && productdata[0]){
                this.setState({
                    productdata: productdata[0]
                })
            } else {
                console.warn(`No 'window.productdata' for  ${this.props.sku} initialized!`);
            }
        } else {
            console.warn("No 'data-sku' passed to this button's attributes");
        }
    }

    collectData(data){
        var output = {
            qty: data.qty,
            metadata: {
                title: data.title,
                image: data.image,
                link: data.link
            }
        };

        this.setState({data: output})
        return output;
    }

    modalShow(){
        this.setState({isOpen: true, adding: true});
    }

    modalHide(){
        this.setState({isOpen: false, adding: false});
    }

    addToCart(){
        this.setState({adding: true});
        var cartqty;
        var qty = this.props.cart.filter(item => item.sku ===this.props.sku)
        if(qty[0]){
            cartqty = qty[0].count
        } else {
            cartqty = 0
        }
        var data={};
        var productdata = this.state.productdata;
        if(typeof productdata !== 'undefined'){
        	if(!productdata.qty){
            	console.warn("No 'window.productdata.qty' initialized!");
            } else if (!cartqty && productdata.qty){
            	data.qty = productdata.qty;
            } else if (cartqty && productdata.qty){
            	data.qty = cartqty + productdata.qty;
            } else {
            	console.warn("No 'window.productdata.qty' initialized!");
            };
            productdata.sku ? data.sku = productdata.sku : console.warn("No 'window.productdata.sku' initialized!");
            productdata.title ? data.title = productdata.title : console.warn("No 'window.productdata.title' initialized!");
            productdata.image ? data.image = productdata.image : console.warn("No 'window.productdata.image' initialized!");
            productdata.link ? data.link = productdata.link : console.warn("No 'window.productdata.link' initialized!");
        } else {
        	console.warn("No 'window.productdata' initialized!");
        };
        data.sku && data.qty ? this.props.addToCart(this.collectData(data), productdata.sku) : console.error("Nothing to add to cart, check warnings in console")

    }

    componentWillReceiveProps(nextProps) {
        if(this.state.adding && nextProps.addSuccess){
            this.modalShow();
        }
    }

    render(){
        return (Object.keys(this.state.productdata).length ?
            <React.Fragment>
                <div className={"addToCart__wrapper " + (this.props.isPatching ? "addToCart__wrapper--isPatching" : "")}>
                    <button className={"addToCart__button " + (this.props.isPatching ? "addToCart__button--isPatching" : "")} onClick={()=>this.addToCart()}><span>{this.state.productdata.btntext ? this.state.productdata.btntext : "Добавить в корзину"}</span> <i className="addToCart__button__icon"></i></button>
                </div>
                <Modal isOpen={this.state.isOpen} onClose={()=>this.modalHide()} heading={`Товар ${this.state.productdata.title} успешно добавлен в корзину!`}>
                    {this.state.productdata.image ? <img src={this.state.productdata.image} className="img--adaptive" alt={this.state.productdata.image}/> : null}

                    <div className="addToCart__modalControls">
                        <button onClick={()=>this.modalHide()} type="button" className="r-btn-secondary fs-small">Продолжить покупки</button>
                        <a href="/cart" className="r-btn-default">Перейти корзину</a>
                    </div>
                </Modal>
            </React.Fragment>
            :
            <div className="addToCart__wrapper">
                <button className="addToCart__button">Error!</button>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartItems,
        isPatching: state.addingToCart,
        addSuccess: state.addToCartSuccess,
        addError: state.addToCartHasErrored
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (data,sku) => dispatch(addToCart(data,sku))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
