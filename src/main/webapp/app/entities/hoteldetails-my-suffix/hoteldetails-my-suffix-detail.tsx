import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './hoteldetails-my-suffix.reducer';
import { IHoteldetailsMySuffix } from 'app/shared/model/hoteldetails-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHoteldetailsMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class HoteldetailsMySuffixDetail extends React.Component<IHoteldetailsMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { hoteldetails } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Hoteldetails [<b>{hoteldetails.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="hotelName">Hotel Name</span>
            </dt>
            <dd>{hoteldetails.hotelName}</dd>
            <dt>
              <span id="hotelTpId">Hotel Tp Id</span>
            </dt>
            <dd>{hoteldetails.hotelTpId}</dd>
            <dt>
              <span id="category">Category</span>
            </dt>
            <dd>{hoteldetails.category}</dd>
            <dt>
              <span id="star">Star</span>
            </dt>
            <dd>{hoteldetails.star}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{hoteldetails.city}</dd>
            <dt>
              <span id="location">Location</span>
            </dt>
            <dd>{hoteldetails.location}</dd>
          </dl>
          <Button tag={Link} to="/entity/hoteldetails-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/hoteldetails-my-suffix/${hoteldetails.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ hoteldetails }: IRootState) => ({
  hoteldetails: hoteldetails.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HoteldetailsMySuffixDetail);
