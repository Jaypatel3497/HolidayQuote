import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './flightdetails-my-suffix.reducer';
import { IFlightdetailsMySuffix } from 'app/shared/model/flightdetails-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFlightdetailsMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FlightdetailsMySuffix extends React.Component<IFlightdetailsMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { flightdetailsList, match } = this.props;
    return (
      <div>
        <h2 id="flightdetails-my-suffix-heading">
          Flightdetails
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Flightdetails
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Flight Number</th>
                <th>Airline Name</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Type</th>
                <th>Flightclass</th>
                <th>Price</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {flightdetailsList.map((flightdetails, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${flightdetails.id}`} color="link" size="sm">
                      {flightdetails.id}
                    </Button>
                  </td>
                  <td>{flightdetails.departure}</td>
                  <td>{flightdetails.arrival}</td>
                  <td>{flightdetails.flightNumber}</td>
                  <td>{flightdetails.airlineName}</td>
                  <td>{flightdetails.departureTime}</td>
                  <td>{flightdetails.arrivalTime}</td>
                  <td>{flightdetails.type}</td>
                  <td>{flightdetails.flightclass}</td>
                  <td>{flightdetails.price}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${flightdetails.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${flightdetails.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${flightdetails.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ flightdetails }: IRootState) => ({
  flightdetailsList: flightdetails.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FlightdetailsMySuffix);
