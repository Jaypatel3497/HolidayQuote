import { IFlightdetailsMySuffix } from './flightdetails-my-suffix.model';
import { IHoteldetailsMySuffix } from './hoteldetails-my-suffix.model';
import { ITermsConditionsMySuffix } from './terms-conditions-my-suffix.model';
import { ICancellationPolicyMySuffix } from './cancellation-policy-my-suffix.model';
import { IItineraryMySuffix } from './itinerary-my-suffix.model';

export interface ITripmasterMySuffix {
  id?: number;
  emailtitle?: string;
  noOfNights?: number;
  from?: string;
  cities?: string;
  customerId?: number;
  flightdetails?: IFlightdetailsMySuffix[];
  hoteldetails?: IHoteldetailsMySuffix[];
  termsconditions?: ITermsConditionsMySuffix[];
  cancellationPolicies?: ICancellationPolicyMySuffix[];
  itineraries?: IItineraryMySuffix[];
}

export const defaultValue: Readonly<ITripmasterMySuffix> = {};
