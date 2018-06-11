import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import hoteldetails, {
  HoteldetailsMySuffixState
} from 'app/entities/hoteldetails-my-suffix/hoteldetails-my-suffix.reducer';
// prettier-ignore
import customer, {
  CustomerMySuffixState
} from 'app/entities/customer-my-suffix/customer-my-suffix.reducer';
// prettier-ignore
import tripmaster, {
  TripmasterMySuffixState
} from 'app/entities/tripmaster-my-suffix/tripmaster-my-suffix.reducer';
// prettier-ignore
import flightdetails, {
  FlightdetailsMySuffixState
} from 'app/entities/flightdetails-my-suffix/flightdetails-my-suffix.reducer';
// prettier-ignore
import itinerary, {
  ItineraryMySuffixState
} from 'app/entities/itinerary-my-suffix/itinerary-my-suffix.reducer';
// prettier-ignore
import termsConditions, {
  TermsConditionsMySuffixState
} from 'app/entities/terms-conditions-my-suffix/terms-conditions-my-suffix.reducer';
// prettier-ignore
import cancellationPolicy, {
  CancellationPolicyMySuffixState
} from 'app/entities/cancellation-policy-my-suffix/cancellation-policy-my-suffix.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly hoteldetails: HoteldetailsMySuffixState;
  readonly customer: CustomerMySuffixState;
  readonly tripmaster: TripmasterMySuffixState;
  readonly flightdetails: FlightdetailsMySuffixState;
  readonly itinerary: ItineraryMySuffixState;
  readonly termsConditions: TermsConditionsMySuffixState;
  readonly cancellationPolicy: CancellationPolicyMySuffixState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  hoteldetails,
  customer,
  tripmaster,
  flightdetails,
  itinerary,
  termsConditions,
  cancellationPolicy,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
