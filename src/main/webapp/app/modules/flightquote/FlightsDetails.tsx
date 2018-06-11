import * as React from 'react';
import { connect } from 'react-redux'
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import finalairportsdata from './json/finalairportsdata.json';
import { MyFlights } from 'app/modules/flightquote/myFlights';
import { Link } from 'react-router-dom';
import {AsyncTypeahead,Highlighter,Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import airlines from './airlines'
var s_airlines= [] ;
var airportName=new Map();
export interface IHomeProp extends StateProps, DispatchProps {}

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : airlines.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion.name;
  
  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div className="row">
    {suggestion.name}
    </div>
  );

export interface IHeaderState {
    title: string,
    emailId: string,
    contactNo: string,
    noOfPassenger: string,
    loading: boolean,
    cities: Array<Object>,
    flights: Array<Object>,
    searchResult: Object,
    date: string,
    aircraft: string,
    flightNumber: string,
    data: Object,
    flag: boolean,
    suggestions: Array<Object>
  }


export class FlightsDetails extends React.Component<IHomeProp,IHeaderState>  {
     
    state: IHeaderState = {
        title:'', 
        emailId:'', 
        contactNo:'', noOfPassenger:'1',
        loading: false,   
        cities: [],
        flights: [],
        searchResult: '' ,
        date: '',
        flightNumber: '',
        aircraft: '',
        data: '',
        flag: false,
        suggestions: []
      };
    componentWillMount()
    {
        airlines.map(it=>{
            var temp=it.iata+ ' ' +it.name;
            if(it.iata)
            s_airlines.push(temp); 
        })
        console.log(airlines);
    }
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: getSuggestions(value)
        });
      };
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };  
    handlerDate(e)
    {
      console.log(e.target.value);
      this.setState({date: e.target.value});
    }
    
    handlerFlightNumber(e)
    {
      console.log(e.target.value);
      this.setState({flightNumber: e.target.value});
    }
    handlerAddFlight()
    {
        console.log("Hii");
        this.state.flights.push(this.state.data);
        this.setState({flights: this.state.flights });
    }
    handlerRemove()
    {
        this.setState({searchResult: ''});
    }
    handlerAirlines = (event, { newValue }) => {
        this.setState({
          aircraft: newValue
        });
      };
    handlerGetInfo()
    {
        airlines.map(it=>{
            var temp=it.iata+ ' ' +it.name;
            if(temp===this.state.aircraft)
            {
                this.state.aircraft=it.iata;
            }
        })
        console.log(this.state.aircraft);
        if((!this.state.flightNumber)||(!this.state.aircraft)||(!this.state.date))
        return;
      var url='https://l8b57x4o93.execute-api.us-west-2.amazonaws.com/latest/flex/schedules/rest/v1/json/flight/'+this.state.aircraft+'/'+this.state.flightNumber+'/departing/'+this.state.date+'?appId=d68b279a&appKey=e10b93e97c35ff3fad45b9a2f832fdad';
      console.log("HI");
      fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(data =>{
            
            let year;
            let month;
            let date;
            let time;
            let arr_year;
            let arr_month;
            let arr_date;
            let arr_time;
            
            if(data)
            {
            data.appendix.airports.map(it=>{
                airportName.set(it.fs,it.name);
            })
            year=data.scheduledFlights[0].departureTime.toString().substring(0,4);
            month=data.scheduledFlights[0].departureTime.toString().substring(5,7);
            date=data.scheduledFlights[0].departureTime.toString().substring(8,10);
            time=data.scheduledFlights[0].departureTime.toString().substring(11,16);
            
            arr_year=data.scheduledFlights[0].arrivalTime.toString().substring(0,4);
            arr_month=data.scheduledFlights[0].arrivalTime.toString().substring(5,7);
            arr_date=data.scheduledFlights[0].arrivalTime.toString().substring(8,10);
            arr_time=data.scheduledFlights[0].arrivalTime.toString().substring(11,16);
            console.log(year+month+date+time);
        }
            var temp=(
                <tr className="trPadd ng-scope" ng-repeat="data in IOdata">
                <td> img </td>
                <td className="ng-binding"> {this.state.aircraft}</td>
                <td className="ng-binding"> {data.scheduledFlights[0].flightNumber}</td>
                <td className="ng-binding"> {data.scheduledFlights[0].departureAirportFsCode} </td>
                <td className="ng-binding"> {airportName.get(data.scheduledFlights[0].departureAirportFsCode)}</td>
                <td className="ng-binding">  {year+'-'+month+'-'+date}</td>
                <td className="ng-binding">  {time} </td>
                <td className="ng-binding"> {data.scheduledFlights[0].arrivalAirportFsCode} </td>
                <td className="ng-binding"> {airportName.get(data.scheduledFlights[0].arrivalAirportFsCode)}</td>
                <td className="ng-binding">  {arr_year+'-'+arr_month+'-'+arr_date}</td>
                <td className="ng-binding"> {arr_time} </td>
               <td ng-if="flighttype != 'multicity'" className="ng-binding ng-scope"> Outbound</td>
                
                <td>
                    <button type="button" className="btn btn-info addFlightBtn" onClick={this.handlerAddFlight.bind(this)}>Add Flight</button>
                   
                    <button type="button"  className="removeFlightBtn btn btn-info" onClick={this.handlerRemove.bind(this)}>Remove Flight</button>
                </td>
            </tr>
            );
            
            this.setState({searchResult: temp,data: data,flag: true});
        
        });
        }
        handlerNextPage(e){
            console.log("Third Page");
          }    
    render() {
        const inputProps = {
            placeholder: 'Type a programming language',
            value: this.state.aircraft,
            onChange: this.handlerAirlines.bind(this)
        };
        return (
           <div className="container">
           <div className="row" style={{textAlign: "center"}}>
           <div className="col-12">
           <div className="wrap-input100 validate-input bg1" >
           <input type="radio" value="outbound"  name="outbound" onChange={it=>(console.log("Hii"))}/>Outbound
           <input type="radio" value="inbound"  name="inbound" onChange={it=>(console.log("Hii"))}/>Inbound
           <input type="radio" value="multicity" name="multicity" onChange={it=>(console.log("Hii"))}/>Multicity
                        </div>
           </div>
           </div>
           <div className="row">
           <div className="col-3">
           <div className="wrap-input100 validate-input bg1" >
             <input className="input100" type="text" name="name" placeholder="Date" required onChange={this.handlerDate.bind(this)}/>
            </div>
           </div>
           <div className="col-3">
           <Typeahead
             options={s_airlines}
             onChange={(e)=>{
                if(e.length>0)
                {
                  this.setState({aircraft: e[0]})
                }
                else{
                  this.setState({aircraft: ''})
                }
              }}
             placeholder="Choose a Airlines."
           />
           </div>
           <div className="col-3">
           <div className="wrap-input100 validate-input bg1">
                        <input className="input100" type="text" name="name" placeholder="Enter Flight NUmber" required onChange={this.handlerFlightNumber.bind(this)}/>
                        </div>
           </div>
           <div className="col-3">
           <div className="container-contact100-form-btn">
                            <button className="contact100-form-btn" onClick={this.handlerGetInfo.bind(this)}>
                                <span>
                                    Get Info
                                    <i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>
           </div>
            </div>
            
    {this.state.flag?(<div>
        <div className="row">
            <div className="col-6">
            <h3>
            Search Result
            </h3>
            </div>
            <div className="col-6">
            <button className="contact100-form-btn"onClick={this.handlerRemove.bind(this)} >
                                <span>
                                    Clear Search
                                    <i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                                </span>
            </button>
                    
            </div>
        </div>
            <table className="table">
                                                <tbody><tr><th>Airline</th>
                                                <th>Code</th>
                                                <th>Flight Number</th>
                                                <th>Departure Airport Code</th>
                                                <th>Departure Airport City</th>
                                                <th>Departure Date</th>
                                                <th>Departure Time</th>
                                                <th>Arrival Airport</th>
                                                <th>Arrival Airport City</th>
                                                <th>Arrival Date</th>
                                                <th>Arrival Time</th>
                                                <th>Type </th>
                                                <th>Add Flight</th>
                                                </tr>
                                                {this.state.searchResult}
                                            </tbody></table>
                                            <br/>
                                            <hr/>
                                            <h3>Flights added to the itenerary:</h3>
                                            <MyFlights segments={this.state.flights} />
                                        </div>):null}   
                                        <Link to="/hotelpage" className="alert-link" onClick={this.handlerNextPage.bind(this)} >
    					<button  className="contact100-form-btn">
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
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default FlightsDetails;