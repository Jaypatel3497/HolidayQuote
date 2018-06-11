import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { add } from './flightQuote.reducer';
import AutoCompleteCityNames from './AutoCompleteCityNames'
import axios from 'axios';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Itinerary extends React.Component<IHomeProp> {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  handlerNextPage(e) {
	
  }
  componentWillMount()
  {
     var noOfDays=6;
     for(var i=0;i<6;i++)
     {
         this.state.data.push(
             (
             <div><span className="label-input100">Day{i+1} *</span>
             <div className="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
                           <span className="label-input100">Title *</span>
                           <input className="input100" type="text" name="name" placeholder="Enter Your Name" required/>
                       </div>
                       <div className="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
                           <span className="label-input100">Description *</span>
                           <input className="input100" type="text" name="name" placeholder="Enter Your Name" required />
                       </div> 
                       <div className="wrap-input100 validate-input bg1" data-validate = "Enter Your Email (e@a.x)">
              <span className="label-input100">City *</span>
            <AutoCompleteCityNames />
            </div>
               <hr /></div>))
     }
     this.setState({data: this.state.data});
  }
  render() {
    return (<div>
            {this.state.data}
            <Link to="/termsconditions" className="alert-link" onClick={this.handlerNextPage.bind(this)} >
    					<button type="submit" className="contact100-form-btn">
    						<span>
    							Next
    							<i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
    						</span>
    					</button>
							</Link>
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

  export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
