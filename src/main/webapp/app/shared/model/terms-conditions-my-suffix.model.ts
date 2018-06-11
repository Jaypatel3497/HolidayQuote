import { ITripmasterMySuffix } from './tripmaster-my-suffix.model';

export interface ITermsConditionsMySuffix {
  id?: number;
  descritption?: string;
  tripmasters?: ITripmasterMySuffix[];
}

export const defaultValue: Readonly<ITermsConditionsMySuffix> = {};
