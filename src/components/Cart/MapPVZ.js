import React, {PureComponent} from 'react';
import { YMaps, Map, ObjectManager } from 'react-yandex-maps';
import { connect } from 'react-redux';
import { addressAdd, addressDelete, getPickUpPoints } from '../../actions/addresses_new';
import Preloader from '../Preloader';
import MapRegions from './MapRegions';
import axios from 'axios';

class MapPVZ extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            center: [55.751574, 37.573856],
            zoom: 9,
            behaviors: ['default', 'scrollZoom'],
            controls: ['zoomControl']
        };
        this.dataConvert = this.dataConvert.bind(this);
        this.getPointData = this.getPointData.bind(this);
        this.getPointOptions = this.getPointOptions.bind(this);
        this.createAddress = this.createAddress.bind(this);
        window.createPVZAddress = this.createAddress;
    };

    componentDidMount(){
        this.props.getPickUpPoints();
    }

    dataConvert(data){
        var features = [];
        data.map((pvz, idx) => {
            var tmpObj = {
                "type": "Feature",
                "id": idx,
                "geometry": {
                    "type": "Point",
                    "coordinates": [pvz.Latitude, pvz.Longitude]
                },
                "properties": this.getPointData(pvz)
            };
            return features.push(tmpObj);
        })
        return features;
    };

    getPointOptions(){
      return {
        // perset: 'islands#circleDotIcon',
        iconLayout:'islands#circleDotIcon'
        // iconImageHref: "https://www.razerzone.ru/img/iml-logo-s.png",
        // iconImageSize: [34, 22],
        // iconImageOffset: [-17, -11]
      };
    };

    createAddress(data){
        var WorkMode = data.WorkMode ? `<span>Часы работы: ${data.WorkMode};</span>` : '';
        var Phone = data.Phone ? `<span>Телефон: ${data.Phone};</span>` : '';
        var PayByCard =  data.PaymentCard ? `<span>Оплата картой: ${data.PaymentCard ? 'да' : 'нет'};</span>` : '';
        var Code = data.Code ? `<span>Код подразделения: ${data.Code};</span>` : '';
        var PointCoords = `${data.Longitude},${data.Latitude}`;

        var normilized = {
            additionalInfo: Code + WorkMode + Phone + PayByCard,
            address: data.Address,
            city: data.RegionCode,
            country: "Россия",
            externalId: "iml_"+ data.Code,
            isActive: true,
            coords: PointCoords,
            postcode: data.Index,
            title: data.Code
        }
        this.props.addressAdd(normilized);
    }

    changePoint(id,coords){
        var center = [];
        (function(){
            for(var i = 0; i<coords.split(",").length; i++){
                center.push(parseFloat(coords.split(",")[i]))
            }
        })();
        this.setState(prevState=>({
            center: center.reverse(),
            zoom: 17
        }));
        this.props.deleteAddress(id);

    }

    getPointData(pvz){
        return {
            balloonContentBody:
                `<address class="sdAddress__point">
                    <strong> ${pvz.Address} </strong>
                    <br/>Телефон: ${pvz.Phone}
                    <br/>Часы работы: ${pvz.WorkMode}
                    <br/>Оплата картой: ${pvz.PaymentCard ? 'да' : 'нет'}
                    <br/><button onclick='window.createPVZAddress(${JSON.stringify(pvz)})' class="sdAddress__select--button">Доставить сюда!</button>
                </address>`
        }
    };

    onRegionChange = (e) => {
        var center = [];

        axios.get("https://geocode-maps.yandex.ru/1.x/?format=json&geocode=" + e.target.options[e.target.selectedIndex].text)
        .then((response) => {
            var coords = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ");
            (function(){
                for(var i = 0; i<coords.length; i++){
                    center.push(parseFloat(coords[i]))
                }
            })();
        })
        .then(()=>{
            console.log(center);
            this.setState(prevState=>({
                center: center.reverse(),
                zoom: 9
            }));
        })
    };

    render() {
        var addressesAll = this.props.addresses;
        var addressesExId = addressesAll.filter(a => ('externalId' in a));
        var addressesHasActive = addressesExId.filter(a => (a['isActive'] === true));


        return (
            <div className="row">
                <div className="col-12">
                    {addressesHasActive.length === 0  ?
                        (this.props.isLoading ?
                            <Preloader />
                            :
                            <React.Fragment>
                                <div className="r-secction__heading map__heading">
                                    <span className="r-section__subtitle">Выберите пункт самовывоза на карте</span>
                                    <MapRegions onRegionChange={this.onRegionChange}/>
                                </div>
                                <div id="map-basics" className={this.props.isPatching || this.props.isAdding ? "sdAddress--patching" : ""}>
                                    <YMaps>
                                        <Map state={this.state}>
                                            <ObjectManager options={{clusterize: false}} objects={this.getPointOptions()} features={this.dataConvert(this.props.points)}/>
                                        </Map>
                                    </YMaps>
                                </div>
                            </React.Fragment>
                        )
                        :
                        addressesHasActive.filter(a => ('externalId' in a)).map((a, i)=>(
                            <React.Fragment key={i}>
                                <span className="sdAddress__heading">Самовывоз по адресу:</span>
                                <div  className={"sdAddress__wrapper " + (this.props.isPatching ? "sdAddress--patching" : "")}>
                                    <div className="sdAddress__data">
                                        <span>{a.country}, {a.city}, {a.postcode},</span>
                                        <span>{a.address};</span>
                                        <span dangerouslySetInnerHTML={{__html: a.additionalInfo}} />
                                        <span onClick={()=>this.changePoint(a.id, a.coords)} className="sdAddress__change">Изменить</span>
                                    </div>
                                    <div className="sdAddress__mapImage" style={{ backgroundImage: `url(https://static-maps.yandex.ru/1.x/?ll=${a.coords}&size=200,200&z=17&l=map)` }} onClick={()=>this.changePoint(a.id, a.coords)}>
                                        <span className="sdAddress__pointOnMap"></span>
                                    </div>
                                </div>
                                {this.props.cartIsUpdating ?
                                    <Preloader />
                                    :
                                    (this.props.summary.delivery ? <span className="sdAddress__heading--amount">{this.props.summary.delivery.cost > 0 ? (this.props.summary.delivery.cost + " ₽") : "Бесплатно"}</span> : null)
                                }

                            </React.Fragment>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isPatching: state.addressesIsUpdating,
        isAdding: state.addressesIsAdding,
        addresses: state.addresses,
        points: state.pickUpPoints,
        cartIsUpdating: state.cartIsUpdating,
        isLoading: state.pickUpPointsIsLoading,
        hasErrored: state.pickUpPointsHasErrored,
        summary: state.cartSummary
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteAddress: (id) => dispatch(addressDelete(id)),
        getPickUpPoints: () => dispatch(getPickUpPoints()),
        addressAdd: (data) => dispatch(addressAdd(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPVZ);
