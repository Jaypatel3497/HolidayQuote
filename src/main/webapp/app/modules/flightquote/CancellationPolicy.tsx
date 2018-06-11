import * as React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import axios from 'axios';
import {AsyncTypeahead,Highlighter,Typeahead} from 'react-bootstrap-typeahead';


export interface IHomeProp extends StateProps, DispatchProps {}

export class CancellationPolicy extends React.Component<IHomeProp> {
  constructor(props) {
    super(props);
    this.state = { termsconditions: [] };
  }
  handlerNextPage(e) {
	
  }
  componentWillMount()
  {
    fetch('http://localhost:9000/api/cancellation-policies', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTUyODM1ODA5M30.aFVOz17hxrOm-IV21wNvRSCZBurqipNNDaP6BsEU92_CTyWVRPM8plmAy_oaz_pGvlSPZX1IJ0FbvFO9L7Flzw'
      },
    })
    .then(response => response.json())
    .then(data => {
      var temp=[];
      data.map(it=>{
        temp.push(it.descritption);
      })
      this.setState({termsconditions: temp})
    });
  }
  render() {
    return (<div>
            <Typeahead
             options={this.state.termsconditions}
             multiple={true}
             onChange={ (e)=>console.log(e) }
             placeholder="Choose a cancellationPolicy."
           />
           <Link to="/secondpage" className="alert-link" onClick={this.handlerNextPage.bind(this)} >
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

  const mapDispatchToProps = { getSession };

  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;

  export default connect(mapStateToProps, mapDispatchToProps)(CancellationPolicy);
