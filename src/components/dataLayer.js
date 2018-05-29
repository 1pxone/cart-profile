export default function (cart, step) {
    window.dataLayer = window.dataLayer || [];

    const products = cart.items.reduce((memo, position) => {
        memo.push({
            name: position.metadata.title,
            id: position.sku,
            price: 'newprice' in position ? position.newprice : position.price,
            quantity: position.count,
            brand: 'brand' in position ? position.brand : ''
        });
        return memo
    }, []);

    let revenue = products.reduce((memo, product) => {
        return memo += product.quantity * product.price
    }, 0);

    if (step === 4) {
        window.dataLayer.push({
            'ecommerce': {
                'currencyCode': 'RUB',
                'purchase': {
                    'actionField': {
                        'id': cart.order,
                        'revenue': revenue,
                        'coupon': cart.promo && cart.promo.msg === 'success' ? cart.promo.code : ''
                    },
                    'products': products
                }
            }
        });
    } else {
        window.dataLayer.push({
            'event': 'checkout',
            'ecommerce': {
                'checkout': {
                    'actionField': {'step': step},
                    'products': products
                }
            }
        });
    }
}