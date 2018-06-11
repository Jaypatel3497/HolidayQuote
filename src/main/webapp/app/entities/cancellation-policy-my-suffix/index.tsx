import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import CancellationPolicyMySuffix from './cancellation-policy-my-suffix';
import CancellationPolicyMySuffixDetail from './cancellation-policy-my-suffix-detail';
import CancellationPolicyMySuffixUpdate from './cancellation-policy-my-suffix-update';
import CancellationPolicyMySuffixDeleteDialog from './cancellation-policy-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={CancellationPolicyMySuffixUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={CancellationPolicyMySuffixUpdate} />
      <Route exact path={`${match.url}/:id`} component={CancellationPolicyMySuffixDetail} />
      <Route path={match.url} component={CancellationPolicyMySuffix} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={CancellationPolicyMySuffixDeleteDialog} />
  </>
);

export default Routes;
