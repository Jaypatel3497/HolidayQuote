import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import ItineraryMySuffix from './itinerary-my-suffix';
import ItineraryMySuffixDetail from './itinerary-my-suffix-detail';
import ItineraryMySuffixUpdate from './itinerary-my-suffix-update';
import ItineraryMySuffixDeleteDialog from './itinerary-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={ItineraryMySuffixUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={ItineraryMySuffixUpdate} />
      <Route exact path={`${match.url}/:id`} component={ItineraryMySuffixDetail} />
      <Route path={match.url} component={ItineraryMySuffix} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={ItineraryMySuffixDeleteDialog} />
  </>
);

export default Routes;
