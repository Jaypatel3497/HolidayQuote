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
import { getEntity, updateEntity, createEntity, reset } from './itinerary-my-suffix.reducer';
import { IItineraryMySuffix } from 'app/shared/model/itinerary-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IItineraryMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IItineraryMySuffixUpdateState {
  isNew: boolean;
  tripmasterId: number;
}

export class ItineraryMySuffixUpdate extends React.Component<IItineraryMySuffixUpdateProps, IItineraryMySuffixUpdateState> {
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
      const { itinerary } = this.props;
      const entity = {
        ...itinerary,
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
    this.props.history.push('/entity/itinerary-my-suffix');
  };

  render() {
    const isInvalid = false;
    const { itinerary, tripmasters, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="app4App.itinerary.home.createOrEditLabel">Create or edit a Itinerary</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : itinerary} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="itinerary-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    Title
                  </Label>
                  <AvField id="itinerary-my-suffix-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    Description
                  </Label>
                  <AvField id="itinerary-my-suffix-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="city">
                    City
                  </Label>
                  <AvField id="itinerary-my-suffix-city" type="text" name="city" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/itinerary-my-suffix" replace color="info">
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
  itinerary: storeState.itinerary.entity,
  loading: storeState.itinerary.loading,
  updating: storeState.itinerary.updating
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

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryMySuffixUpdate);
