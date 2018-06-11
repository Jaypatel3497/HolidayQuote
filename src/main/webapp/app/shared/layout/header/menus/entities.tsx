import * as React from 'react';
import { DropdownItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/hoteldetails-my-suffix">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Hoteldetails My Suffix
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/customer-my-suffix">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Customer My Suffix
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/tripmaster-my-suffix">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Tripmaster My Suffix
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/flightdetails-my-suffix">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Flightdetails My Suffix
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/itinerary-my-suffix">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Itinerary My Suffix
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/terms-conditions-my-suffix">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Terms Conditions My Suffix
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/cancellation-policy-my-suffix">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Cancellation Policy My Suffix
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
