import * as React from 'react';
// tslint:disable-next-line:no-unused-variable
import { Route, Switch } from 'react-router-dom';

import HoteldetailsMySuffix from './hoteldetails-my-suffix';
import CustomerMySuffix from './customer-my-suffix';
import TripmasterMySuffix from './tripmaster-my-suffix';
import FlightdetailsMySuffix from './flightdetails-my-suffix';
import ItineraryMySuffix from './itinerary-my-suffix';
import TermsConditionsMySuffix from './terms-conditions-my-suffix';
import CancellationPolicyMySuffix from './cancellation-policy-my-suffix';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <Route path={`${match.url}/hoteldetails-my-suffix`} component={HoteldetailsMySuffix} />
      <Route path={`${match.url}/customer-my-suffix`} component={CustomerMySuffix} />
      <Route path={`${match.url}/tripmaster-my-suffix`} component={TripmasterMySuffix} />
      <Route path={`${match.url}/flightdetails-my-suffix`} component={FlightdetailsMySuffix} />
      <Route path={`${match.url}/itinerary-my-suffix`} component={ItineraryMySuffix} />
      <Route path={`${match.url}/terms-conditions-my-suffix`} component={TermsConditionsMySuffix} />
      <Route path={`${match.url}/cancellation-policy-my-suffix`} component={CancellationPolicyMySuffix} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
