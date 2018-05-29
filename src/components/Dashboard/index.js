import React, {Component} from 'react';
import { connect } from 'react-redux';
import SubscribeDash from '../Subscribe/SubscribeDash';
import ProfileDash from '../Profile/ProfileDash';
import OrdersDash from '../Orders/OrdersDash';
import AddressesDash from '../Addresses/AddressesDash';
import WishlistDash from '../Wishlist/WishlistDash';
import SavedCartsDash from '../SavedCarts/SavedCartsDash';
import DevicesDash from '../Devices/DevicesDash';
import AccountWrapper from '../AccountWrapper';

const componentRegistry = {
    "OrdersDash": OrdersDash,
    "AddressesDash": AddressesDash,
    "ProfileDash" : ProfileDash,
    "SavedCartsDash": SavedCartsDash,
    "WishlistDash": WishlistDash,
    "SubscribeDash": SubscribeDash,
    "DevicesDash": DevicesDash
};

class Dashboard extends Component{
    render(){
        var Dash = this.props.config.dashboard.map((name, i) => {
            var Panel = componentRegistry[name.component];
            return <Panel key={i} cls={name.className}/>;
        });
        return(
            <AccountWrapper>
                <div className="row">
                    {Dash}
                </div>
            </AccountWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        config: state.getConfigSuccess
    }
}

export default connect(mapStateToProps, null)(Dashboard);
