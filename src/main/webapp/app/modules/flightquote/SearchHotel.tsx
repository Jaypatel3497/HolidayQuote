import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import AutoCompleteCityNames from './AutoCompleteCityNames';
import AllCities from './AllCities';

export interface IHomeProp extends StateProps, DispatchProps {}

let count = 0;

export class SearchHotel extends React.Component<IHomeProp> {
  constructor(props) {
    super(props);
    this.state = { cities: [], noOfNights: 1, city:'' };
  }

  handlerAddCity(e) {
    console.log("Hiii");
    var temp = (<div key={count} style={{marginTop: "5px"}} id={count}>
        <div className="row">
          <div className="col-md-6">
          <span className="label-input100">City *</span>
            <AutoCompleteCityNames cityName={this.handlerForCity.bind(this)} />
          </div>
          <div className="col-md-6">
            <div className="row wrap-input100 input100-select bg1">
            <span className="label-input100 col-md-3">No Of Nights *</span>
               <select className="js-select2 col-md-6" name="service" onChange={this.handlerNoOfNights.bind(this)}>
                 <option>1</option>
                 <option>2</option>
                 <option>3</option>
                 <option>4</option>
               </select>
               <div className="dropDownSelect2" />
           </div>
          </div>
        </div>
        <div className="row">
            <div className="col-md-8">
              <div className="wrap-input100 bg1 rs1-wrap-input100">
    				    <span className="label-input100">SELECT HOTEL *</span>
    				    <input className="input100" type="text" name="city" placeholder="SELECT HOTEL" required onBlur={this.handlerForSelectHotel.bind(this)} />
    			    </div>
            </div>
            <div className="col-3">
              <button type="button" className="remove-form-btn" onClick={this.handlerRemoveCity.bind(this)} id={count}>
              <span id={count}>
                REMOVE
              </span>
              </button>
            </div>
        </div>
        <hr />
        <hr />
</div>);
    this.state.cities.push({ segment: temp,key: count });
    console.log('TEMP', temp);
    count++;
    this.setState({cities: this.state.cities});
  }
  
  handlerRemoveCity(e) {
    console.log(e.target.id);
    var temp=[]
    this.state.cities.map(it=>{
      if(it.key!==parseInt(e.target.id))
      {
        temp.push(it);
      }
    })
    this.setState({cities: temp});
  }

  handlerNoOfNights(e) {
    this.setState({ noOfNights: e.target.value });
    console.log("Nights",this.state.noOfNights);
    //this.props.giveBackObj(e.target.value,1);
  }

  handlerForSelectHotel(e) {
    let hotelObject = {
      city: this.state.city,
      noOfNights: this.state.noOfNights,
      hotel: e.target.value
    }
    console.log('HotelOBJ...', hotelObject);
    this.props.giveBackObj(hotelObject,5);
  }

  handlerForCity(params) {
    this.setState({ city: params});
    //this.props.giveBackObj(params,0);
  }

  render() {
    return (
        <div className="wrap-input100 bg1 rs1-wrap-input100">
            <div className="row">
            <div className="col-md-6">
            <span className="label-input100">City *</span>
              <AutoCompleteCityNames cityName={this.handlerForCity.bind(this)} />
            </div>
          <div className="col-md-6">
            <div className="row wrap-input100 input100-select bg1">
            <span className="label-input100 col-md-3">No Of Nights *</span>
               <select className="js-select2 col-md-6" name="service" onChange={this.handlerNoOfNights.bind(this)}>
                 <option>1</option>
                 <option>2</option>
                 <option>3</option>
                 <option>4</option>
               </select>
               <div className="dropDownSelect2" />
           </div>
          </div>
            </div>
            <div className="row">
            <div className="col-md-8">
              <div className="wrap-input100 bg1 rs1-wrap-input100">
    				    <span className="label-input100">SELECT HOTEL *</span>
    				    <input className="input100" type="text" name="city" placeholder="SELECT HOTEL" required onBlur={this.handlerForSelectHotel.bind(this)} />
    			    </div>
            </div>
            <div className="col-3">
              <button type="button" className="remove-form-btn" onClick={this.handlerAddCity.bind(this)}>
              <span>
                ADD
              </span>
              </button>
            </div>
        </div>
            <hr />
            <hr />
            {this.state.cities ? (<AllCities segments={this.state.cities} />) : null}
        </div>
    );
  }
}

const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated,
    customer: storeState.flightQuote
  });

  const mapDispatchToProps = { getSession };

  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;

  export default connect(mapStateToProps, mapDispatchToProps)(SearchHotel);
