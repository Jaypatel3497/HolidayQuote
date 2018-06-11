import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './cancellation-policy-my-suffix.reducer';
import { ICancellationPolicyMySuffix } from 'app/shared/model/cancellation-policy-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICancellationPolicyMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CancellationPolicyMySuffix extends React.Component<ICancellationPolicyMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { cancellationPolicyList, match } = this.props;
    return (
      <div>
        <h2 id="cancellation-policy-my-suffix-heading">
          Cancellation Policies
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Cancellation Policy
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descritption</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cancellationPolicyList.map((cancellationPolicy, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cancellationPolicy.id}`} color="link" size="sm">
                      {cancellationPolicy.id}
                    </Button>
                  </td>
                  <td>{cancellationPolicy.descritption}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cancellationPolicy.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cancellationPolicy.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cancellationPolicy.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cancellationPolicy }: IRootState) => ({
  cancellationPolicyList: cancellationPolicy.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CancellationPolicyMySuffix);
