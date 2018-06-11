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
import { getEntity, updateEntity, createEntity, reset } from './terms-conditions-my-suffix.reducer';
import { ITermsConditionsMySuffix } from 'app/shared/model/terms-conditions-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ITermsConditionsMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITermsConditionsMySuffixUpdateState {
  isNew: boolean;
  tripmasterId: number;
}

export class TermsConditionsMySuffixUpdate extends React.Component<
  ITermsConditionsMySuffixUpdateProps,
  ITermsConditionsMySuffixUpdateState
> {
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
      const { termsConditions } = this.props;
      const entity = {
        ...termsConditions,
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
    this.props.history.push('/entity/terms-conditions-my-suffix');
  };

  render() {
    const isInvalid = false;
    const { termsConditions, tripmasters, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="app4App.termsConditions.home.createOrEditLabel">Create or edit a TermsConditions</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : termsConditions} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="terms-conditions-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="descritptionLabel" for="descritption">
                    Descritption
                  </Label>
                  <AvField id="terms-conditions-my-suffix-descritption" type="text" name="descritption" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/terms-conditions-my-suffix" replace color="info">
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
  termsConditions: storeState.termsConditions.entity,
  loading: storeState.termsConditions.loading,
  updating: storeState.termsConditions.updating
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

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditionsMySuffixUpdate);
