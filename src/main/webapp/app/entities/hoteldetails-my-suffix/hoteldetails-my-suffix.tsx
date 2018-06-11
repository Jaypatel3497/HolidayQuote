import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './hoteldetails-my-suffix.reducer';
import { IHoteldetailsMySuffix } from 'app/shared/model/hoteldetails-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHoteldetailsMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class HoteldetailsMySuffix extends React.Component<IHoteldetailsMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { hoteldetailsList, match } = this.props;
    return (
      <div>
        <h2 id="hoteldetails-my-suffix-heading">
          Hoteldetails
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Hoteldetails
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Hotel Name</th>
                <th>Hotel Tp Id</th>
                <th>Category</th>
                <th>Star</th>
                <th>City</th>
                <th>Location</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {hoteldetailsList.map((hoteldetails, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${hoteldetails.id}`} color="link" size="sm">
                      {hoteldetails.id}
                    </Button>
                  </td>
                  <td>{hoteldetails.hotelName}</td>
                  <td>{hoteldetails.hotelTpId}</td>
                  <td>{hoteldetails.category}</td>
                  <td>{hoteldetails.star}</td>
                  <td>{hoteldetails.city}</td>
                  <td>{hoteldetails.location}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${hoteldetails.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${hoteldetails.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${hoteldetails.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ hoteldetails }: IRootState) => ({
  hoteldetailsList: hoteldetails.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(HoteldetailsMySuffix);
