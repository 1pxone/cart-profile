import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import UserIcon from './components/UserIcon/';
import CartIcon from './components/Cart/CartIcon';
import AlertList from './components/AlertList';
import ProfileWrapper from './components/ProfileWrapper_new';
import CartWrapper from './components/CartWrapper';
import Heading from './components/Heading';
import { ConnectedRouter } from 'react-router-redux';
import AddToCart from './components/AddToCart';
import './scss/css/scss/index.css';
import { history }  from './store/configureStore';

const store = configureStore();

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    //user icon
    if(document.getElementById('userIcon')){
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <UserIcon />
                </ConnectedRouter>
            </Provider>,
            document.getElementById('userIcon')
        );
    }

    //cart icon
    if(document.getElementById('cartIcon')){
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <CartIcon />
                </ConnectedRouter>
            </Provider>,
            document.getElementById('cartIcon')
        );
    }

    //app heading
    if(document.getElementById('r-app-heading')){
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Heading />
                </ConnectedRouter>
            </Provider>,
            document.getElementById('r-app-heading')
        );
    }

    //add to cart
    if(document.getElementsByClassName('addToCart__button')){
        if (typeof NodeList.prototype.forEach === "undefined") {
            NodeList.prototype.forEach = Array.prototype.forEach;
        }
        if (typeof HTMLCollection.prototype.forEach === "undefined") {
            HTMLCollection.prototype.forEach = Array.prototype.forEach;
        }
        var Nodes = []
        document.getElementsByClassName('addToCart__button').forEach(a => {
            Nodes.push(a);
        });
        Nodes.forEach(a => {
            ReactDOM.render(
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <AddToCart sku={a.dataset.sku}/>
                    </ConnectedRouter>
                </Provider>,
                a
            )
        });
    }

    //notifications block
    if(document.getElementById('alertBlock')){
        ReactDOM.render(
            <Provider store={store}>

                    <AlertList />

            </Provider>,
            document.getElementById('alertBlock')
        );
    }

    //main profile app
    if(document.getElementById('profilePage')){
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>

                        <ProfileWrapper />

                </ConnectedRouter>
            </Provider>,
            document.getElementById('profilePage')
        );
    }

    //main profile app
    if(document.getElementById('cartPage')){
        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>

                        <CartWrapper />

                </ConnectedRouter>
            </Provider>,
            document.getElementById('cartPage')
        );
    }
}
