import * as React from 'react';
import {AsyncTypeahead,Highlighter} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import AllCities from './AllCities'
import { connect } from 'react-redux'
import AutoCompleteCityNames from './AutoCompleteCityNames'
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { Link } from 'react-router-dom'; 
export interface IHomeProp extends DispatchProps {}

export interface IHeaderState {
  title: string,
  emailId: string,
  contactNo: string,
  noOfPassenger: string,
  loading: boolean,
  cities: Array<Object>
}

var count=0;

export class BasicDetails extends React.Component<IHomeProp,IHeaderState>  {
  state: IHeaderState = {
  title:'', 
  emailId:'', 
  contactNo:'', noOfPassenger:'1',
  loading: false,   
  cities: []
};

handlerTitle(e){
    this.setState({title:e.target.value});
  }



  handlerEmailId(e){
    this.setState({emailId:e.target.value});
  }

  handlerContactNo(e){
    this.setState({contactNo:e.target.value});
  }
  handlerNextPage(e){
    console.log("Third Page");
  }

  handlerNoOfPassenger(e){
    this.setState({noOfPassenger:e.target.value});
  }
  handlerAddCity(e)
  {

    console.log("Hiii");
    var temp=(
    <div key={count} className="row" style={{marginTop: "5px"}} id={count}>
    <div className="col-6">
    <AutoCompleteCityNames />
    </div>
    <div className="col-3">
    <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Number Of Night">
    					<span className="label-input100">Number Of Days *</span>
    					<input className="input100" type="number" name="phone" placeholder="Enter Number Of Night" required onChange={this.handlerContactNo.bind(this)}/>
    				</div>
    </div>
    <div className="col-3">
    <button  type="button" className="remove-form-btn" onClick={this.handlerRemoveCity.bind(this)} id={count}>
      <span id={count}>
        Remove
      </span>
    </button>
    </div>
    </div>);
    this.state.cities.push({segment: temp,key: count});
    console.log(temp);
    count++;
    this.setState({cities: this.state.cities});
    console.log(this.state.cities);
  }
  handlerRemoveCity(e)
  {
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
  handlerNextPagee(e)
  {
    
  }
  render() {


    return (

      <div className="container-contact100">
        <div className="wrap-contact100">
          <form className="contact100-form validate-form" onSubmit={this.handlerNextPage.bind(this)}>
            <span className="contact100-form-title">
              Basic Details
            </span>

            <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Your Email (e@a.x)">
              <span className="label-input100">Title *</span>
              <input className="input100" type="text" name="title" placeholder="Enter Title of Email" required onChange={this.handlerTitle.bind(this)}/>
    				</div>

    				<div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Number Of Night">
    					<span className="label-input100">Number Of Nights *</span>
    					<input className="input100" type="number" name="phone" placeholder="Enter Number Of Night" required onChange={this.handlerContactNo.bind(this)}/>
    				</div>
            <div className="row">
            <div className="col-8">
            <div className="wrap-input100 validate-input bg1" data-validate = "Enter Your Email (e@a.x)">
              <span className="label-input100">From *</span>
            <AutoCompleteCityNames />
            </div>
            </div>
            <div className="col-3">
            <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Number Of Night">
    					<span className="label-input100">Number Of Days *</span>
    					<input className="input100" type="number" name="phone" placeholder="Enter Number Of Night" required onChange={this.handlerContactNo.bind(this)}/>
    				</div>
            </div>
            </div>


            <div className="wrap-input100 validate-input bg1" data-validate="Please Type Title of Email">
              <span className="label-input100">Cities *</span>
              <div className="row">
              <div className="col-6">
              <AutoCompleteCityNames />
              </div>
              <div className="col-3">
              <div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Number Of Night">
    					<span className="label-input100">Number Of Days *</span>
    					<input className="input100" type="number" name="phone" placeholder="Enter Number Of Night" required onChange={this.handlerContactNo.bind(this)}/>
              </div>
              </div>
              <div className="col-3">
              <button  type="button" className="contact100-form-btn" onClick={this.handlerAddCity.bind(this)}>
                <span>
                  Add City
                </span>
              </button>
              </div>
            </div>
            {this.state.cities?(
              <AllCities segments={this.state.cities}/>):null}
            </div>

            <div className="container-contact100-form-btn">
            <Link to="/flights-details" className="alert-link" onClick={this.handlerNextPage.bind(this)} >
              <button type="submit" className="contact100-form-btn" >
                <span>
                  Next
                  <i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                </span>
              </button>
             </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}



const mapDispatchToProps = { getSession };

type DispatchProps = typeof mapDispatchToProps;

export default BasicDetails;
