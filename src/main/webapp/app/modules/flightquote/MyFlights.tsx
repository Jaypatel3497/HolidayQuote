import * as React from 'react';
import { connect } from 'react-redux'
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp{
  segments: Array<Object>
}

var airportName=new Map();

export class MyFlights extends React.Component<IHomeProp>  {
  
  render(){
    var flights=[];
    if(this.props.segments)
    this.props.segments.map(data=>{
      console.log(data);
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
          <td className="ng-binding"> {data.scheduledFlights[0].carrierFsCode}</td>
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
              <button type="button"  className="removeFlightBtn btn btn-info">Remove Flight</button>
          </td>
      </tr>
      );
      
      flights.push(temp); 
   })
    
     return(
      <table className="table ttable-condensed table-hover">
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
                                                {flights?flights:null}
                                            </tbody></table>
    )
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default MyFlights;