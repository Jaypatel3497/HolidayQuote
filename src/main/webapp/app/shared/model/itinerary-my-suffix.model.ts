import { ITripmasterMySuffix } from './tripmaster-my-suffix.model';

export interface IItineraryMySuffix {
  id?: number;
  title?: string;
  description?: string;
  city?: string;
  tripmasters?: ITripmasterMySuffix[];
}

export const defaultValue: Readonly<IItineraryMySuffix> = {};
