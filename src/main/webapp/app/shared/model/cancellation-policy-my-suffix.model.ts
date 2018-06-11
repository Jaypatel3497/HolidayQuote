import { ITripmasterMySuffix } from './tripmaster-my-suffix.model';

export interface ICancellationPolicyMySuffix {
  id?: number;
  descritption?: string;
  tripmasters?: ITripmasterMySuffix[];
}

export const defaultValue: Readonly<ICancellationPolicyMySuffix> = {};
