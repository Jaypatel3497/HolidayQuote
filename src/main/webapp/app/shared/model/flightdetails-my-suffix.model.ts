import { ITripmasterMySuffix } from './tripmaster-my-suffix.model';

export const enum FlightType {
  OUTBOUND = 'OUTBOUND',
  INBOUND = 'INBOUND'
}

export const enum FlightClass {
  ECONOMY = 'ECONOMY',
  BUSINESS = 'BUSINESS',
  FIRST = 'FIRST'
}

export interface IFlightdetailsMySuffix {
  id?: number;
  departure?: string;
  arrival?: string;
  flightNumber?: string;
  airlineName?: string;
  departureTime?: string;
  arrivalTime?: string;
  type?: FlightType;
  flightclass?: FlightClass;
  price?: string;
  tripmasters?: ITripmasterMySuffix[];
}

export const defaultValue: Readonly<IFlightdetailsMySuffix> = {};
