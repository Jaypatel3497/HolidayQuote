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
import { getEntity, updateEntity, createEntity, reset } from './hoteldetails-my-suffix.reducer';
import { IHoteldetailsMySuffix } from 'app/shared/model/hoteldetails-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IHoteldetailsMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IHoteldetailsMySuffixUpdateState {
  isNew: boolean;
  tripmasterId: number;
}

export class HoteldetailsMySuffixUpdate extends React.Component<IHoteldetailsMySuffixUpdateProps, IHoteldetailsMySuffixUpdateState> {
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
      const { hoteldetails } = this.props;
      const entity = {
        ...hoteldetails,
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
    this.props.history.push('/entity/hoteldetails-my-suffix');
  };

  render() {
    const isInvalid = false;
    const { hoteldetails, tripmasters, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="app4App.hoteldetails.home.createOrEditLabel">Create or edit a Hoteldetails</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : hoteldetails} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="hoteldetails-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="hotelNameLabel" for="hotelName">
                    Hotel Name
                  </Label>
                  <AvField id="hoteldetails-my-suffix-hotelName" type="text" name="hotelName" />
                </AvGroup>
                <AvGroup>
                  <Label id="hotelTpIdLabel" for="hotelTpId">
                    Hotel Tp Id
                  </Label>
                  <AvField id="hoteldetails-my-suffix-hotelTpId" type="text" name="hotelTpId" />
                </AvGroup>
                <AvGroup>
                  <Label id="categoryLabel">Category</Label>
                  <AvInput
                    id="hoteldetails-my-suffix-category"
                    type="select"
                    className="form-control"
                    name="category"
                    value={(!isNew && hoteldetails.category) || 'STANDARD'}
                  >
                    <option value="STANDARD">STANDARD</option>
                    <option value="DELUX">DELUX</option>
                    <option value="LUXURY">LUXURY</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="starLabel">Star</Label>
                  <AvInput
                    id="hoteldetails-my-suffix-star"
                    type="select"
                    className="form-control"
                    name="star"
                    value={(!isNew && hoteldetails.star) || 'TWO'}
                  >
                    <option value="TWO">TWO</option>
                    <option value="THREE">THREE</option>
                    <option value="FOUR">FOUR</option>
                    <option value="FIVE">FIVE</option>
                    <option value="UNKNOWN">UNKNOWN</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="city">
                    City
                  </Label>
                  <AvField id="hoteldetails-my-suffix-city" type="text" name="city" />
                </AvGroup>
                <AvGroup>
                  <Label id="locationLabel" for="location">
                    Location
                  </Label>
                  <AvField id="hoteldetails-my-suffix-location" type="text" name="location" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/hoteldetails-my-suffix" replace color="info">
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
  hoteldetails: storeState.hoteldetails.entity,
  loading: storeState.hoteldetails.loading,
  updating: storeState.hoteldetails.updating
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

export default connect(mapStateToProps, mapDispatchToProps)(HoteldetailsMySuffixUpdate);
