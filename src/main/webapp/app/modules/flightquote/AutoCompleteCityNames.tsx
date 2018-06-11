import * as React from 'react';
import { connect } from 'react-redux'
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
const searchOptions = {
  types: ['(cities)']
}
export interface IHomeProp extends StateProps, DispatchProps {}



export class AutoCompleteCityNames extends React.Component<IHomeProp>  {
  constructor(props){
    super(props);
    this.state = {title:'', emailId:'', contactNo:'', noOfPassenger:'1',loading: false,options: [], address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
      cities: []};


  }
  handleChange = address => {
      this.setState({
        address,
        latitude: null,
        longitude: null,
        errorMessage: '',
      });
    };

    handleSelect = selected => {
      this.setState({ isGeocoding: true ,address: selected});
      geocodeByAddress(selected)
        .then(res => getLatLng(res[0]))
        .then(({ lat, lng }) => {
          this.setState({
            latitude: lat,
            longitude: lng,
            isGeocoding: false,
          });
        })
        .catch(error => {
          this.setState({ isGeocoding: false });
          console.log('error', error); // eslint-disable-line no-console
        });
    };
  render(){

   return(
     <PlacesAutocomplete
 value={this.state.address}
 onChange={this.handleChange}
 onSelect={this.handleSelect}
 searchOptions={searchOptions}
 >
 {({ getInputProps, suggestions, getSuggestionItemProps }) => (
 <div>
   <input
     {...getInputProps({
       placeholder: 'Search City ...',
       className: 'location-search-input'
     })}
     required
     className="input100" type="text"
     data-validate="Please Type City"
   />
   <div className="autocomplete-dropdown-container">
     {suggestions.map(suggestion => {
       const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
       // inline style for demonstration purpose
       const style = suggestion.active
                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
       return (
         <div {...getSuggestionItemProps(suggestion, { className, style })}>
           <span>{suggestion.description}</span>
         </div>

       )
     })}
   </div>
 </div>
 )}
 </PlacesAutocomplete>
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

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteCityNames);
