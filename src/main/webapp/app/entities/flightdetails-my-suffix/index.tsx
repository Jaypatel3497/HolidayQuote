import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import FlightdetailsMySuffix from './flightdetails-my-suffix';
import FlightdetailsMySuffixDetail from './flightdetails-my-suffix-detail';
import FlightdetailsMySuffixUpdate from './flightdetails-my-suffix-update';
import FlightdetailsMySuffixDeleteDialog from './flightdetails-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={FlightdetailsMySuffixUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={FlightdetailsMySuffixUpdate} />
      <Route exact path={`${match.url}/:id`} component={FlightdetailsMySuffixDetail} />
      <Route path={match.url} component={FlightdetailsMySuffix} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={FlightdetailsMySuffixDeleteDialog} />
  </>
);

export default Routes;
