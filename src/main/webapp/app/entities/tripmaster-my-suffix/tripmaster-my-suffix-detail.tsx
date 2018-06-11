import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tripmaster-my-suffix.reducer';
import { ITripmasterMySuffix } from 'app/shared/model/tripmaster-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripmasterMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TripmasterMySuffixDetail extends React.Component<ITripmasterMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tripmaster } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Tripmaster [<b>{tripmaster.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="emailtitle">Emailtitle</span>
            </dt>
            <dd>{tripmaster.emailtitle}</dd>
            <dt>
              <span id="noOfNights">No Of Nights</span>
            </dt>
            <dd>{tripmaster.noOfNights}</dd>
            <dt>
              <span id="from">From</span>
            </dt>
            <dd>{tripmaster.from}</dd>
            <dt>
              <span id="cities">Cities</span>
            </dt>
            <dd>{tripmaster.cities}</dd>
            <dt>Customer</dt>
            <dd>{tripmaster.customerId ? tripmaster.customerId : ''}</dd>
            <dt>Flightdetails</dt>
            <dd>
              {tripmaster.flightdetails
                ? tripmaster.flightdetails.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === tripmaster.flightdetails.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Hoteldetails</dt>
            <dd>
              {tripmaster.hoteldetails
                ? tripmaster.hoteldetails.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === tripmaster.hoteldetails.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Termsconditions</dt>
            <dd>
              {tripmaster.termsconditions
                ? tripmaster.termsconditions.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === tripmaster.termsconditions.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Cancellation Policy</dt>
            <dd>
              {tripmaster.cancellationPolicies
                ? tripmaster.cancellationPolicies.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === tripmaster.cancellationPolicies.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Itinerary</dt>
            <dd>
              {tripmaster.itineraries
                ? tripmaster.itineraries.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === tripmaster.itineraries.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/tripmaster-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/tripmaster-my-suffix/${tripmaster.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ tripmaster }: IRootState) => ({
  tripmaster: tripmaster.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripmasterMySuffixDetail);
