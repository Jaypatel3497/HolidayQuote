import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import CustomerMySuffix from './customer-my-suffix';
import CustomerMySuffixDetail from './customer-my-suffix-detail';
import CustomerMySuffixUpdate from './customer-my-suffix-update';
import CustomerMySuffixDeleteDialog from './customer-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={CustomerMySuffixUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={CustomerMySuffixUpdate} />
      <Route exact path={`${match.url}/:id`} component={CustomerMySuffixDetail} />
      <Route path={match.url} component={CustomerMySuffix} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={CustomerMySuffixDeleteDialog} />
  </>
);

export default Routes;
