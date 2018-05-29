import React, {Component} from 'react';


class DevicesDash extends Component{
    render(){
      return (
        <section className={this.props.cls}>
            <div className="d-flex justify-content-between">
                 <h5>Мои устройства</h5>
            </div>
           <hr/>
           <div className="row">
             <div className="col-md-6 col-lg-4 col-12">
                <p></p>
             </div>
           </div>
       </section>
      );
    }
}

export default DevicesDash;
