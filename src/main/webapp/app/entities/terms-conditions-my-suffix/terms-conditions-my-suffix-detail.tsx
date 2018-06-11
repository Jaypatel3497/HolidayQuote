import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './terms-conditions-my-suffix.reducer';
import { ITermsConditionsMySuffix } from 'app/shared/model/terms-conditions-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITermsConditionsMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TermsConditionsMySuffixDetail extends React.Component<ITermsConditionsMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { termsConditions } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            TermsConditions [<b>{termsConditions.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="descritption">Descritption</span>
            </dt>
            <dd>{termsConditions.descritption}</dd>
          </dl>
          <Button tag={Link} to="/entity/terms-conditions-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/terms-conditions-my-suffix/${termsConditions.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ termsConditions }: IRootState) => ({
  termsConditions: termsConditions.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditionsMySuffixDetail);
