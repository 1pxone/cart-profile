import { combineReducers } from 'redux';
import { orderIsPlacing, orderId, ordersHasErrored, orderPaymentIsLoading, orderPaymentSrc } from './orders';
import { addressParams, addressesHasErrored, addressesIsLoading, addresses, addressesIsUpdating, addressesIsAdding, addressesAddSuccess, addressesAddHasErrored, pickUpPointsHasErrored, pickUpPointsIsLoading, pickUpPoints } from './addresses_new';
import { recipientsHasErrored, recipientsIsLoading, recipients, recipientsIsUpdating, recipientsIsAdding, recipientsAddSuccess, recipientsAddHasErrored } from './recipients';
import { getConfigRequest, getConfigSuccess } from './config';
import { user, userHasErrored, userIsAuth, userIsLoading,  userIsUpdating,userLoginRequest,userLoginErrors, userRegisterRequest,
userRegisterErrors, userRestoreRequest, userRestoreErrors, userChangePassRequest, userChangePassErrors, userRestoreSuccess, userLogoutRequest } from './user';
import { routerReducer } from 'react-router-redux';
import { cartIsLoading, cartHasErrored, cartItems, cartIsUpdating, cartSummary,
deliveryMethods, deliveryMethodsIsLoading, deliveryMethodsIsUpdating, deliveryMethodsHasErrored, deliveryType,
paymentMethods, paymentMethodsIsLoading, paymentMethodsIsUpdating, paymentMethodsHasErrored,
promoIsLoading, promo, promoHasErrored,
addingToCart, addToCartSuccess, addToCartHasErrored } from './cart_new';

export default combineReducers({
    orderIsPlacing, orderId, ordersHasErrored, orderPaymentIsLoading, orderPaymentSrc,
    //updated
    cartIsLoading, cartHasErrored, cartItems, cartIsUpdating, cartSummary,
    deliveryMethods, deliveryMethodsIsLoading, deliveryMethodsIsUpdating, deliveryMethodsHasErrored, deliveryType,
    paymentMethods, paymentMethodsIsLoading, paymentMethodsIsUpdating, paymentMethodsHasErrored,
    promoIsLoading, promo, promoHasErrored,
    addingToCart, addToCartSuccess, addToCartHasErrored,
    addressParams, addressesHasErrored, addressesIsLoading, addresses, addressesIsUpdating, addressesIsAdding, addressesAddSuccess, addressesAddHasErrored, pickUpPointsHasErrored, pickUpPointsIsLoading, pickUpPoints,
    recipientsHasErrored, recipientsIsLoading, recipients, recipientsIsUpdating, recipientsIsAdding, recipientsAddSuccess, recipientsAddHasErrored,
    //
    user, userHasErrored, userIsAuth, userIsLoading, userIsUpdating, userLoginRequest, userLoginErrors, userRegisterRequest, userRegisterErrors, userRestoreRequest, userRestoreErrors, userChangePassRequest, userChangePassErrors, userRestoreSuccess, userLogoutRequest,
    getConfigRequest, getConfigSuccess,
    routerReducer
});
