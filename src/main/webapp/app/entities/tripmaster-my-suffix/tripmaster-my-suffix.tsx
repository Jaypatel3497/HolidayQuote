import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tripmaster-my-suffix.reducer';
import { ITripmasterMySuffix } from 'app/shared/model/tripmaster-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripmasterMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class TripmasterMySuffix extends React.Component<ITripmasterMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { tripmasterList, match } = this.props;
    return (
      <div>
        <h2 id="tripmaster-my-suffix-heading">
          Tripmasters
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Tripmaster
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Emailtitle</th>
                <th>No Of Nights</th>
                <th>From</th>
                <th>Cities</th>
                <th>Customer</th>
                <th>Flightdetails</th>
                <th>Hoteldetails</th>
                <th>Termsconditions</th>
                <th>Cancellation Policy</th>
                <th>Itinerary</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tripmasterList.map((tripmaster, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tripmaster.id}`} color="link" size="sm">
                      {tripmaster.id}
                    </Button>
                  </td>
                  <td>{tripmaster.emailtitle}</td>
                  <td>{tripmaster.noOfNights}</td>
                  <td>{tripmaster.from}</td>
                  <td>{tripmaster.cities}</td>
                  <td>{tripmaster.customerId ? <Link to={`customer/${tripmaster.customerId}`}>{tripmaster.customerId}</Link> : ''}</td>
                  <td>
                    {tripmaster.flightdetails
                      ? tripmaster.flightdetails.map((val, j) => (
                          <span key={j}>
                            <Link to={`flightdetails/${val.id}`}>{val.id}</Link>
                            {j === tripmaster.flightdetails.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {tripmaster.hoteldetails
                      ? tripmaster.hoteldetails.map((val, j) => (
                          <span key={j}>
                            <Link to={`hoteldetails/${val.id}`}>{val.id}</Link>
                            {j === tripmaster.hoteldetails.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {tripmaster.termsconditions
                      ? tripmaster.termsconditions.map((val, j) => (
                          <span key={j}>
                            <Link to={`termsConditions/${val.id}`}>{val.id}</Link>
                            {j === tripmaster.termsconditions.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {tripmaster.cancellationPolicies
                      ? tripmaster.cancellationPolicies.map((val, j) => (
                          <span key={j}>
                            <Link to={`cancellationPolicy/${val.id}`}>{val.id}</Link>
                            {j === tripmaster.cancellationPolicies.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {tripmaster.itineraries
                      ? tripmaster.itineraries.map((val, j) => (
                          <span key={j}>
                            <Link to={`itinerary/${val.id}`}>{val.id}</Link>
                            {j === tripmaster.itineraries.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tripmaster.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tripmaster.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tripmaster.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ tripmaster }: IRootState) => ({
  tripmasterList: tripmaster.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripmasterMySuffix);
