import * as React from 'react';
import './FirstPage.css';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { add } from './flightQuote.reducer';
import axios from 'axios';

export interface IHomeProp extends StateProps, DispatchProps {}

export class PassangerDetails extends React.Component<IHomeProp> {
  constructor(props) {
    super(props);
    this.state = { fullName : '', emailId : '', contactNo : '', noOfPassenger : '1', city : '' };
  }

  handlerFullName(e) {
    this.setState({ fullName : e.target.value });
  }

  handlerEmailId(e) {
    this.setState({ emailId : e.target.value });
  }

  handlerContactNo(e) {
    this.setState({ contactNo : e.target.value });
  }

  handlerCity(e) {
    this.setState({ city : e.target.value });
  }

  handlerNoOfPassenger(e) {
    this.setState({ noOfPassenger : e.target.value });
  }

  handlerNextPage(e) {
		if(!this.state.fullName||!this.state.contactNo||!this.state.emailId||!this.state.city)
	   e.preventDefault();
    const obj = {
      name : this.state.fullName,
      contactNo : this.state.contactNo,
      emailId : this.state.emailId,
      city : this.state.city
    };
    this.props.add(obj);
  }

  handlerShow(e){
    e.preventDefault();
    console.log('Store', this.props.myStore.customerDetails);
  }

  render() {
    return (
      <div className="container-contact100">
    		<div className="wrap-contact100">
    			<form className="contact100-form validate-form"  onSubmit={this.handlerNextPage.bind(this)}>
    				<span className="contact100-form-title">
    					Passenger Info
    				</span>

    				<div className="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
    					<span className="label-input100">FULL NAME *</span>
    					<input className="input100" type="text" name="name" placeholder="Enter Your Name" required onChange={this.handlerFullName.bind(this)}/>
    				</div>

    				<div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Your Email (e@a.x)">
    					<span className="label-input100">Email *</span>
    					<input className="input100" type="text" name="email" placeholder="Enter Your Email " required onChange={this.handlerEmailId.bind(this)}/>
    				</div>

    				<div className="wrap-input100 bg1 rs1-wrap-input100">
    					<span className="label-input100">Phone *</span>
    					<input className="input100" type="text" name="phone" placeholder="Enter Number Phone" required onChange={this.handlerContactNo.bind(this)}/>
    				</div>

						<div className="wrap-input100 bg1 rs1-wrap-input100">
    				  <span className="label-input100">City *</span>
    				  <input className="input100" type="text" name="city" placeholder="Enter Your City" required onChange={this.handlerCity.bind(this)} />
    			  </div>
    				<div className="wrap-input100 input100-select bg1">
    					<span className="label-input100">Passengers *</span>
    					<div>
    						<select className="js-select2" name="service" onChange={this.handlerNoOfPassenger.bind(this)}>
    							<option>1</option>
    							<option>2</option>
    							<option>3</option>
    							<option>4</option>
    						</select>
    						<div className="dropDownSelect2"></div>
    					</div>
    				</div>

    				<div className="container-contact100-form-btn">
						<Link to="/basic-details" className="alert-link" onClick={this.handlerNextPage.bind(this)} >
    					<button type="submit" className="contact100-form-btn">
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

const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated,
    myStore: storeState.flightQuote
  });

  const mapDispatchToProps = { getSession, add };

  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;

  export default connect(mapStateToProps, mapDispatchToProps)(PassangerDetails);
