import { ITripmasterMySuffix } from './tripmaster-my-suffix.model';

export const enum HotelCategory {
  STANDARD = 'STANDARD',
  DELUX = 'DELUX',
  LUXURY = 'LUXURY'
}

export const enum HotelStar {
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  UNKNOWN = 'UNKNOWN'
}

export interface IHoteldetailsMySuffix {
  id?: number;
  hotelName?: string;
  hotelTpId?: string;
  category?: HotelCategory;
  star?: HotelStar;
  city?: string;
  location?: string;
  tripmasters?: ITripmasterMySuffix[];
}

export const defaultValue: Readonly<IHoteldetailsMySuffix> = {};
