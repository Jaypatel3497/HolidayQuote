import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITripmasterMySuffix } from 'app/shared/model/tripmaster-my-suffix.model';
import { getEntities as getTripmasters } from 'app/entities/tripmaster-my-suffix/tripmaster-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './flightdetails-my-suffix.reducer';
import { IFlightdetailsMySuffix } from 'app/shared/model/flightdetails-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IFlightdetailsMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IFlightdetailsMySuffixUpdateState {
  isNew: boolean;
  tripmasterId: number;
}

export class FlightdetailsMySuffixUpdate extends React.Component<IFlightdetailsMySuffixUpdateProps, IFlightdetailsMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      tripmasterId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTripmasters();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { flightdetails } = this.props;
      const entity = {
        ...flightdetails,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/flightdetails-my-suffix');
  };

  render() {
    const isInvalid = false;
    const { flightdetails, tripmasters, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="app4App.flightdetails.home.createOrEditLabel">Create or edit a Flightdetails</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : flightdetails} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="flightdetails-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="departureLabel" for="departure">
                    Departure
                  </Label>
                  <AvField id="flightdetails-my-suffix-departure" type="text" name="departure" />
                </AvGroup>
                <AvGroup>
                  <Label id="arrivalLabel" for="arrival">
                    Arrival
                  </Label>
                  <AvField id="flightdetails-my-suffix-arrival" type="text" name="arrival" />
                </AvGroup>
                <AvGroup>
                  <Label id="flightNumberLabel" for="flightNumber">
                    Flight Number
                  </Label>
                  <AvField id="flightdetails-my-suffix-flightNumber" type="text" name="flightNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="airlineNameLabel" for="airlineName">
                    Airline Name
                  </Label>
                  <AvField id="flightdetails-my-suffix-airlineName" type="text" name="airlineName" />
                </AvGroup>
                <AvGroup>
                  <Label id="departureTimeLabel" for="departureTime">
                    Departure Time
                  </Label>
                  <AvField id="flightdetails-my-suffix-departureTime" type="text" name="departureTime" />
                </AvGroup>
                <AvGroup>
                  <Label id="arrivalTimeLabel" for="arrivalTime">
                    Arrival Time
                  </Label>
                  <AvField id="flightdetails-my-suffix-arrivalTime" type="text" name="arrivalTime" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel">Type</Label>
                  <AvInput
                    id="flightdetails-my-suffix-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && flightdetails.type) || 'OUTBOUND'}
                  >
                    <option value="OUTBOUND">OUTBOUND</option>
                    <option value="INBOUND">INBOUND</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="flightclassLabel">Flightclass</Label>
                  <AvInput
                    id="flightdetails-my-suffix-flightclass"
                    type="select"
                    className="form-control"
                    name="flightclass"
                    value={(!isNew && flightdetails.flightclass) || 'ECONOMY'}
                  >
                    <option value="ECONOMY">ECONOMY</option>
                    <option value="BUSINESS">BUSINESS</option>
                    <option value="FIRST">FIRST</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="price">
                    Price
                  </Label>
                  <AvField id="flightdetails-my-suffix-price" type="text" name="price" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/flightdetails-my-suffix" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  tripmasters: storeState.tripmaster.entities,
  flightdetails: storeState.flightdetails.entity,
  loading: storeState.flightdetails.loading,
  updating: storeState.flightdetails.updating
});

const mapDispatchToProps = {
  getTripmasters,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FlightdetailsMySuffixUpdate);
