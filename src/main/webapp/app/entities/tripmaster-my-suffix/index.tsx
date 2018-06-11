import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import TripmasterMySuffix from './tripmaster-my-suffix';
import TripmasterMySuffixDetail from './tripmaster-my-suffix-detail';
import TripmasterMySuffixUpdate from './tripmaster-my-suffix-update';
import TripmasterMySuffixDeleteDialog from './tripmaster-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={TripmasterMySuffixUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={TripmasterMySuffixUpdate} />
      <Route exact path={`${match.url}/:id`} component={TripmasterMySuffixDetail} />
      <Route path={match.url} component={TripmasterMySuffix} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={TripmasterMySuffixDeleteDialog} />
  </>
);

export default Routes;
