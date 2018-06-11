import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import TermsConditionsMySuffix from './terms-conditions-my-suffix';
import TermsConditionsMySuffixDetail from './terms-conditions-my-suffix-detail';
import TermsConditionsMySuffixUpdate from './terms-conditions-my-suffix-update';
import TermsConditionsMySuffixDeleteDialog from './terms-conditions-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={TermsConditionsMySuffixUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={TermsConditionsMySuffixUpdate} />
      <Route exact path={`${match.url}/:id`} component={TermsConditionsMySuffixDetail} />
      <Route path={match.url} component={TermsConditionsMySuffix} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={TermsConditionsMySuffixDeleteDialog} />
  </>
);

export default Routes;
