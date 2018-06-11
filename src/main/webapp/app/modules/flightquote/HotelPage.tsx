import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { addHotel } from './flightQuote.reducer';
import { AsyncTypeahead, Highlighter } from 'react-bootstrap-typeahead';
import axios from 'axios';
import SearchHotel from './SearchHotel';

export interface IHomeProp extends StateProps, DispatchProps {}

  let obj = {
    city: '',
    noOfNights: 0,
    hotels: []
  };
  let cnt = -1;
  let arr = [];

export class HotelPage extends React.Component<IHomeProp> {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
	
  handlerNextPage(e) {
    this.props.addHotel(arr);
    console.log('From Store...', this.props.myStore.hotelDetails);
    fetch('http://ESsh6CCa9:6ad93a30-96f3-4876-9b05-6bbbaa763076@scalr.api.appbase.io/HotelDetails/HotelDetails/_search', {
      method: 'POST',
      body: JSON.stringify({
        "query": {
          "match": {
            "Name": "Hard Rock"
          }
        }
      })
    })
    .then(response => response.json())
    .then(data => console.log('DATA..', data));
  
  }

  handlerForChild(params, flag) {
    /*if(flag==0){
      cnt++;
      arr.push({
        id:cnt,
        city: '',
        noOfNights: 0,
        hotels: []
      });
      console.log('CHECK', arr);
      console.log("FLAG 0 ----", params);
      arr[cnt].city = params;
    }
    else if(flag==1){
      console.log("FLAG 1 ----", params);
      arr[cnt].noOfNights = params;
    }
    else if(flag==2){
      console.log("FLAG 2 ----", params);
      let tmp = arr[cnt].hotels;
      tmp.push(params);
      arr[cnt].hotels = tmp;
    }
    else{
      console.log('PROBLEM IN CODE');
    }*/
    console.log("FLAG 5 ----", params);
    arr.push(params);
    console.log("FINALLY...", arr);
  }

  render() {
    return (
      <div className="container-contact100">
        <div className="wrap-contact100">
     	    <form className = "contact100-form validate-form">
     	      <h3>
   		 		  	SELECT CITY & HOTELS
   	   		  </h3>

						 <div className="wrap-input100 bg1 rs1-wrap-input100">
							<SearchHotel giveBackObj={this.handlerForChild.bind(this)} />
    			  </div>

            <div className="container-contact100-form-btn">
            <Link to="/itinerary" className="alert-link"> 
    				  <button className="contact100-form-btn">
    				  	<span>
    				  		Next
    				  		<i className="fa fa-long-arrow-right m-l-7" aria-hidden="true" />
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

  const mapDispatchToProps = { getSession, addHotel };

  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;

  export default connect(mapStateToProps, mapDispatchToProps)(HotelPage);
