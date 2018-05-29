import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/user';
// import Alert from './Alert'

class AlertList extends Component{
    render(){
        if (this.props.hasErrored) {
            return (<p>Sorry! There was an error loading the orders</p>);
        }

        if (this.props.isLoading) {
            return (<p>Loading…</p>);
        }
        if(this.props.user[0] && !this.props.isLoading && !this.props.isLoading){
          var user = this.props.user[0]
          if(user.orders.length <= 0){
            return (
                <div>
                    <p>У вас еще нет заказов</p>
                </div>
            );
          } else {
            return (
                <div>
                    {/*{user.orders.map((order, i)=>(
                        <Alert alertType="alert-danger" alertMsg="11" key={i}/>
                    ))}*/}
                </div>
            );
          }
        } else {
          return (
              <div>

              </div>
          );
        }
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        hasErrored: state.ordersHasErrored,
        isLoading: state.ordersIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserData: (url) => dispatch(fetchUserData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertList);
