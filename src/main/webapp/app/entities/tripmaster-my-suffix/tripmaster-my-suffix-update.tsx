import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { getEntities as getCustomers } from 'app/entities/customer-my-suffix/customer-my-suffix.reducer';
import { IFlightdetailsMySuffix } from 'app/shared/model/flightdetails-my-suffix.model';
import { getEntities as getFlightdetails } from 'app/entities/flightdetails-my-suffix/flightdetails-my-suffix.reducer';
import { IHoteldetailsMySuffix } from 'app/shared/model/hoteldetails-my-suffix.model';
import { getEntities as getHoteldetails } from 'app/entities/hoteldetails-my-suffix/hoteldetails-my-suffix.reducer';
import { ITermsConditionsMySuffix } from 'app/shared/model/terms-conditions-my-suffix.model';
import { getEntities as getTermsConditions } from 'app/entities/terms-conditions-my-suffix/terms-conditions-my-suffix.reducer';
import { ICancellationPolicyMySuffix } from 'app/shared/model/cancellation-policy-my-suffix.model';
import { getEntities as getCancellationPolicies } from 'app/entities/cancellation-policy-my-suffix/cancellation-policy-my-suffix.reducer';
import { IItineraryMySuffix } from 'app/shared/model/itinerary-my-suffix.model';
import { getEntities as getItineraries } from 'app/entities/itinerary-my-suffix/itinerary-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tripmaster-my-suffix.reducer';
import { ITripmasterMySuffix } from 'app/shared/model/tripmaster-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ITripmasterMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITripmasterMySuffixUpdateState {
  isNew: boolean;
  idsflightdetails: any[];
  idshoteldetails: any[];
  idstermsconditions: any[];
  idscancellationPolicy: any[];
  idsitinerary: any[];
  customerId: number;
}

