import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import HoteldetailsMySuffix from './hoteldetails-my-suffix';
import HoteldetailsMySuffixDetail from './hoteldetails-my-suffix-detail';
import HoteldetailsMySuffixUpdate from './hoteldetails-my-suffix-update';
import HoteldetailsMySuffixDeleteDialog from './hoteldetails-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={HoteldetailsMySuffixUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={HoteldetailsMySuffixUpdate} />
      <Route exact path={`${match.url}/:id`} component={HoteldetailsMySuffixDetail} />
      <Route path={match.url} component={HoteldetailsMySuffix} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={HoteldetailsMySuffixDeleteDialog} />
  </>
);

export default Routes;
