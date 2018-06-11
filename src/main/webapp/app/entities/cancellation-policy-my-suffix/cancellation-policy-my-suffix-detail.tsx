import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cancellation-policy-my-suffix.reducer';
import { ICancellationPolicyMySuffix } from 'app/shared/model/cancellation-policy-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICancellationPolicyMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CancellationPolicyMySuffixDetail extends React.Component<ICancellationPolicyMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cancellationPolicy } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            CancellationPolicy [<b>{cancellationPolicy.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="descritption">Descritption</span>
            </dt>
            <dd>{cancellationPolicy.descritption}</dd>
          </dl>
          <Button tag={Link} to="/entity/cancellation-policy-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/cancellation-policy-my-suffix/${cancellationPolicy.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ cancellationPolicy }: IRootState) => ({
  cancellationPolicy: cancellationPolicy.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CancellationPolicyMySuffixDetail);
