export interface ICustomerMySuffix {
  id?: number;
  name?: string;
  email?: string;
  contactNumber?: string;
  city?: string;
}

export const defaultValue: Readonly<ICustomerMySuffix> = {};
