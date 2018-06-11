import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './flightdetails-my-suffix.reducer';
import { IFlightdetailsMySuffix } from 'app/shared/model/flightdetails-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFlightdetailsMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class FlightdetailsMySuffixDetail extends React.Component<IFlightdetailsMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { flightdetails } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Flightdetails [<b>{flightdetails.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="departure">Departure</span>
            </dt>
            <dd>{flightdetails.departure}</dd>
            <dt>
              <span id="arrival">Arrival</span>
            </dt>
            <dd>{flightdetails.arrival}</dd>
            <dt>
              <span id="flightNumber">Flight Number</span>
            </dt>
            <dd>{flightdetails.flightNumber}</dd>
            <dt>
              <span id="airlineName">Airline Name</span>
            </dt>
            <dd>{flightdetails.airlineName}</dd>
            <dt>
              <span id="departureTime">Departure Time</span>
            </dt>
            <dd>{flightdetails.departureTime}</dd>
            <dt>
              <span id="arrivalTime">Arrival Time</span>
            </dt>
            <dd>{flightdetails.arrivalTime}</dd>
            <dt>
              <span id="type">Type</span>
            </dt>
            <dd>{flightdetails.type}</dd>
            <dt>
              <span id="flightclass">Flightclass</span>
            </dt>
            <dd>{flightdetails.flightclass}</dd>
            <dt>
              <span id="price">Price</span>
            </dt>
            <dd>{flightdetails.price}</dd>
          </dl>
          <Button tag={Link} to="/entity/flightdetails-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/flightdetails-my-suffix/${flightdetails.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ flightdetails }: IRootState) => ({
  flightdetails: flightdetails.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FlightdetailsMySuffixDetail);
