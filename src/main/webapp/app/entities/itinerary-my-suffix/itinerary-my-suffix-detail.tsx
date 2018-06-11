import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './itinerary-my-suffix.reducer';
import { IItineraryMySuffix } from 'app/shared/model/itinerary-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IItineraryMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ItineraryMySuffixDetail extends React.Component<IItineraryMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { itinerary } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Itinerary [<b>{itinerary.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{itinerary.title}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{itinerary.description}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{itinerary.city}</dd>
          </dl>
          <Button tag={Link} to="/entity/itinerary-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/itinerary-my-suffix/${itinerary.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ itinerary }: IRootState) => ({
  itinerary: itinerary.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryMySuffixDetail);