export class TripmasterMySuffixUpdate extends React.Component<ITripmasterMySuffixUpdateProps, ITripmasterMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsflightdetails: [],
      idshoteldetails: [],
      idstermsconditions: [],
      idscancellationPolicy: [],
      idsitinerary: [],
      customerId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCustomers();
    this.props.getFlightdetails();
    this.props.getHoteldetails();
    this.props.getTermsConditions();
    this.props.getCancellationPolicies();
    this.props.getItineraries();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tripmaster } = this.props;
      const entity = {
        ...tripmaster,
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
    this.props.history.push('/entity/tripmaster-my-suffix');
  };

  customerUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        customerId: -1
      });
    } else {
      for (const i in this.props.customers) {
        if (id === this.props.customers[i].id.toString()) {
          this.setState({
            customerId: this.props.customers[i].id
          });
        }
      }
    }
  };

  flightdetailsUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsflightdetails: keysToValues(selected, this.props.flightdetails, 'id')
    });
  };

  hoteldetailsUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idshoteldetails: keysToValues(selected, this.props.hoteldetails, 'id')
    });
  };

  termsconditionsUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idstermsconditions: keysToValues(selected, this.props.termsConditions, 'id')
    });
  };

  cancellationPolicyUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idscancellationPolicy: keysToValues(selected, this.props.cancellationPolicies, 'id')
    });
  };

  itineraryUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsitinerary: keysToValues(selected, this.props.itineraries, 'id')
    });
  };

  displayflightdetails(value: any) {
    if (this.state.idsflightdetails && this.state.idsflightdetails.length !== 0) {
      const list = [];
      for (const i in this.state.idsflightdetails) {
        if (this.state.idsflightdetails[i]) {
          list.push(this.state.idsflightdetails[i].id);
        }
      }
      return list;
    }
    if (value.flightdetails && value.flightdetails.length !== 0) {
      const list = [];
      for (const i in value.flightdetails) {
        if (value.flightdetails[i]) {
          list.push(value.flightdetails[i].id);
        }
      }
      this.setState({
        idsflightdetails: keysToValues(list, this.props.flightdetails, 'id')
      });
      return list;
    }
    return null;
  }

  displayhoteldetails(value: any) {
    if (this.state.idshoteldetails && this.state.idshoteldetails.length !== 0) {
      const list = [];
      for (const i in this.state.idshoteldetails) {
        if (this.state.idshoteldetails[i]) {
          list.push(this.state.idshoteldetails[i].id);
        }
      }
      return list;
    }
    if (value.hoteldetails && value.hoteldetails.length !== 0) {
      const list = [];
      for (const i in value.hoteldetails) {
        if (value.hoteldetails[i]) {
          list.push(value.hoteldetails[i].id);
        }
      }
      this.setState({
        idshoteldetails: keysToValues(list, this.props.hoteldetails, 'id')
      });
      return list;
    }
    return null;
  }

  displaytermsconditions(value: any) {
    if (this.state.idstermsconditions && this.state.idstermsconditions.length !== 0) {
      const list = [];
      for (const i in this.state.idstermsconditions) {
        if (this.state.idstermsconditions[i]) {
          list.push(this.state.idstermsconditions[i].id);
        }
      }
      return list;
    }
    if (value.termsconditions && value.termsconditions.length !== 0) {
      const list = [];
      for (const i in value.termsconditions) {
        if (value.termsconditions[i]) {
          list.push(value.termsconditions[i].id);
        }
      }
      this.setState({
        idstermsconditions: keysToValues(list, this.props.termsConditions, 'id')
      });
      return list;
    }
    return null;
  }

  displaycancellationPolicy(value: any) {
    if (this.state.idscancellationPolicy && this.state.idscancellationPolicy.length !== 0) {
      const list = [];
      for (const i in this.state.idscancellationPolicy) {
        if (this.state.idscancellationPolicy[i]) {
          list.push(this.state.idscancellationPolicy[i].id);
        }
      }
      return list;
    }
    if (value.cancellationPolicies && value.cancellationPolicies.length !== 0) {
      const list = [];
      for (const i in value.cancellationPolicies) {
        if (value.cancellationPolicies[i]) {
          list.push(value.cancellationPolicies[i].id);
        }
      }
      this.setState({
        idscancellationPolicy: keysToValues(list, this.props.cancellationPolicies, 'id')
      });
      return list;
    }
    return null;
  }

  displayitinerary(value: any) {
    if (this.state.idsitinerary && this.state.idsitinerary.length !== 0) {
      const list = [];
      for (const i in this.state.idsitinerary) {
        if (this.state.idsitinerary[i]) {
          list.push(this.state.idsitinerary[i].id);
        }
      }
      return list;
    }
    if (value.itineraries && value.itineraries.length !== 0) {
      const list = [];
      for (const i in value.itineraries) {
        if (value.itineraries[i]) {
          list.push(value.itineraries[i].id);
        }
      }
      this.setState({
        idsitinerary: keysToValues(list, this.props.itineraries, 'id')
      });
      return list;
    }
    return null;
  }

  render() {
    const isInvalid = false;
    const {
      tripmaster,
      customers,
      flightdetails,
      hoteldetails,
      termsConditions,
      cancellationPolicies,
      itineraries,
      loading,
      updating
    } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="app4App.tripmaster.home.createOrEditLabel">Create or edit a Tripmaster</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tripmaster} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="tripmaster-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="emailtitleLabel" for="emailtitle">
                    Emailtitle
                  </Label>
                  <AvField id="tripmaster-my-suffix-emailtitle" type="text" name="emailtitle" />
                </AvGroup>
                <AvGroup>
                  <Label id="noOfNightsLabel" for="noOfNights">
                    No Of Nights
                  </Label>
                  <AvField id="tripmaster-my-suffix-noOfNights" type="number" className="form-control" name="noOfNights" />
                </AvGroup>
                <AvGroup>
                  <Label id="fromLabel" for="from">
                    From
                  </Label>
                  <AvField id="tripmaster-my-suffix-from" type="text" name="from" />
                </AvGroup>
                <AvGroup>
                  <Label id="citiesLabel" for="cities">
                    Cities
                  </Label>
                  <AvField id="tripmaster-my-suffix-cities" type="text" name="cities" />
                </AvGroup>
                <AvGroup>
                  <Label for="customer.id">Customer</Label>
                  <AvInput
                    id="tripmaster-my-suffix-customer"
                    type="select"
                    className="form-control"
                    name="customerId"
                    onChange={this.customerUpdate}
                  >
                    <option value="" key="0" />
                    {customers
                      ? customers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="flightdetails">Flightdetails</Label>
                  <AvInput
                    id="tripmaster-my-suffix-flightdetails"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeflightdetails"
                    value={this.displayflightdetails(tripmaster)}
                    onChange={this.flightdetailsUpdate}
                  >
                    <option value="" key="0" />
                    {flightdetails
                      ? flightdetails.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="tripmaster-my-suffix-flightdetails" type="hidden" name="flightdetails" value={this.state.idsflightdetails} />
                </AvGroup>
                <AvGroup>
                  <Label for="hoteldetails">Hoteldetails</Label>
                  <AvInput
                    id="tripmaster-my-suffix-hoteldetails"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakehoteldetails"
                    value={this.displayhoteldetails(tripmaster)}
                    onChange={this.hoteldetailsUpdate}
                  >
                    <option value="" key="0" />
                    {hoteldetails
                      ? hoteldetails.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="tripmaster-my-suffix-hoteldetails" type="hidden" name="hoteldetails" value={this.state.idshoteldetails} />
                </AvGroup>
                <AvGroup>
                  <Label for="termsConditions">Termsconditions</Label>
                  <AvInput
                    id="tripmaster-my-suffix-termsconditions"
                    type="select"
                    multiple
                    className="form-control"
                    name="faketermsConditions"
                    value={this.displaytermsconditions(tripmaster)}
                    onChange={this.termsconditionsUpdate}
                  >
                    <option value="" key="0" />
                    {termsConditions
                      ? termsConditions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput
                    id="tripmaster-my-suffix-termsconditions"
                    type="hidden"
                    name="termsconditions"
                    value={this.state.idstermsconditions}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="cancellationPolicies">Cancellation Policy</Label>
                  <AvInput
                    id="tripmaster-my-suffix-cancellationPolicy"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakecancellationPolicies"
                    value={this.displaycancellationPolicy(tripmaster)}
                    onChange={this.cancellationPolicyUpdate}
                  >
                    <option value="" key="0" />
                    {cancellationPolicies
                      ? cancellationPolicies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput
                    id="tripmaster-my-suffix-cancellationPolicy"
                    type="hidden"
                    name="cancellationPolicies"
                    value={this.state.idscancellationPolicy}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="itineraries">Itinerary</Label>
                  <AvInput
                    id="tripmaster-my-suffix-itinerary"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeitineraries"
                    value={this.displayitinerary(tripmaster)}
                    onChange={this.itineraryUpdate}
                  >
                    <option value="" key="0" />
                    {itineraries
                      ? itineraries.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="tripmaster-my-suffix-itinerary" type="hidden" name="itineraries" value={this.state.idsitinerary} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/tripmaster-my-suffix" replace color="info">
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
  customers: storeState.customer.entities,
  flightdetails: storeState.flightdetails.entities,
  hoteldetails: storeState.hoteldetails.entities,
  termsConditions: storeState.termsConditions.entities,
  cancellationPolicies: storeState.cancellationPolicy.entities,
  itineraries: storeState.itinerary.entities,
  tripmaster: storeState.tripmaster.entity,
  loading: storeState.tripmaster.loading,
  updating: storeState.tripmaster.updating
});

const mapDispatchToProps = {
  getCustomers,
  getFlightdetails,
  getHoteldetails,
  getTermsConditions,
  getCancellationPolicies,
  getItineraries,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripmasterMySuffixUpdate);
