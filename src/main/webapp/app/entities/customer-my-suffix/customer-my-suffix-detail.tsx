import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer-my-suffix.reducer';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CustomerMySuffixDetail extends React.Component<ICustomerMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customer } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Customer [<b>{customer.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{customer.name}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{customer.email}</dd>
            <dt>
              <span id="contactNumber">Contact Number</span>
            </dt>
            <dd>{customer.contactNumber}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{customer.city}</dd>
          </dl>
          <Button tag={Link} to="/entity/customer-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/customer-my-suffix/${customer.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ customer }: IRootState) => ({
  customer: customer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerMySuffixDetail);
