import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Custom Date Scalar Type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  /** Custom CPF Scalar Type */
  CPF: any;
  /** Custom CNPJ Scalar Type */
  CNPJ: any;
};





export enum GenderEnum {
  Male = 'MALE',
  Female = 'FEMALE'
}

export enum PreferedPronounEnum {
  Male = 'MALE',
  Female = 'FEMALE',
  Neutral = 'NEUTRAL'
}

export type Query = {
  __typename?: 'Query';
  status: Scalars['String'];
  PFfetchCustomers: Array<PfCustomer>;
  PFfetchCustomersById: Array<PfCustomer>;
  PFfetchCustomerById: PfCustomer;
  PJfetchCustomers: Array<PjCustomer>;
  PJfetchCustomersById: Array<PjCustomer>;
  PJfetchCustomerById: PjCustomer;
  PJfetchEmployees?: Maybe<Array<PfCustomer>>;
  fetchServices: Array<Service>;
  fetchServicesById: Array<Service>;
  fetchServiceById: Service;
  protectedQuery: Scalars['String'];
};


export type QueryPFfetchCustomersByIdArgs = {
  PFCustomerIDS: Array<Scalars['String']>;
};


export type QueryPFfetchCustomerByIdArgs = {
  PFCustomerID: Scalars['String'];
};


export type QueryPJfetchCustomersByIdArgs = {
  PJCustomerIDS: Array<Scalars['String']>;
};


export type QueryPJfetchCustomerByIdArgs = {
  PJCustomerID: Scalars['String'];
};


export type QueryPJfetchEmployeesArgs = {
  PJCustomerID: Scalars['String'];
};


export type QueryFetchServicesByIdArgs = {
  ServiceIDS: Array<Scalars['ID']>;
};


export type QueryFetchServiceByIdArgs = {
  ServiceID: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  PFaddCustomer: PfCustomer;
  PFremoveCustomers: Scalars['Boolean'];
  PFupdateCustomer: PfCustomer;
  PFaddAddress: PfCustomer;
  PFaddContact: PfCustomer;
  PFaddDisability: PfCustomer;
  PFaddProfessionalHistory: PfCustomer;
  PFaddLeaveHistory: PfCustomer;
  PFremoveAddresses: PfCustomer;
  PFremoveContacts: PfCustomer;
  PFremoveDisabilities: PfCustomer;
  PFremoveProfessionalHistory: PfCustomer;
  PFremoveLeaveHistory: PfCustomer;
  PFupdateAddress: PfCustomer;
  PFupdateContact: PfCustomer;
  PFupdateDisability: PfCustomer;
  PFupdateProfessionalHistory: PfCustomer;
  PFupdateLeaveHistory: PfCustomer;
  PFfetchDisabilityNomenclature?: Maybe<PfPossibleDisability>;
  PFfetchAttachmentUploadSignedURL: Scalars['String'];
  PJaddCustomer: PjCustomer;
  PJremoveCustomers: Scalars['Boolean'];
  PJupdateCustomer: PjCustomer;
  PJaddAddress: PjCustomer;
  PJaddContact: PjCustomer;
  PJaddActivityClassification: PjCustomer;
  PJremoveAddresses: PjCustomer;
  PJremoveContacts: PjCustomer;
  PJremoveActivityClassifications: PjCustomer;
  PJupdateAddress: PjCustomer;
  PJupdateContact: PjCustomer;
  PJupdateActivityClassification: PjCustomer;
  addService: Service;
  removeServices: Scalars['Boolean'];
  updateService: Service;
  register: User;
};


export type MutationPFaddCustomerArgs = {
  PFCustomer: PfCustomerInput;
};


export type MutationPFremoveCustomersArgs = {
  PFCustomerIDS: Array<Scalars['ID']>;
};


export type MutationPFupdateCustomerArgs = {
  PFCustomerID: Scalars['ID'];
  PFCustomer: PfCustomerUpdateInput;
};


export type MutationPFaddAddressArgs = {
  PFCustomerID: Scalars['ID'];
  PFAddress: PfAddressInput;
};


export type MutationPFaddContactArgs = {
  PFCustomerID: Scalars['ID'];
  PFContact: PfContactInput;
};


export type MutationPFaddDisabilityArgs = {
  PFCustomerID: Scalars['ID'];
  PFDisability: PfDisabilityInput;
};


export type MutationPFaddProfessionalHistoryArgs = {
  PFCustomerID: Scalars['ID'];
  PFProfessionalHistory: PfProfessionalHistoryInput;
};


export type MutationPFaddLeaveHistoryArgs = {
  PFProfessionalHistoryID: Scalars['ID'];
  PFLeaveHistory: PfLeaveHistoryInput;
};


export type MutationPFremoveAddressesArgs = {
  PFAddressIDS: Array<Scalars['ID']>;
};


export type MutationPFremoveContactsArgs = {
  PFContactIDS: Array<Scalars['ID']>;
};


export type MutationPFremoveDisabilitiesArgs = {
  PFDisabilityIDS: Array<Scalars['ID']>;
};


export type MutationPFremoveProfessionalHistoryArgs = {
  PFProfessionalHistoryIDS: Array<Scalars['ID']>;
};


export type MutationPFremoveLeaveHistoryArgs = {
  PFLeaveHistoryIDS: Array<Scalars['ID']>;
};


export type MutationPFupdateAddressArgs = {
  PFAddressID: Scalars['ID'];
  PFAddress: PfAddressUpdateInput;
};


export type MutationPFupdateContactArgs = {
  PFContactID: Scalars['ID'];
  PFContact: PfContactUpdateInput;
};


export type MutationPFupdateDisabilityArgs = {
  PFDisabilityID: Scalars['ID'];
  PFDisability: PfDisabilityUpdateInput;
};


export type MutationPFupdateProfessionalHistoryArgs = {
  PFProfessionalHistoryID: Scalars['ID'];
  PFProfessionalHistory: PfProfessionalHistoryUpdateInput;
};


export type MutationPFupdateLeaveHistoryArgs = {
  PFLeaveHistoryID: Scalars['ID'];
  PFLeaveHistory: PfLeaveHistoryUpdateInput;
};


export type MutationPFfetchDisabilityNomenclatureArgs = {
  CID: Scalars['String'];
};


export type MutationPFfetchAttachmentUploadSignedUrlArgs = {
  PFCustomerID: Scalars['ID'];
  PFAttachment: PfAttachmentInput;
};


export type MutationPJaddCustomerArgs = {
  PJCustomer: PjCustomerInput;
};


export type MutationPJremoveCustomersArgs = {
  PJCustomerIDS?: Maybe<Array<Scalars['ID']>>;
};


export type MutationPJupdateCustomerArgs = {
  PJCustomerID: Scalars['ID'];
  PJCustomer: PjCustomerUpdateInput;
};


export type MutationPJaddAddressArgs = {
  PJCustomerID: Scalars['ID'];
  PJAddress: PjAddressInput;
};


export type MutationPJaddContactArgs = {
  PJCustomerID: Scalars['ID'];
  PJContact: PjContactInput;
};


export type MutationPJaddActivityClassificationArgs = {
  PJCustomerID: Scalars['ID'];
  PJActivityClassification: PjActivityClassificationInput;
};


export type MutationPJremoveAddressesArgs = {
  PJAddressIDS: Array<Scalars['ID']>;
};


export type MutationPJremoveContactsArgs = {
  PJContactIDS: Array<Scalars['ID']>;
};


export type MutationPJremoveActivityClassificationsArgs = {
  PJActivityIDS: Array<Scalars['ID']>;
};


export type MutationPJupdateAddressArgs = {
  PJAddressID: Scalars['ID'];
  PJAddress: PjAddressUpdateInput;
};


export type MutationPJupdateContactArgs = {
  PJContactID: Scalars['ID'];
  PJContact: PjContactUpdateInput;
};


export type MutationPJupdateActivityClassificationArgs = {
  PJActivityID: Scalars['ID'];
  PJActivityClassification: PjActivityClassificationUpdateInput;
};


export type MutationAddServiceArgs = {
  Service: ServiceInput;
  makeCalculations?: Maybe<Scalars['Boolean']>;
};


export type MutationRemoveServicesArgs = {
  ServiceIDS?: Maybe<Array<Scalars['ID']>>;
};


export type MutationUpdateServiceArgs = {
  ServiceID: Scalars['ID'];
  Service: ServiceUpdateInput;
  makeCalculations?: Maybe<Scalars['Boolean']>;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type PfCustomer = {
  __typename?: 'PFCustomer';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  birthDate: Scalars['Date'];
  CPF: Scalars['CPF'];
  gender: GenderEnum;
  preferedPronoun: PreferedPronounEnum;
  isActive: Scalars['Boolean'];
  hasDisability: Scalars['Boolean'];
  PFextraInfo: PfExtraInfo;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PfExtraInfo = {
  __typename?: 'PFExtraInfo';
  id: Scalars['ID'];
  contacts?: Maybe<Array<PfContact>>;
  addresses?: Maybe<Array<PfAddress>>;
  professionalHistory?: Maybe<Array<PfProfessionalHistory>>;
  disabilities?: Maybe<Array<PfDisability>>;
  attachments?: Maybe<Array<PfAttachment>>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PfAttachment = {
  __typename?: 'PFAttachment';
  id: Scalars['ID'];
  key: Scalars['String'];
  comments?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PfDisability = {
  __typename?: 'PFDisability';
  id: Scalars['ID'];
  CID: Scalars['String'];
  nomenclature?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PfContact = {
  __typename?: 'PFContact';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  isWhatsApp: Scalars['Boolean'];
  isMain: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PfAddress = {
  __typename?: 'PFAddress';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  CEP: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  city: Scalars['String'];
  district?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  number: Scalars['String'];
  complement?: Maybe<Scalars['String']>;
  isMain: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PfLeaveHistory = {
  __typename?: 'PFLeaveHistory';
  id: Scalars['ID'];
  leaveDate: Scalars['Date'];
  returnDate?: Maybe<Scalars['Date']>;
  reason: Scalars['String'];
  isINSS: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PfProfessionalHistory = {
  __typename?: 'PFProfessionalHistory';
  id: Scalars['ID'];
  company: PjCustomer;
  office: Scalars['String'];
  CBO: Scalars['String'];
  admissionDate: Scalars['Date'];
  startDate?: Maybe<Scalars['Date']>;
  recisionDate?: Maybe<Scalars['Date']>;
  EPI: Scalars['Boolean'];
  leaveHistory?: Maybe<Array<PfLeaveHistory>>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PfPossibleDisability = {
  __typename?: 'PFPossibleDisability';
  CID: Scalars['String'];
  nomenclature: Scalars['String'];
};

export type PfDisabilityInput = {
  CID: Scalars['String'];
  nomenclature?: Maybe<Scalars['String']>;
};

export type PfContactInput = {
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  isWhatsApp?: Maybe<Scalars['Boolean']>;
  isMain?: Maybe<Scalars['Boolean']>;
};

export type PfAddressInput = {
  name: Scalars['String'];
  CEP: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  city: Scalars['String'];
  district?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  number: Scalars['String'];
  complement?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
};

export type PfLeaveHistoryInput = {
  leaveDate: Scalars['Date'];
  returnDate?: Maybe<Scalars['Date']>;
  reason: Scalars['String'];
  isINSS?: Maybe<Scalars['Boolean']>;
};

export type PfProfessionalHistoryInput = {
  companyID: Scalars['ID'];
  office: Scalars['String'];
  CBO: Scalars['String'];
  admissionDate: Scalars['Date'];
  startDate?: Maybe<Scalars['Date']>;
  recisionDate?: Maybe<Scalars['Date']>;
  EPI?: Maybe<Scalars['Boolean']>;
};

export type PfCustomerInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  birthDate: Scalars['Date'];
  CPF: Scalars['CPF'];
  gender: GenderEnum;
  preferedPronoun: PreferedPronounEnum;
  isActive?: Maybe<Scalars['Boolean']>;
  hasDisability?: Maybe<Scalars['Boolean']>;
};

export type PfAttachmentInput = {
  key: Scalars['String'];
  comments?: Maybe<Scalars['String']>;
};

export type PfCustomerUpdateInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  CPF?: Maybe<Scalars['CPF']>;
  gender?: Maybe<GenderEnum>;
  preferedPronoun?: Maybe<PreferedPronounEnum>;
  isActive?: Maybe<Scalars['Boolean']>;
  hasDisability?: Maybe<Scalars['Boolean']>;
};

export type PfDisabilityUpdateInput = {
  CID?: Maybe<Scalars['String']>;
  nomenclature?: Maybe<Scalars['String']>;
};

export type PfContactUpdateInput = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  isWhatsApp?: Maybe<Scalars['Boolean']>;
  isMain?: Maybe<Scalars['Boolean']>;
};

export type PfAddressUpdateInput = {
  name?: Maybe<Scalars['String']>;
  CEP?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  complement?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
};

export type PfLeaveHistoryUpdateInput = {
  leaveDate?: Maybe<Scalars['Date']>;
  returnDate?: Maybe<Scalars['Date']>;
  reason?: Maybe<Scalars['String']>;
  isINSS?: Maybe<Scalars['Boolean']>;
};

export type PfProfessionalHistoryUpdateInput = {
  companyID?: Maybe<Scalars['ID']>;
  office?: Maybe<Scalars['String']>;
  CBO?: Maybe<Scalars['String']>;
  admissionDate?: Maybe<Scalars['Date']>;
  startDate?: Maybe<Scalars['Date']>;
  recisionDate?: Maybe<Scalars['Date']>;
  EPI?: Maybe<Scalars['Boolean']>;
};

export type PjCustomer = {
  __typename?: 'PJCustomer';
  id: Scalars['ID'];
  legalName: Scalars['String'];
  tradingName: Scalars['String'];
  CNPJ: Scalars['CNPJ'];
  PJextraInfo: PjExtraInfo;
  isActive?: Maybe<Scalars['Boolean']>;
  isAssociated?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PjExtraInfo = {
  __typename?: 'PJExtraInfo';
  id: Scalars['ID'];
  contacts?: Maybe<Array<PjContact>>;
  addresses?: Maybe<Array<PjAddress>>;
  activities?: Maybe<Array<PjActivityClassification>>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PjContact = {
  __typename?: 'PJContact';
  id: Scalars['ID'];
  contactEmployeeName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  isWhatsApp: Scalars['Boolean'];
  isMain: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PjAddress = {
  __typename?: 'PJAddress';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  CEP: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  city: Scalars['String'];
  district?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  number: Scalars['String'];
  complement?: Maybe<Scalars['String']>;
  isMain: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PjActivityClassification = {
  __typename?: 'PJActivityClassification';
  id: Scalars['ID'];
  CNAE: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isMain: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PjCustomerInput = {
  legalName: Scalars['String'];
  tradingName: Scalars['String'];
  CNPJ: Scalars['CNPJ'];
  isActive?: Maybe<Scalars['Boolean']>;
  isAssociated?: Maybe<Scalars['Boolean']>;
};

export type PjAddressInput = {
  name: Scalars['String'];
  CEP: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  city: Scalars['String'];
  district?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  number: Scalars['String'];
  complement?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
};

export type PjContactInput = {
  contactEmployeeName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  isWhatsApp?: Maybe<Scalars['Boolean']>;
  isMain?: Maybe<Scalars['Boolean']>;
};

export type PjActivityClassificationInput = {
  CNAE: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
};

export type PjCustomerUpdateInput = {
  legalName?: Maybe<Scalars['String']>;
  tradingName?: Maybe<Scalars['String']>;
  CNPJ?: Maybe<Scalars['CNPJ']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isAssociated?: Maybe<Scalars['Boolean']>;
};

export type PjAddressUpdateInput = {
  name?: Maybe<Scalars['String']>;
  CEP?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  complement?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
};

export type PjContactUpdateInput = {
  contactEmployeeName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  isWhatsApp?: Maybe<Scalars['Boolean']>;
  isMain?: Maybe<Scalars['Boolean']>;
};

export type PjActivityClassificationUpdateInput = {
  CNAE?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
};

export type Service = {
  __typename?: 'Service';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  deliveryTime?: Maybe<Scalars['Int']>;
  baseCost?: Maybe<Scalars['Float']>;
  baseSaleValue?: Maybe<Scalars['Float']>;
  associatedSaleValue?: Maybe<Scalars['Float']>;
  fixedRentability?: Maybe<Scalars['Float']>;
  percentualRentability?: Maybe<Scalars['Float']>;
  fixedAssociatedDiscount?: Maybe<Scalars['Float']>;
  percentualAssociatedDiscount?: Maybe<Scalars['Float']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type ServiceInput = {
  name: Scalars['String'];
  code: Scalars['String'];
  description: Scalars['String'];
  deliveryTime?: Maybe<Scalars['Int']>;
  baseSaleValue?: Maybe<Scalars['Float']>;
  associatedSaleValue?: Maybe<Scalars['Float']>;
  baseCost?: Maybe<Scalars['Float']>;
  fixedRentability?: Maybe<Scalars['Float']>;
  percentualRentability?: Maybe<Scalars['Float']>;
  fixedAssociatedDiscount?: Maybe<Scalars['Float']>;
  percentualAssociatedDiscount?: Maybe<Scalars['Float']>;
};

export type ServiceUpdateInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  deliveryTime?: Maybe<Scalars['Int']>;
  baseSaleValue?: Maybe<Scalars['Float']>;
  associatedSaleValue?: Maybe<Scalars['Float']>;
  baseCost?: Maybe<Scalars['Float']>;
  fixedRentability?: Maybe<Scalars['Float']>;
  percentualRentability?: Maybe<Scalars['Float']>;
  fixedAssociatedDiscount?: Maybe<Scalars['Float']>;
  percentualAssociatedDiscount?: Maybe<Scalars['Float']>;
};

export type ExtendedUser = {
  __typename?: 'ExtendedUser';
  accessToken: Scalars['String'];
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  role: UserRoles;
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export enum AllowedUserLookupFields {
  Id = '_id',
  Username = 'username'
}

export enum UserRoles {
  Admin = 'ADMIN',
  Staff = 'STAFF',
  Partner = 'PARTNER'
}

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  role?: Maybe<UserRoles>;
  partnerCRM?: Maybe<Scalars['String']>;
};

export type SignInInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type PfAttachmentInfoFragment = (
  { __typename?: 'PFAttachment' }
  & Pick<PfAttachment, 'id' | 'key' | 'comments' | 'createdAt' | 'updatedAt'>
);

export type PfContactInfoFragment = (
  { __typename?: 'PFContact' }
  & Pick<PfContact, 'id' | 'name' | 'email' | 'phone' | 'mobilePhone' | 'isWhatsApp' | 'isMain' | 'createdAt' | 'updatedAt'>
);

export type PfAddressInfoFragment = (
  { __typename?: 'PFAddress' }
  & Pick<PfAddress, 'id' | 'name' | 'CEP' | 'country' | 'state' | 'city' | 'district' | 'street' | 'number' | 'complement' | 'isMain' | 'createdAt' | 'updatedAt'>
);

export type PfDisabilityInfoFragment = (
  { __typename?: 'PFDisability' }
  & Pick<PfDisability, 'id' | 'CID' | 'nomenclature' | 'createdAt' | 'updatedAt'>
);

export type PfLeaveHistoryInfoFragment = (
  { __typename?: 'PFLeaveHistory' }
  & Pick<PfLeaveHistory, 'id' | 'leaveDate' | 'returnDate' | 'reason' | 'isINSS' | 'createdAt' | 'updatedAt'>
);

export type PfProfessionalHistoryInfoFragment = (
  { __typename?: 'PFProfessionalHistory' }
  & Pick<PfProfessionalHistory, 'id' | 'office' | 'CBO' | 'admissionDate' | 'startDate' | 'recisionDate' | 'EPI' | 'createdAt' | 'updatedAt'>
  & { leaveHistory?: Maybe<Array<(
    { __typename?: 'PFLeaveHistory' }
    & PfLeaveHistoryInfoFragment
  )>>, company: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PfExtraInfoInfoFragment = (
  { __typename?: 'PFExtraInfo' }
  & Pick<PfExtraInfo, 'id' | 'createdAt' | 'updatedAt'>
  & { contacts?: Maybe<Array<(
    { __typename?: 'PFContact' }
    & PfContactInfoFragment
  )>>, addresses?: Maybe<Array<(
    { __typename?: 'PFAddress' }
    & PfAddressInfoFragment
  )>>, disabilities?: Maybe<Array<(
    { __typename?: 'PFDisability' }
    & PfDisabilityInfoFragment
  )>>, professionalHistory?: Maybe<Array<(
    { __typename?: 'PFProfessionalHistory' }
    & PfProfessionalHistoryInfoFragment
  )>>, attachments?: Maybe<Array<(
    { __typename?: 'PFAttachment' }
    & PfAttachmentInfoFragment
  )>> }
);

export type PfCustomerInfoFragment = (
  { __typename?: 'PFCustomer' }
  & Pick<PfCustomer, 'id' | 'firstName' | 'lastName' | 'birthDate' | 'CPF' | 'gender' | 'preferedPronoun' | 'isActive' | 'hasDisability' | 'createdAt' | 'updatedAt'>
  & { PFextraInfo: (
    { __typename?: 'PFExtraInfo' }
    & PfExtraInfoInfoFragment
  ) }
);

export type PjAddressInfoFragment = (
  { __typename?: 'PJAddress' }
  & Pick<PjAddress, 'id' | 'name' | 'CEP' | 'country' | 'state' | 'city' | 'district' | 'street' | 'number' | 'complement' | 'isMain' | 'createdAt' | 'updatedAt'>
);

export type PjContactInfoFragment = (
  { __typename?: 'PJContact' }
  & Pick<PjContact, 'id' | 'contactEmployeeName' | 'email' | 'phone' | 'mobilePhone' | 'site' | 'isWhatsApp' | 'isMain' | 'createdAt' | 'updatedAt'>
);

export type PjActivityInfoFragment = (
  { __typename?: 'PJActivityClassification' }
  & Pick<PjActivityClassification, 'id' | 'CNAE' | 'description' | 'isMain' | 'createdAt' | 'updatedAt'>
);

export type PjExtraInfoInfoFragment = (
  { __typename?: 'PJExtraInfo' }
  & Pick<PjExtraInfo, 'id' | 'createdAt' | 'updatedAt'>
  & { contacts?: Maybe<Array<(
    { __typename?: 'PJContact' }
    & PjContactInfoFragment
  )>>, addresses?: Maybe<Array<(
    { __typename?: 'PJAddress' }
    & PjAddressInfoFragment
  )>>, activities?: Maybe<Array<(
    { __typename?: 'PJActivityClassification' }
    & PjActivityInfoFragment
  )>> }
);

export type PjCustomerInfoFragment = (
  { __typename?: 'PJCustomer' }
  & Pick<PjCustomer, 'id' | 'legalName' | 'tradingName' | 'CNPJ' | 'isActive' | 'isAssociated' | 'createdAt' | 'updatedAt'>
  & { PJextraInfo: (
    { __typename?: 'PJExtraInfo' }
    & PjExtraInfoInfoFragment
  ) }
);

export type PFfetchCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type PFfetchCustomersQuery = (
  { __typename?: 'Query' }
  & { PFfetchCustomers: Array<(
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  )> }
);

export type PFfetchCustomersByIdQueryVariables = Exact<{
  PFCustomerIDS: Array<Scalars['String']> | Scalars['String'];
}>;


export type PFfetchCustomersByIdQuery = (
  { __typename?: 'Query' }
  & { PFfetchCustomersById: Array<(
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  )> }
);

export type PFfetchCustomerByIdQueryVariables = Exact<{
  PFCustomerID: Scalars['String'];
}>;


export type PFfetchCustomerByIdQuery = (
  { __typename?: 'Query' }
  & { PFfetchCustomerById: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFfetchDisabilityNomenclatureMutationVariables = Exact<{
  CID: Scalars['String'];
}>;


export type PFfetchDisabilityNomenclatureMutation = (
  { __typename?: 'Mutation' }
  & { PFfetchDisabilityNomenclature?: Maybe<(
    { __typename?: 'PFPossibleDisability' }
    & Pick<PfPossibleDisability, 'CID' | 'nomenclature'>
  )> }
);

export type PJfetchCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type PJfetchCustomersQuery = (
  { __typename?: 'Query' }
  & { PJfetchCustomers: Array<(
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  )> }
);

export type PJfetchCustomersByIdQueryVariables = Exact<{
  PJCustomerIDS: Array<Scalars['String']> | Scalars['String'];
}>;


export type PJfetchCustomersByIdQuery = (
  { __typename?: 'Query' }
  & { PJfetchCustomersById: Array<(
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  )> }
);

export type PJfetchCustomerByIdQueryVariables = Exact<{
  PJCustomerID: Scalars['String'];
}>;


export type PJfetchCustomerByIdQuery = (
  { __typename?: 'Query' }
  & { PJfetchCustomerById: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PJfetchEmployeesQueryVariables = Exact<{
  PJCustomerID: Scalars['String'];
}>;


export type PJfetchEmployeesQuery = (
  { __typename?: 'Query' }
  & { PJfetchEmployees?: Maybe<Array<(
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  )>> }
);

export type PJfetchCustomersTradingNameQueryVariables = Exact<{ [key: string]: never; }>;


export type PJfetchCustomersTradingNameQuery = (
  { __typename?: 'Query' }
  & { PJfetchCustomers: Array<(
    { __typename?: 'PJCustomer' }
    & Pick<PjCustomer, 'id' | 'tradingName'>
  )> }
);

export type PFaddCustomerMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  birthDate: Scalars['Date'];
  CPF: Scalars['CPF'];
  gender: GenderEnum;
  preferedPronoun: PreferedPronounEnum;
  isActive?: Maybe<Scalars['Boolean']>;
  hasDisability?: Maybe<Scalars['Boolean']>;
}>;


export type PFaddCustomerMutation = (
  { __typename?: 'Mutation' }
  & { PFaddCustomer: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFupdateCustomerMutationVariables = Exact<{
  PFCustomerID: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  CPF?: Maybe<Scalars['CPF']>;
  gender?: Maybe<GenderEnum>;
  preferedPronoun?: Maybe<PreferedPronounEnum>;
  isActive?: Maybe<Scalars['Boolean']>;
  hasDisability?: Maybe<Scalars['Boolean']>;
}>;


export type PFupdateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { PFupdateCustomer: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFremoveCustomersMutationVariables = Exact<{
  PFCustomerIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PFremoveCustomersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'PFremoveCustomers'>
);

export type PFaddAddressMutationVariables = Exact<{
  PFCustomerID: Scalars['ID'];
  name: Scalars['String'];
  CEP: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  city: Scalars['String'];
  district?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  number: Scalars['String'];
  complement?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
}>;


export type PFaddAddressMutation = (
  { __typename?: 'Mutation' }
  & { PFaddAddress: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFupdateAddressMutationVariables = Exact<{
  PFAddressID: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  CEP?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  complement?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
}>;


export type PFupdateAddressMutation = (
  { __typename?: 'Mutation' }
  & { PFupdateAddress: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFremoveAddressesMutationVariables = Exact<{
  PFAddressIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PFremoveAddressesMutation = (
  { __typename?: 'Mutation' }
  & { PFremoveAddresses: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFaddContactMutationVariables = Exact<{
  PFCustomerID: Scalars['ID'];
  name: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  isWhatsApp?: Maybe<Scalars['Boolean']>;
  isMain?: Maybe<Scalars['Boolean']>;
}>;


export type PFaddContactMutation = (
  { __typename?: 'Mutation' }
  & { PFaddContact: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFupdateContactMutationVariables = Exact<{
  PFContactID: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  isWhatsApp?: Maybe<Scalars['Boolean']>;
  isMain?: Maybe<Scalars['Boolean']>;
}>;


export type PFupdateContactMutation = (
  { __typename?: 'Mutation' }
  & { PFupdateContact: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFremoveContactMutationVariables = Exact<{
  PFContactIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PFremoveContactMutation = (
  { __typename?: 'Mutation' }
  & { PFremoveContacts: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFaddDisabilityMutationVariables = Exact<{
  PFCustomerID: Scalars['ID'];
  CID: Scalars['String'];
  nomenclature?: Maybe<Scalars['String']>;
}>;


export type PFaddDisabilityMutation = (
  { __typename?: 'Mutation' }
  & { PFaddDisability: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFupdateDisabilityMutationVariables = Exact<{
  PFDisabilityID: Scalars['ID'];
  CID?: Maybe<Scalars['String']>;
  nomenclature?: Maybe<Scalars['String']>;
}>;


export type PFupdateDisabilityMutation = (
  { __typename?: 'Mutation' }
  & { PFupdateDisability: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFremoveDisabilityMutationVariables = Exact<{
  PFDisabilityIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PFremoveDisabilityMutation = (
  { __typename?: 'Mutation' }
  & { PFremoveDisabilities: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFaddProfessionalHistoryMutationVariables = Exact<{
  PFCustomerID: Scalars['ID'];
  companyID: Scalars['ID'];
  office: Scalars['String'];
  CBO: Scalars['String'];
  admissionDate: Scalars['Date'];
  startDate?: Maybe<Scalars['Date']>;
  recisionDate?: Maybe<Scalars['Date']>;
  EPI?: Maybe<Scalars['Boolean']>;
}>;


export type PFaddProfessionalHistoryMutation = (
  { __typename?: 'Mutation' }
  & { PFaddProfessionalHistory: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFupdateProfessionalHistoryMutationVariables = Exact<{
  PFProfessionalHistoryID: Scalars['ID'];
  companyID?: Maybe<Scalars['ID']>;
  office?: Maybe<Scalars['String']>;
  CBO?: Maybe<Scalars['String']>;
  admissionDate?: Maybe<Scalars['Date']>;
  startDate?: Maybe<Scalars['Date']>;
  recisionDate?: Maybe<Scalars['Date']>;
  EPI?: Maybe<Scalars['Boolean']>;
}>;


export type PFupdateProfessionalHistoryMutation = (
  { __typename?: 'Mutation' }
  & { PFupdateProfessionalHistory: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFremoveProfessionalHistoryMutationVariables = Exact<{
  PFProfessionalHistoryIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PFremoveProfessionalHistoryMutation = (
  { __typename?: 'Mutation' }
  & { PFremoveProfessionalHistory: (
    { __typename?: 'PFCustomer' }
    & { PFextraInfo: (
      { __typename?: 'PFExtraInfo' }
      & { professionalHistory?: Maybe<Array<(
        { __typename?: 'PFProfessionalHistory' }
        & PfProfessionalHistoryInfoFragment
      )>> }
    ) }
  ) }
);

export type PFaddLeaveHistoryMutationVariables = Exact<{
  PFProfessionalHistoryID: Scalars['ID'];
  leaveDate: Scalars['Date'];
  returnDate?: Maybe<Scalars['Date']>;
  reason: Scalars['String'];
  isINSS?: Maybe<Scalars['Boolean']>;
}>;


export type PFaddLeaveHistoryMutation = (
  { __typename?: 'Mutation' }
  & { PFaddLeaveHistory: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFupdateLeaveHistoryMutationVariables = Exact<{
  PFLeaveHistoryID: Scalars['ID'];
  leaveDate: Scalars['Date'];
  returnDate?: Maybe<Scalars['Date']>;
  reason: Scalars['String'];
  isINSS?: Maybe<Scalars['Boolean']>;
}>;


export type PFupdateLeaveHistoryMutation = (
  { __typename?: 'Mutation' }
  & { PFupdateLeaveHistory: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PFremoveLeaveHistoryMutationVariables = Exact<{
  PFLeaveHistoryIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PFremoveLeaveHistoryMutation = (
  { __typename?: 'Mutation' }
  & { PFremoveLeaveHistory: (
    { __typename?: 'PFCustomer' }
    & PfCustomerInfoFragment
  ) }
);

export type PJaddCustomerMutationVariables = Exact<{
  legalName: Scalars['String'];
  tradingName: Scalars['String'];
  CNPJ: Scalars['CNPJ'];
  isActive?: Maybe<Scalars['Boolean']>;
  isAssociated?: Maybe<Scalars['Boolean']>;
}>;


export type PJaddCustomerMutation = (
  { __typename?: 'Mutation' }
  & { PJaddCustomer: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PJupdateCustomerMutationVariables = Exact<{
  PJCustomerID: Scalars['ID'];
  legalName?: Maybe<Scalars['String']>;
  tradingName?: Maybe<Scalars['String']>;
  CNPJ?: Maybe<Scalars['CNPJ']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isAssociated?: Maybe<Scalars['Boolean']>;
}>;


export type PJupdateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { PJupdateCustomer: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PJremoveCustomersMutationVariables = Exact<{
  PJCustomerIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PJremoveCustomersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'PJremoveCustomers'>
);

export type PJaddAddressMutationVariables = Exact<{
  PJCustomerID: Scalars['ID'];
  name: Scalars['String'];
  CEP: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  city: Scalars['String'];
  district?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  number: Scalars['String'];
  complement?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
}>;


export type PJaddAddressMutation = (
  { __typename?: 'Mutation' }
  & { PJaddAddress: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PJupdateAddressMutationVariables = Exact<{
  PJAddressID: Scalars['ID'];
  name: Scalars['String'];
  CEP: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  city: Scalars['String'];
  district?: Maybe<Scalars['String']>;
  street: Scalars['String'];
  number: Scalars['String'];
  complement?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
}>;


export type PJupdateAddressMutation = (
  { __typename?: 'Mutation' }
  & { PJupdateAddress: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PJremoveAddressesMutationVariables = Exact<{
  PJAddressIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PJremoveAddressesMutation = (
  { __typename?: 'Mutation' }
  & { PJremoveAddresses: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PJaddContactMutationVariables = Exact<{
  PJCustomerID: Scalars['ID'];
  contactEmployeeName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  isWhatsApp?: Maybe<Scalars['Boolean']>;
  isMain?: Maybe<Scalars['Boolean']>;
}>;


export type PJaddContactMutation = (
  { __typename?: 'Mutation' }
  & { PJaddContact: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PJupdateContactMutationVariables = Exact<{
  PJContactID: Scalars['ID'];
  contactEmployeeName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  mobilePhone?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  isWhatsApp?: Maybe<Scalars['Boolean']>;
  isMain?: Maybe<Scalars['Boolean']>;
}>;


export type PJupdateContactMutation = (
  { __typename?: 'Mutation' }
  & { PJupdateContact: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PJremoveContactsMutationVariables = Exact<{
  PJContactIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PJremoveContactsMutation = (
  { __typename?: 'Mutation' }
  & { PJremoveContacts: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PJaddActivityClassificationMutationVariables = Exact<{
  PJCustomerID: Scalars['ID'];
  CNAE: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
}>;


export type PJaddActivityClassificationMutation = (
  { __typename?: 'Mutation' }
  & { PJaddActivityClassification: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PJupdateActivityClassificationMutationVariables = Exact<{
  PJActivityID: Scalars['ID'];
  CNAE: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isMain?: Maybe<Scalars['Boolean']>;
}>;


export type PJupdateActivityClassificationMutation = (
  { __typename?: 'Mutation' }
  & { PJupdateActivityClassification: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type PJremoveActivityClassificationsMutationVariables = Exact<{
  PJActivityIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PJremoveActivityClassificationsMutation = (
  { __typename?: 'Mutation' }
  & { PJremoveActivityClassifications: (
    { __typename?: 'PJCustomer' }
    & PjCustomerInfoFragment
  ) }
);

export type ServiceInfoFragment = (
  { __typename?: 'Service' }
  & Pick<Service, 'id' | 'name' | 'code' | 'description' | 'deliveryTime' | 'baseCost' | 'baseSaleValue' | 'associatedSaleValue' | 'fixedRentability' | 'percentualRentability' | 'fixedAssociatedDiscount' | 'percentualAssociatedDiscount' | 'createdAt' | 'updatedAt'>
);

export type FetchServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchServicesQuery = (
  { __typename?: 'Query' }
  & { fetchServices: Array<(
    { __typename?: 'Service' }
    & ServiceInfoFragment
  )> }
);

export type FetchServicesByIdQueryVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type FetchServicesByIdQuery = (
  { __typename?: 'Query' }
  & { fetchServicesById: Array<(
    { __typename?: 'Service' }
    & ServiceInfoFragment
  )> }
);

export type FetchServiceByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FetchServiceByIdQuery = (
  { __typename?: 'Query' }
  & { fetchServiceById: (
    { __typename?: 'Service' }
    & ServiceInfoFragment
  ) }
);

export type AddServiceMutationVariables = Exact<{
  name: Scalars['String'];
  code: Scalars['String'];
  description: Scalars['String'];
  deliveryTime?: Maybe<Scalars['Int']>;
  baseSaleValue?: Maybe<Scalars['Float']>;
  associatedSaleValue?: Maybe<Scalars['Float']>;
  baseCost?: Maybe<Scalars['Float']>;
  fixedRentability?: Maybe<Scalars['Float']>;
  percentualRentability?: Maybe<Scalars['Float']>;
  fixedAssociatedDiscount?: Maybe<Scalars['Float']>;
  percentualAssociatedDiscount?: Maybe<Scalars['Float']>;
}>;


export type AddServiceMutation = (
  { __typename?: 'Mutation' }
  & { addService: (
    { __typename?: 'Service' }
    & ServiceInfoFragment
  ) }
);

export type RemoveServicesMutationVariables = Exact<{
  ServiceIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type RemoveServicesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeServices'>
);

export type UpdateServicesMutationVariables = Exact<{
  ServiceID: Scalars['ID'];
  makeCalculations?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  deliveryTime?: Maybe<Scalars['Int']>;
  baseSaleValue?: Maybe<Scalars['Float']>;
  associatedSaleValue?: Maybe<Scalars['Float']>;
  baseCost?: Maybe<Scalars['Float']>;
  fixedRentability?: Maybe<Scalars['Float']>;
  percentualRentability?: Maybe<Scalars['Float']>;
  fixedAssociatedDiscount?: Maybe<Scalars['Float']>;
  percentualAssociatedDiscount?: Maybe<Scalars['Float']>;
}>;


export type UpdateServicesMutation = (
  { __typename?: 'Mutation' }
  & { updateService: (
    { __typename?: 'Service' }
    & ServiceInfoFragment
  ) }
);

export const PfContactInfoFragmentDoc = gql`
    fragment PFContactInfo on PFContact {
  id
  name
  email
  phone
  mobilePhone
  isWhatsApp
  isMain
  createdAt
  updatedAt
}
    `;
export const PfAddressInfoFragmentDoc = gql`
    fragment PFAddressInfo on PFAddress {
  id
  name
  CEP
  country
  state
  city
  district
  street
  number
  complement
  isMain
  createdAt
  updatedAt
}
    `;
export const PfDisabilityInfoFragmentDoc = gql`
    fragment PFDisabilityInfo on PFDisability {
  id
  CID
  nomenclature
  createdAt
  updatedAt
}
    `;
export const PfLeaveHistoryInfoFragmentDoc = gql`
    fragment PFLeaveHistoryInfo on PFLeaveHistory {
  id
  leaveDate
  returnDate
  reason
  isINSS
  createdAt
  updatedAt
}
    `;
export const PjContactInfoFragmentDoc = gql`
    fragment PJContactInfo on PJContact {
  id
  contactEmployeeName
  email
  phone
  mobilePhone
  site
  isWhatsApp
  isMain
  createdAt
  updatedAt
}
    `;
export const PjAddressInfoFragmentDoc = gql`
    fragment PJAddressInfo on PJAddress {
  id
  name
  CEP
  country
  state
  city
  district
  street
  number
  complement
  isMain
  createdAt
  updatedAt
}
    `;
export const PjActivityInfoFragmentDoc = gql`
    fragment PJActivityInfo on PJActivityClassification {
  id
  CNAE
  description
  isMain
  createdAt
  updatedAt
}
    `;
export const PjExtraInfoInfoFragmentDoc = gql`
    fragment PJExtraInfoInfo on PJExtraInfo {
  id
  createdAt
  updatedAt
  contacts {
    ...PJContactInfo
  }
  addresses {
    ...PJAddressInfo
  }
  activities {
    ...PJActivityInfo
  }
}
    ${PjContactInfoFragmentDoc}
${PjAddressInfoFragmentDoc}
${PjActivityInfoFragmentDoc}`;
export const PjCustomerInfoFragmentDoc = gql`
    fragment PJCustomerInfo on PJCustomer {
  id
  legalName
  tradingName
  CNPJ
  isActive
  isAssociated
  createdAt
  updatedAt
  PJextraInfo {
    ...PJExtraInfoInfo
  }
}
    ${PjExtraInfoInfoFragmentDoc}`;
export const PfProfessionalHistoryInfoFragmentDoc = gql`
    fragment PFProfessionalHistoryInfo on PFProfessionalHistory {
  id
  office
  CBO
  admissionDate
  startDate
  recisionDate
  EPI
  createdAt
  updatedAt
  leaveHistory {
    ...PFLeaveHistoryInfo
  }
  company {
    ...PJCustomerInfo
  }
}
    ${PfLeaveHistoryInfoFragmentDoc}
${PjCustomerInfoFragmentDoc}`;
export const PfAttachmentInfoFragmentDoc = gql`
    fragment PFAttachmentInfo on PFAttachment {
  id
  key
  comments
  createdAt
  updatedAt
}
    `;
export const PfExtraInfoInfoFragmentDoc = gql`
    fragment PFExtraInfoInfo on PFExtraInfo {
  id
  createdAt
  updatedAt
  contacts {
    ...PFContactInfo
  }
  addresses {
    ...PFAddressInfo
  }
  disabilities {
    ...PFDisabilityInfo
  }
  professionalHistory {
    ...PFProfessionalHistoryInfo
  }
  attachments {
    ...PFAttachmentInfo
  }
}
    ${PfContactInfoFragmentDoc}
${PfAddressInfoFragmentDoc}
${PfDisabilityInfoFragmentDoc}
${PfProfessionalHistoryInfoFragmentDoc}
${PfAttachmentInfoFragmentDoc}`;
export const PfCustomerInfoFragmentDoc = gql`
    fragment PFCustomerInfo on PFCustomer {
  id
  firstName
  lastName
  birthDate
  CPF
  gender
  preferedPronoun
  isActive
  hasDisability
  createdAt
  updatedAt
  PFextraInfo {
    ...PFExtraInfoInfo
  }
}
    ${PfExtraInfoInfoFragmentDoc}`;
export const ServiceInfoFragmentDoc = gql`
    fragment ServiceInfo on Service {
  id
  name
  code
  description
  deliveryTime
  baseCost
  baseSaleValue
  associatedSaleValue
  fixedRentability
  percentualRentability
  fixedAssociatedDiscount
  percentualAssociatedDiscount
  createdAt
  updatedAt
}
    `;
export const PFfetchCustomersDocument = gql`
    query PFfetchCustomers {
  PFfetchCustomers {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;

/**
 * __usePFfetchCustomersQuery__
 *
 * To run a query within a React component, call `usePFfetchCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePFfetchCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePFfetchCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function usePFfetchCustomersQuery(baseOptions?: Apollo.QueryHookOptions<PFfetchCustomersQuery, PFfetchCustomersQueryVariables>) {
        return Apollo.useQuery<PFfetchCustomersQuery, PFfetchCustomersQueryVariables>(PFfetchCustomersDocument, baseOptions);
      }
export function usePFfetchCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PFfetchCustomersQuery, PFfetchCustomersQueryVariables>) {
          return Apollo.useLazyQuery<PFfetchCustomersQuery, PFfetchCustomersQueryVariables>(PFfetchCustomersDocument, baseOptions);
        }
export type PFfetchCustomersQueryHookResult = ReturnType<typeof usePFfetchCustomersQuery>;
export type PFfetchCustomersLazyQueryHookResult = ReturnType<typeof usePFfetchCustomersLazyQuery>;
export type PFfetchCustomersQueryResult = Apollo.QueryResult<PFfetchCustomersQuery, PFfetchCustomersQueryVariables>;
export const PFfetchCustomersByIdDocument = gql`
    query PFfetchCustomersByID($PFCustomerIDS: [String!]!) {
  PFfetchCustomersById(PFCustomerIDS: $PFCustomerIDS) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;

/**
 * __usePFfetchCustomersByIdQuery__
 *
 * To run a query within a React component, call `usePFfetchCustomersByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePFfetchCustomersByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePFfetchCustomersByIdQuery({
 *   variables: {
 *      PFCustomerIDS: // value for 'PFCustomerIDS'
 *   },
 * });
 */
export function usePFfetchCustomersByIdQuery(baseOptions: Apollo.QueryHookOptions<PFfetchCustomersByIdQuery, PFfetchCustomersByIdQueryVariables>) {
        return Apollo.useQuery<PFfetchCustomersByIdQuery, PFfetchCustomersByIdQueryVariables>(PFfetchCustomersByIdDocument, baseOptions);
      }
export function usePFfetchCustomersByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PFfetchCustomersByIdQuery, PFfetchCustomersByIdQueryVariables>) {
          return Apollo.useLazyQuery<PFfetchCustomersByIdQuery, PFfetchCustomersByIdQueryVariables>(PFfetchCustomersByIdDocument, baseOptions);
        }
export type PFfetchCustomersByIdQueryHookResult = ReturnType<typeof usePFfetchCustomersByIdQuery>;
export type PFfetchCustomersByIdLazyQueryHookResult = ReturnType<typeof usePFfetchCustomersByIdLazyQuery>;
export type PFfetchCustomersByIdQueryResult = Apollo.QueryResult<PFfetchCustomersByIdQuery, PFfetchCustomersByIdQueryVariables>;
export const PFfetchCustomerByIdDocument = gql`
    query PFfetchCustomerByID($PFCustomerID: String!) {
  PFfetchCustomerById(PFCustomerID: $PFCustomerID) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;

/**
 * __usePFfetchCustomerByIdQuery__
 *
 * To run a query within a React component, call `usePFfetchCustomerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePFfetchCustomerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePFfetchCustomerByIdQuery({
 *   variables: {
 *      PFCustomerID: // value for 'PFCustomerID'
 *   },
 * });
 */
export function usePFfetchCustomerByIdQuery(baseOptions: Apollo.QueryHookOptions<PFfetchCustomerByIdQuery, PFfetchCustomerByIdQueryVariables>) {
        return Apollo.useQuery<PFfetchCustomerByIdQuery, PFfetchCustomerByIdQueryVariables>(PFfetchCustomerByIdDocument, baseOptions);
      }
export function usePFfetchCustomerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PFfetchCustomerByIdQuery, PFfetchCustomerByIdQueryVariables>) {
          return Apollo.useLazyQuery<PFfetchCustomerByIdQuery, PFfetchCustomerByIdQueryVariables>(PFfetchCustomerByIdDocument, baseOptions);
        }
export type PFfetchCustomerByIdQueryHookResult = ReturnType<typeof usePFfetchCustomerByIdQuery>;
export type PFfetchCustomerByIdLazyQueryHookResult = ReturnType<typeof usePFfetchCustomerByIdLazyQuery>;
export type PFfetchCustomerByIdQueryResult = Apollo.QueryResult<PFfetchCustomerByIdQuery, PFfetchCustomerByIdQueryVariables>;
export const PFfetchDisabilityNomenclatureDocument = gql`
    mutation PFfetchDisabilityNomenclature($CID: String!) {
  PFfetchDisabilityNomenclature(CID: $CID) {
    CID
    nomenclature
  }
}
    `;
export type PFfetchDisabilityNomenclatureMutationFn = Apollo.MutationFunction<PFfetchDisabilityNomenclatureMutation, PFfetchDisabilityNomenclatureMutationVariables>;

/**
 * __usePFfetchDisabilityNomenclatureMutation__
 *
 * To run a mutation, you first call `usePFfetchDisabilityNomenclatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFfetchDisabilityNomenclatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFfetchDisabilityNomenclatureMutation, { data, loading, error }] = usePFfetchDisabilityNomenclatureMutation({
 *   variables: {
 *      CID: // value for 'CID'
 *   },
 * });
 */
export function usePFfetchDisabilityNomenclatureMutation(baseOptions?: Apollo.MutationHookOptions<PFfetchDisabilityNomenclatureMutation, PFfetchDisabilityNomenclatureMutationVariables>) {
        return Apollo.useMutation<PFfetchDisabilityNomenclatureMutation, PFfetchDisabilityNomenclatureMutationVariables>(PFfetchDisabilityNomenclatureDocument, baseOptions);
      }
export type PFfetchDisabilityNomenclatureMutationHookResult = ReturnType<typeof usePFfetchDisabilityNomenclatureMutation>;
export type PFfetchDisabilityNomenclatureMutationResult = Apollo.MutationResult<PFfetchDisabilityNomenclatureMutation>;
export type PFfetchDisabilityNomenclatureMutationOptions = Apollo.BaseMutationOptions<PFfetchDisabilityNomenclatureMutation, PFfetchDisabilityNomenclatureMutationVariables>;
export const PJfetchCustomersDocument = gql`
    query PJfetchCustomers {
  PJfetchCustomers {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;

/**
 * __usePJfetchCustomersQuery__
 *
 * To run a query within a React component, call `usePJfetchCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePJfetchCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePJfetchCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function usePJfetchCustomersQuery(baseOptions?: Apollo.QueryHookOptions<PJfetchCustomersQuery, PJfetchCustomersQueryVariables>) {
        return Apollo.useQuery<PJfetchCustomersQuery, PJfetchCustomersQueryVariables>(PJfetchCustomersDocument, baseOptions);
      }
export function usePJfetchCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PJfetchCustomersQuery, PJfetchCustomersQueryVariables>) {
          return Apollo.useLazyQuery<PJfetchCustomersQuery, PJfetchCustomersQueryVariables>(PJfetchCustomersDocument, baseOptions);
        }
export type PJfetchCustomersQueryHookResult = ReturnType<typeof usePJfetchCustomersQuery>;
export type PJfetchCustomersLazyQueryHookResult = ReturnType<typeof usePJfetchCustomersLazyQuery>;
export type PJfetchCustomersQueryResult = Apollo.QueryResult<PJfetchCustomersQuery, PJfetchCustomersQueryVariables>;
export const PJfetchCustomersByIdDocument = gql`
    query PJfetchCustomersByID($PJCustomerIDS: [String!]!) {
  PJfetchCustomersById(PJCustomerIDS: $PJCustomerIDS) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;

/**
 * __usePJfetchCustomersByIdQuery__
 *
 * To run a query within a React component, call `usePJfetchCustomersByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePJfetchCustomersByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePJfetchCustomersByIdQuery({
 *   variables: {
 *      PJCustomerIDS: // value for 'PJCustomerIDS'
 *   },
 * });
 */
export function usePJfetchCustomersByIdQuery(baseOptions: Apollo.QueryHookOptions<PJfetchCustomersByIdQuery, PJfetchCustomersByIdQueryVariables>) {
        return Apollo.useQuery<PJfetchCustomersByIdQuery, PJfetchCustomersByIdQueryVariables>(PJfetchCustomersByIdDocument, baseOptions);
      }
export function usePJfetchCustomersByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PJfetchCustomersByIdQuery, PJfetchCustomersByIdQueryVariables>) {
          return Apollo.useLazyQuery<PJfetchCustomersByIdQuery, PJfetchCustomersByIdQueryVariables>(PJfetchCustomersByIdDocument, baseOptions);
        }
export type PJfetchCustomersByIdQueryHookResult = ReturnType<typeof usePJfetchCustomersByIdQuery>;
export type PJfetchCustomersByIdLazyQueryHookResult = ReturnType<typeof usePJfetchCustomersByIdLazyQuery>;
export type PJfetchCustomersByIdQueryResult = Apollo.QueryResult<PJfetchCustomersByIdQuery, PJfetchCustomersByIdQueryVariables>;
export const PJfetchCustomerByIdDocument = gql`
    query PJfetchCustomerByID($PJCustomerID: String!) {
  PJfetchCustomerById(PJCustomerID: $PJCustomerID) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;

/**
 * __usePJfetchCustomerByIdQuery__
 *
 * To run a query within a React component, call `usePJfetchCustomerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePJfetchCustomerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePJfetchCustomerByIdQuery({
 *   variables: {
 *      PJCustomerID: // value for 'PJCustomerID'
 *   },
 * });
 */
export function usePJfetchCustomerByIdQuery(baseOptions: Apollo.QueryHookOptions<PJfetchCustomerByIdQuery, PJfetchCustomerByIdQueryVariables>) {
        return Apollo.useQuery<PJfetchCustomerByIdQuery, PJfetchCustomerByIdQueryVariables>(PJfetchCustomerByIdDocument, baseOptions);
      }
export function usePJfetchCustomerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PJfetchCustomerByIdQuery, PJfetchCustomerByIdQueryVariables>) {
          return Apollo.useLazyQuery<PJfetchCustomerByIdQuery, PJfetchCustomerByIdQueryVariables>(PJfetchCustomerByIdDocument, baseOptions);
        }
export type PJfetchCustomerByIdQueryHookResult = ReturnType<typeof usePJfetchCustomerByIdQuery>;
export type PJfetchCustomerByIdLazyQueryHookResult = ReturnType<typeof usePJfetchCustomerByIdLazyQuery>;
export type PJfetchCustomerByIdQueryResult = Apollo.QueryResult<PJfetchCustomerByIdQuery, PJfetchCustomerByIdQueryVariables>;
export const PJfetchEmployeesDocument = gql`
    query PJfetchEmployees($PJCustomerID: String!) {
  PJfetchEmployees(PJCustomerID: $PJCustomerID) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;

/**
 * __usePJfetchEmployeesQuery__
 *
 * To run a query within a React component, call `usePJfetchEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePJfetchEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePJfetchEmployeesQuery({
 *   variables: {
 *      PJCustomerID: // value for 'PJCustomerID'
 *   },
 * });
 */
export function usePJfetchEmployeesQuery(baseOptions: Apollo.QueryHookOptions<PJfetchEmployeesQuery, PJfetchEmployeesQueryVariables>) {
        return Apollo.useQuery<PJfetchEmployeesQuery, PJfetchEmployeesQueryVariables>(PJfetchEmployeesDocument, baseOptions);
      }
export function usePJfetchEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PJfetchEmployeesQuery, PJfetchEmployeesQueryVariables>) {
          return Apollo.useLazyQuery<PJfetchEmployeesQuery, PJfetchEmployeesQueryVariables>(PJfetchEmployeesDocument, baseOptions);
        }
export type PJfetchEmployeesQueryHookResult = ReturnType<typeof usePJfetchEmployeesQuery>;
export type PJfetchEmployeesLazyQueryHookResult = ReturnType<typeof usePJfetchEmployeesLazyQuery>;
export type PJfetchEmployeesQueryResult = Apollo.QueryResult<PJfetchEmployeesQuery, PJfetchEmployeesQueryVariables>;
export const PJfetchCustomersTradingNameDocument = gql`
    query PJfetchCustomersTradingName {
  PJfetchCustomers {
    id
    tradingName
  }
}
    `;

/**
 * __usePJfetchCustomersTradingNameQuery__
 *
 * To run a query within a React component, call `usePJfetchCustomersTradingNameQuery` and pass it any options that fit your needs.
 * When your component renders, `usePJfetchCustomersTradingNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePJfetchCustomersTradingNameQuery({
 *   variables: {
 *   },
 * });
 */
export function usePJfetchCustomersTradingNameQuery(baseOptions?: Apollo.QueryHookOptions<PJfetchCustomersTradingNameQuery, PJfetchCustomersTradingNameQueryVariables>) {
        return Apollo.useQuery<PJfetchCustomersTradingNameQuery, PJfetchCustomersTradingNameQueryVariables>(PJfetchCustomersTradingNameDocument, baseOptions);
      }
export function usePJfetchCustomersTradingNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PJfetchCustomersTradingNameQuery, PJfetchCustomersTradingNameQueryVariables>) {
          return Apollo.useLazyQuery<PJfetchCustomersTradingNameQuery, PJfetchCustomersTradingNameQueryVariables>(PJfetchCustomersTradingNameDocument, baseOptions);
        }
export type PJfetchCustomersTradingNameQueryHookResult = ReturnType<typeof usePJfetchCustomersTradingNameQuery>;
export type PJfetchCustomersTradingNameLazyQueryHookResult = ReturnType<typeof usePJfetchCustomersTradingNameLazyQuery>;
export type PJfetchCustomersTradingNameQueryResult = Apollo.QueryResult<PJfetchCustomersTradingNameQuery, PJfetchCustomersTradingNameQueryVariables>;
export const PFaddCustomerDocument = gql`
    mutation PFaddCustomer($firstName: String!, $lastName: String!, $birthDate: Date!, $CPF: CPF!, $gender: GenderEnum!, $preferedPronoun: PreferedPronounEnum!, $isActive: Boolean, $hasDisability: Boolean) {
  PFaddCustomer(
    PFCustomer: {firstName: $firstName, lastName: $lastName, birthDate: $birthDate, CPF: $CPF, gender: $gender, preferedPronoun: $preferedPronoun, isActive: $isActive, hasDisability: $hasDisability}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFaddCustomerMutationFn = Apollo.MutationFunction<PFaddCustomerMutation, PFaddCustomerMutationVariables>;

/**
 * __usePFaddCustomerMutation__
 *
 * To run a mutation, you first call `usePFaddCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFaddCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFaddCustomerMutation, { data, loading, error }] = usePFaddCustomerMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      birthDate: // value for 'birthDate'
 *      CPF: // value for 'CPF'
 *      gender: // value for 'gender'
 *      preferedPronoun: // value for 'preferedPronoun'
 *      isActive: // value for 'isActive'
 *      hasDisability: // value for 'hasDisability'
 *   },
 * });
 */
export function usePFaddCustomerMutation(baseOptions?: Apollo.MutationHookOptions<PFaddCustomerMutation, PFaddCustomerMutationVariables>) {
        return Apollo.useMutation<PFaddCustomerMutation, PFaddCustomerMutationVariables>(PFaddCustomerDocument, baseOptions);
      }
export type PFaddCustomerMutationHookResult = ReturnType<typeof usePFaddCustomerMutation>;
export type PFaddCustomerMutationResult = Apollo.MutationResult<PFaddCustomerMutation>;
export type PFaddCustomerMutationOptions = Apollo.BaseMutationOptions<PFaddCustomerMutation, PFaddCustomerMutationVariables>;
export const PFupdateCustomerDocument = gql`
    mutation PFupdateCustomer($PFCustomerID: ID!, $firstName: String, $lastName: String, $birthDate: Date, $CPF: CPF, $gender: GenderEnum, $preferedPronoun: PreferedPronounEnum, $isActive: Boolean, $hasDisability: Boolean) {
  PFupdateCustomer(
    PFCustomerID: $PFCustomerID
    PFCustomer: {firstName: $firstName, lastName: $lastName, birthDate: $birthDate, CPF: $CPF, gender: $gender, preferedPronoun: $preferedPronoun, isActive: $isActive, hasDisability: $hasDisability}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFupdateCustomerMutationFn = Apollo.MutationFunction<PFupdateCustomerMutation, PFupdateCustomerMutationVariables>;

/**
 * __usePFupdateCustomerMutation__
 *
 * To run a mutation, you first call `usePFupdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFupdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFupdateCustomerMutation, { data, loading, error }] = usePFupdateCustomerMutation({
 *   variables: {
 *      PFCustomerID: // value for 'PFCustomerID'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      birthDate: // value for 'birthDate'
 *      CPF: // value for 'CPF'
 *      gender: // value for 'gender'
 *      preferedPronoun: // value for 'preferedPronoun'
 *      isActive: // value for 'isActive'
 *      hasDisability: // value for 'hasDisability'
 *   },
 * });
 */
export function usePFupdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<PFupdateCustomerMutation, PFupdateCustomerMutationVariables>) {
        return Apollo.useMutation<PFupdateCustomerMutation, PFupdateCustomerMutationVariables>(PFupdateCustomerDocument, baseOptions);
      }
export type PFupdateCustomerMutationHookResult = ReturnType<typeof usePFupdateCustomerMutation>;
export type PFupdateCustomerMutationResult = Apollo.MutationResult<PFupdateCustomerMutation>;
export type PFupdateCustomerMutationOptions = Apollo.BaseMutationOptions<PFupdateCustomerMutation, PFupdateCustomerMutationVariables>;
export const PFremoveCustomersDocument = gql`
    mutation PFremoveCustomers($PFCustomerIDS: [ID!]!) {
  PFremoveCustomers(PFCustomerIDS: $PFCustomerIDS)
}
    `;
export type PFremoveCustomersMutationFn = Apollo.MutationFunction<PFremoveCustomersMutation, PFremoveCustomersMutationVariables>;

/**
 * __usePFremoveCustomersMutation__
 *
 * To run a mutation, you first call `usePFremoveCustomersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFremoveCustomersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFremoveCustomersMutation, { data, loading, error }] = usePFremoveCustomersMutation({
 *   variables: {
 *      PFCustomerIDS: // value for 'PFCustomerIDS'
 *   },
 * });
 */
export function usePFremoveCustomersMutation(baseOptions?: Apollo.MutationHookOptions<PFremoveCustomersMutation, PFremoveCustomersMutationVariables>) {
        return Apollo.useMutation<PFremoveCustomersMutation, PFremoveCustomersMutationVariables>(PFremoveCustomersDocument, baseOptions);
      }
export type PFremoveCustomersMutationHookResult = ReturnType<typeof usePFremoveCustomersMutation>;
export type PFremoveCustomersMutationResult = Apollo.MutationResult<PFremoveCustomersMutation>;
export type PFremoveCustomersMutationOptions = Apollo.BaseMutationOptions<PFremoveCustomersMutation, PFremoveCustomersMutationVariables>;
export const PFaddAddressDocument = gql`
    mutation PFaddAddress($PFCustomerID: ID!, $name: String!, $CEP: String!, $country: String, $state: String!, $city: String!, $district: String, $street: String!, $number: String!, $complement: String, $isMain: Boolean) {
  PFaddAddress(
    PFCustomerID: $PFCustomerID
    PFAddress: {name: $name, CEP: $CEP, country: $country, state: $state, city: $city, district: $district, street: $street, number: $number, complement: $complement, isMain: $isMain}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFaddAddressMutationFn = Apollo.MutationFunction<PFaddAddressMutation, PFaddAddressMutationVariables>;

/**
 * __usePFaddAddressMutation__
 *
 * To run a mutation, you first call `usePFaddAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFaddAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFaddAddressMutation, { data, loading, error }] = usePFaddAddressMutation({
 *   variables: {
 *      PFCustomerID: // value for 'PFCustomerID'
 *      name: // value for 'name'
 *      CEP: // value for 'CEP'
 *      country: // value for 'country'
 *      state: // value for 'state'
 *      city: // value for 'city'
 *      district: // value for 'district'
 *      street: // value for 'street'
 *      number: // value for 'number'
 *      complement: // value for 'complement'
 *      isMain: // value for 'isMain'
 *   },
 * });
 */
export function usePFaddAddressMutation(baseOptions?: Apollo.MutationHookOptions<PFaddAddressMutation, PFaddAddressMutationVariables>) {
        return Apollo.useMutation<PFaddAddressMutation, PFaddAddressMutationVariables>(PFaddAddressDocument, baseOptions);
      }
export type PFaddAddressMutationHookResult = ReturnType<typeof usePFaddAddressMutation>;
export type PFaddAddressMutationResult = Apollo.MutationResult<PFaddAddressMutation>;
export type PFaddAddressMutationOptions = Apollo.BaseMutationOptions<PFaddAddressMutation, PFaddAddressMutationVariables>;
export const PFupdateAddressDocument = gql`
    mutation PFupdateAddress($PFAddressID: ID!, $name: String, $CEP: String, $country: String, $state: String, $city: String, $district: String, $street: String, $number: String, $complement: String, $isMain: Boolean) {
  PFupdateAddress(
    PFAddressID: $PFAddressID
    PFAddress: {name: $name, CEP: $CEP, country: $country, state: $state, city: $city, district: $district, street: $street, number: $number, complement: $complement, isMain: $isMain}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFupdateAddressMutationFn = Apollo.MutationFunction<PFupdateAddressMutation, PFupdateAddressMutationVariables>;

/**
 * __usePFupdateAddressMutation__
 *
 * To run a mutation, you first call `usePFupdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFupdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFupdateAddressMutation, { data, loading, error }] = usePFupdateAddressMutation({
 *   variables: {
 *      PFAddressID: // value for 'PFAddressID'
 *      name: // value for 'name'
 *      CEP: // value for 'CEP'
 *      country: // value for 'country'
 *      state: // value for 'state'
 *      city: // value for 'city'
 *      district: // value for 'district'
 *      street: // value for 'street'
 *      number: // value for 'number'
 *      complement: // value for 'complement'
 *      isMain: // value for 'isMain'
 *   },
 * });
 */
export function usePFupdateAddressMutation(baseOptions?: Apollo.MutationHookOptions<PFupdateAddressMutation, PFupdateAddressMutationVariables>) {
        return Apollo.useMutation<PFupdateAddressMutation, PFupdateAddressMutationVariables>(PFupdateAddressDocument, baseOptions);
      }
export type PFupdateAddressMutationHookResult = ReturnType<typeof usePFupdateAddressMutation>;
export type PFupdateAddressMutationResult = Apollo.MutationResult<PFupdateAddressMutation>;
export type PFupdateAddressMutationOptions = Apollo.BaseMutationOptions<PFupdateAddressMutation, PFupdateAddressMutationVariables>;
export const PFremoveAddressesDocument = gql`
    mutation PFremoveAddresses($PFAddressIDS: [ID!]!) {
  PFremoveAddresses(PFAddressIDS: $PFAddressIDS) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFremoveAddressesMutationFn = Apollo.MutationFunction<PFremoveAddressesMutation, PFremoveAddressesMutationVariables>;

/**
 * __usePFremoveAddressesMutation__
 *
 * To run a mutation, you first call `usePFremoveAddressesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFremoveAddressesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFremoveAddressesMutation, { data, loading, error }] = usePFremoveAddressesMutation({
 *   variables: {
 *      PFAddressIDS: // value for 'PFAddressIDS'
 *   },
 * });
 */
export function usePFremoveAddressesMutation(baseOptions?: Apollo.MutationHookOptions<PFremoveAddressesMutation, PFremoveAddressesMutationVariables>) {
        return Apollo.useMutation<PFremoveAddressesMutation, PFremoveAddressesMutationVariables>(PFremoveAddressesDocument, baseOptions);
      }
export type PFremoveAddressesMutationHookResult = ReturnType<typeof usePFremoveAddressesMutation>;
export type PFremoveAddressesMutationResult = Apollo.MutationResult<PFremoveAddressesMutation>;
export type PFremoveAddressesMutationOptions = Apollo.BaseMutationOptions<PFremoveAddressesMutation, PFremoveAddressesMutationVariables>;
export const PFaddContactDocument = gql`
    mutation PFaddContact($PFCustomerID: ID!, $name: String!, $email: String, $phone: String, $mobilePhone: String, $isWhatsApp: Boolean, $isMain: Boolean) {
  PFaddContact(
    PFCustomerID: $PFCustomerID
    PFContact: {name: $name, email: $email, phone: $phone, mobilePhone: $mobilePhone, isWhatsApp: $isWhatsApp, isMain: $isMain}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFaddContactMutationFn = Apollo.MutationFunction<PFaddContactMutation, PFaddContactMutationVariables>;

/**
 * __usePFaddContactMutation__
 *
 * To run a mutation, you first call `usePFaddContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFaddContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFaddContactMutation, { data, loading, error }] = usePFaddContactMutation({
 *   variables: {
 *      PFCustomerID: // value for 'PFCustomerID'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      mobilePhone: // value for 'mobilePhone'
 *      isWhatsApp: // value for 'isWhatsApp'
 *      isMain: // value for 'isMain'
 *   },
 * });
 */
export function usePFaddContactMutation(baseOptions?: Apollo.MutationHookOptions<PFaddContactMutation, PFaddContactMutationVariables>) {
        return Apollo.useMutation<PFaddContactMutation, PFaddContactMutationVariables>(PFaddContactDocument, baseOptions);
      }
export type PFaddContactMutationHookResult = ReturnType<typeof usePFaddContactMutation>;
export type PFaddContactMutationResult = Apollo.MutationResult<PFaddContactMutation>;
export type PFaddContactMutationOptions = Apollo.BaseMutationOptions<PFaddContactMutation, PFaddContactMutationVariables>;
export const PFupdateContactDocument = gql`
    mutation PFupdateContact($PFContactID: ID!, $name: String, $email: String, $phone: String, $mobilePhone: String, $isWhatsApp: Boolean, $isMain: Boolean) {
  PFupdateContact(
    PFContactID: $PFContactID
    PFContact: {name: $name, email: $email, phone: $phone, mobilePhone: $mobilePhone, isWhatsApp: $isWhatsApp, isMain: $isMain}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFupdateContactMutationFn = Apollo.MutationFunction<PFupdateContactMutation, PFupdateContactMutationVariables>;

/**
 * __usePFupdateContactMutation__
 *
 * To run a mutation, you first call `usePFupdateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFupdateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFupdateContactMutation, { data, loading, error }] = usePFupdateContactMutation({
 *   variables: {
 *      PFContactID: // value for 'PFContactID'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      mobilePhone: // value for 'mobilePhone'
 *      isWhatsApp: // value for 'isWhatsApp'
 *      isMain: // value for 'isMain'
 *   },
 * });
 */
export function usePFupdateContactMutation(baseOptions?: Apollo.MutationHookOptions<PFupdateContactMutation, PFupdateContactMutationVariables>) {
        return Apollo.useMutation<PFupdateContactMutation, PFupdateContactMutationVariables>(PFupdateContactDocument, baseOptions);
      }
export type PFupdateContactMutationHookResult = ReturnType<typeof usePFupdateContactMutation>;
export type PFupdateContactMutationResult = Apollo.MutationResult<PFupdateContactMutation>;
export type PFupdateContactMutationOptions = Apollo.BaseMutationOptions<PFupdateContactMutation, PFupdateContactMutationVariables>;
export const PFremoveContactDocument = gql`
    mutation PFremoveContact($PFContactIDS: [ID!]!) {
  PFremoveContacts(PFContactIDS: $PFContactIDS) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFremoveContactMutationFn = Apollo.MutationFunction<PFremoveContactMutation, PFremoveContactMutationVariables>;

/**
 * __usePFremoveContactMutation__
 *
 * To run a mutation, you first call `usePFremoveContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFremoveContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFremoveContactMutation, { data, loading, error }] = usePFremoveContactMutation({
 *   variables: {
 *      PFContactIDS: // value for 'PFContactIDS'
 *   },
 * });
 */
export function usePFremoveContactMutation(baseOptions?: Apollo.MutationHookOptions<PFremoveContactMutation, PFremoveContactMutationVariables>) {
        return Apollo.useMutation<PFremoveContactMutation, PFremoveContactMutationVariables>(PFremoveContactDocument, baseOptions);
      }
export type PFremoveContactMutationHookResult = ReturnType<typeof usePFremoveContactMutation>;
export type PFremoveContactMutationResult = Apollo.MutationResult<PFremoveContactMutation>;
export type PFremoveContactMutationOptions = Apollo.BaseMutationOptions<PFremoveContactMutation, PFremoveContactMutationVariables>;
export const PFaddDisabilityDocument = gql`
    mutation PFaddDisability($PFCustomerID: ID!, $CID: String!, $nomenclature: String) {
  PFaddDisability(
    PFCustomerID: $PFCustomerID
    PFDisability: {CID: $CID, nomenclature: $nomenclature}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFaddDisabilityMutationFn = Apollo.MutationFunction<PFaddDisabilityMutation, PFaddDisabilityMutationVariables>;

/**
 * __usePFaddDisabilityMutation__
 *
 * To run a mutation, you first call `usePFaddDisabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFaddDisabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFaddDisabilityMutation, { data, loading, error }] = usePFaddDisabilityMutation({
 *   variables: {
 *      PFCustomerID: // value for 'PFCustomerID'
 *      CID: // value for 'CID'
 *      nomenclature: // value for 'nomenclature'
 *   },
 * });
 */
export function usePFaddDisabilityMutation(baseOptions?: Apollo.MutationHookOptions<PFaddDisabilityMutation, PFaddDisabilityMutationVariables>) {
        return Apollo.useMutation<PFaddDisabilityMutation, PFaddDisabilityMutationVariables>(PFaddDisabilityDocument, baseOptions);
      }
export type PFaddDisabilityMutationHookResult = ReturnType<typeof usePFaddDisabilityMutation>;
export type PFaddDisabilityMutationResult = Apollo.MutationResult<PFaddDisabilityMutation>;
export type PFaddDisabilityMutationOptions = Apollo.BaseMutationOptions<PFaddDisabilityMutation, PFaddDisabilityMutationVariables>;
export const PFupdateDisabilityDocument = gql`
    mutation PFupdateDisability($PFDisabilityID: ID!, $CID: String, $nomenclature: String) {
  PFupdateDisability(
    PFDisabilityID: $PFDisabilityID
    PFDisability: {CID: $CID, nomenclature: $nomenclature}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFupdateDisabilityMutationFn = Apollo.MutationFunction<PFupdateDisabilityMutation, PFupdateDisabilityMutationVariables>;

/**
 * __usePFupdateDisabilityMutation__
 *
 * To run a mutation, you first call `usePFupdateDisabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFupdateDisabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFupdateDisabilityMutation, { data, loading, error }] = usePFupdateDisabilityMutation({
 *   variables: {
 *      PFDisabilityID: // value for 'PFDisabilityID'
 *      CID: // value for 'CID'
 *      nomenclature: // value for 'nomenclature'
 *   },
 * });
 */
export function usePFupdateDisabilityMutation(baseOptions?: Apollo.MutationHookOptions<PFupdateDisabilityMutation, PFupdateDisabilityMutationVariables>) {
        return Apollo.useMutation<PFupdateDisabilityMutation, PFupdateDisabilityMutationVariables>(PFupdateDisabilityDocument, baseOptions);
      }
export type PFupdateDisabilityMutationHookResult = ReturnType<typeof usePFupdateDisabilityMutation>;
export type PFupdateDisabilityMutationResult = Apollo.MutationResult<PFupdateDisabilityMutation>;
export type PFupdateDisabilityMutationOptions = Apollo.BaseMutationOptions<PFupdateDisabilityMutation, PFupdateDisabilityMutationVariables>;
export const PFremoveDisabilityDocument = gql`
    mutation PFremoveDisability($PFDisabilityIDS: [ID!]!) {
  PFremoveDisabilities(PFDisabilityIDS: $PFDisabilityIDS) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFremoveDisabilityMutationFn = Apollo.MutationFunction<PFremoveDisabilityMutation, PFremoveDisabilityMutationVariables>;

/**
 * __usePFremoveDisabilityMutation__
 *
 * To run a mutation, you first call `usePFremoveDisabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFremoveDisabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFremoveDisabilityMutation, { data, loading, error }] = usePFremoveDisabilityMutation({
 *   variables: {
 *      PFDisabilityIDS: // value for 'PFDisabilityIDS'
 *   },
 * });
 */
export function usePFremoveDisabilityMutation(baseOptions?: Apollo.MutationHookOptions<PFremoveDisabilityMutation, PFremoveDisabilityMutationVariables>) {
        return Apollo.useMutation<PFremoveDisabilityMutation, PFremoveDisabilityMutationVariables>(PFremoveDisabilityDocument, baseOptions);
      }
export type PFremoveDisabilityMutationHookResult = ReturnType<typeof usePFremoveDisabilityMutation>;
export type PFremoveDisabilityMutationResult = Apollo.MutationResult<PFremoveDisabilityMutation>;
export type PFremoveDisabilityMutationOptions = Apollo.BaseMutationOptions<PFremoveDisabilityMutation, PFremoveDisabilityMutationVariables>;
export const PFaddProfessionalHistoryDocument = gql`
    mutation PFaddProfessionalHistory($PFCustomerID: ID!, $companyID: ID!, $office: String!, $CBO: String!, $admissionDate: Date!, $startDate: Date, $recisionDate: Date, $EPI: Boolean) {
  PFaddProfessionalHistory(
    PFCustomerID: $PFCustomerID
    PFProfessionalHistory: {companyID: $companyID, office: $office, CBO: $CBO, admissionDate: $admissionDate, startDate: $startDate, recisionDate: $recisionDate, EPI: $EPI}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFaddProfessionalHistoryMutationFn = Apollo.MutationFunction<PFaddProfessionalHistoryMutation, PFaddProfessionalHistoryMutationVariables>;

/**
 * __usePFaddProfessionalHistoryMutation__
 *
 * To run a mutation, you first call `usePFaddProfessionalHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFaddProfessionalHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFaddProfessionalHistoryMutation, { data, loading, error }] = usePFaddProfessionalHistoryMutation({
 *   variables: {
 *      PFCustomerID: // value for 'PFCustomerID'
 *      companyID: // value for 'companyID'
 *      office: // value for 'office'
 *      CBO: // value for 'CBO'
 *      admissionDate: // value for 'admissionDate'
 *      startDate: // value for 'startDate'
 *      recisionDate: // value for 'recisionDate'
 *      EPI: // value for 'EPI'
 *   },
 * });
 */
export function usePFaddProfessionalHistoryMutation(baseOptions?: Apollo.MutationHookOptions<PFaddProfessionalHistoryMutation, PFaddProfessionalHistoryMutationVariables>) {
        return Apollo.useMutation<PFaddProfessionalHistoryMutation, PFaddProfessionalHistoryMutationVariables>(PFaddProfessionalHistoryDocument, baseOptions);
      }
export type PFaddProfessionalHistoryMutationHookResult = ReturnType<typeof usePFaddProfessionalHistoryMutation>;
export type PFaddProfessionalHistoryMutationResult = Apollo.MutationResult<PFaddProfessionalHistoryMutation>;
export type PFaddProfessionalHistoryMutationOptions = Apollo.BaseMutationOptions<PFaddProfessionalHistoryMutation, PFaddProfessionalHistoryMutationVariables>;
export const PFupdateProfessionalHistoryDocument = gql`
    mutation PFupdateProfessionalHistory($PFProfessionalHistoryID: ID!, $companyID: ID, $office: String, $CBO: String, $admissionDate: Date, $startDate: Date, $recisionDate: Date, $EPI: Boolean) {
  PFupdateProfessionalHistory(
    PFProfessionalHistoryID: $PFProfessionalHistoryID
    PFProfessionalHistory: {companyID: $companyID, office: $office, CBO: $CBO, admissionDate: $admissionDate, startDate: $startDate, recisionDate: $recisionDate, EPI: $EPI}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFupdateProfessionalHistoryMutationFn = Apollo.MutationFunction<PFupdateProfessionalHistoryMutation, PFupdateProfessionalHistoryMutationVariables>;

/**
 * __usePFupdateProfessionalHistoryMutation__
 *
 * To run a mutation, you first call `usePFupdateProfessionalHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFupdateProfessionalHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFupdateProfessionalHistoryMutation, { data, loading, error }] = usePFupdateProfessionalHistoryMutation({
 *   variables: {
 *      PFProfessionalHistoryID: // value for 'PFProfessionalHistoryID'
 *      companyID: // value for 'companyID'
 *      office: // value for 'office'
 *      CBO: // value for 'CBO'
 *      admissionDate: // value for 'admissionDate'
 *      startDate: // value for 'startDate'
 *      recisionDate: // value for 'recisionDate'
 *      EPI: // value for 'EPI'
 *   },
 * });
 */
export function usePFupdateProfessionalHistoryMutation(baseOptions?: Apollo.MutationHookOptions<PFupdateProfessionalHistoryMutation, PFupdateProfessionalHistoryMutationVariables>) {
        return Apollo.useMutation<PFupdateProfessionalHistoryMutation, PFupdateProfessionalHistoryMutationVariables>(PFupdateProfessionalHistoryDocument, baseOptions);
      }
export type PFupdateProfessionalHistoryMutationHookResult = ReturnType<typeof usePFupdateProfessionalHistoryMutation>;
export type PFupdateProfessionalHistoryMutationResult = Apollo.MutationResult<PFupdateProfessionalHistoryMutation>;
export type PFupdateProfessionalHistoryMutationOptions = Apollo.BaseMutationOptions<PFupdateProfessionalHistoryMutation, PFupdateProfessionalHistoryMutationVariables>;
export const PFremoveProfessionalHistoryDocument = gql`
    mutation PFremoveProfessionalHistory($PFProfessionalHistoryIDS: [ID!]!) {
  PFremoveProfessionalHistory(PFProfessionalHistoryIDS: $PFProfessionalHistoryIDS) {
    PFextraInfo {
      professionalHistory {
        ...PFProfessionalHistoryInfo
      }
    }
  }
}
    ${PfProfessionalHistoryInfoFragmentDoc}`;
export type PFremoveProfessionalHistoryMutationFn = Apollo.MutationFunction<PFremoveProfessionalHistoryMutation, PFremoveProfessionalHistoryMutationVariables>;

/**
 * __usePFremoveProfessionalHistoryMutation__
 *
 * To run a mutation, you first call `usePFremoveProfessionalHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFremoveProfessionalHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFremoveProfessionalHistoryMutation, { data, loading, error }] = usePFremoveProfessionalHistoryMutation({
 *   variables: {
 *      PFProfessionalHistoryIDS: // value for 'PFProfessionalHistoryIDS'
 *   },
 * });
 */
export function usePFremoveProfessionalHistoryMutation(baseOptions?: Apollo.MutationHookOptions<PFremoveProfessionalHistoryMutation, PFremoveProfessionalHistoryMutationVariables>) {
        return Apollo.useMutation<PFremoveProfessionalHistoryMutation, PFremoveProfessionalHistoryMutationVariables>(PFremoveProfessionalHistoryDocument, baseOptions);
      }
export type PFremoveProfessionalHistoryMutationHookResult = ReturnType<typeof usePFremoveProfessionalHistoryMutation>;
export type PFremoveProfessionalHistoryMutationResult = Apollo.MutationResult<PFremoveProfessionalHistoryMutation>;
export type PFremoveProfessionalHistoryMutationOptions = Apollo.BaseMutationOptions<PFremoveProfessionalHistoryMutation, PFremoveProfessionalHistoryMutationVariables>;
export const PFaddLeaveHistoryDocument = gql`
    mutation PFaddLeaveHistory($PFProfessionalHistoryID: ID!, $leaveDate: Date!, $returnDate: Date, $reason: String!, $isINSS: Boolean) {
  PFaddLeaveHistory(
    PFProfessionalHistoryID: $PFProfessionalHistoryID
    PFLeaveHistory: {leaveDate: $leaveDate, returnDate: $returnDate, reason: $reason, isINSS: $isINSS}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFaddLeaveHistoryMutationFn = Apollo.MutationFunction<PFaddLeaveHistoryMutation, PFaddLeaveHistoryMutationVariables>;

/**
 * __usePFaddLeaveHistoryMutation__
 *
 * To run a mutation, you first call `usePFaddLeaveHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFaddLeaveHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFaddLeaveHistoryMutation, { data, loading, error }] = usePFaddLeaveHistoryMutation({
 *   variables: {
 *      PFProfessionalHistoryID: // value for 'PFProfessionalHistoryID'
 *      leaveDate: // value for 'leaveDate'
 *      returnDate: // value for 'returnDate'
 *      reason: // value for 'reason'
 *      isINSS: // value for 'isINSS'
 *   },
 * });
 */
export function usePFaddLeaveHistoryMutation(baseOptions?: Apollo.MutationHookOptions<PFaddLeaveHistoryMutation, PFaddLeaveHistoryMutationVariables>) {
        return Apollo.useMutation<PFaddLeaveHistoryMutation, PFaddLeaveHistoryMutationVariables>(PFaddLeaveHistoryDocument, baseOptions);
      }
export type PFaddLeaveHistoryMutationHookResult = ReturnType<typeof usePFaddLeaveHistoryMutation>;
export type PFaddLeaveHistoryMutationResult = Apollo.MutationResult<PFaddLeaveHistoryMutation>;
export type PFaddLeaveHistoryMutationOptions = Apollo.BaseMutationOptions<PFaddLeaveHistoryMutation, PFaddLeaveHistoryMutationVariables>;
export const PFupdateLeaveHistoryDocument = gql`
    mutation PFupdateLeaveHistory($PFLeaveHistoryID: ID!, $leaveDate: Date!, $returnDate: Date, $reason: String!, $isINSS: Boolean) {
  PFupdateLeaveHistory(
    PFLeaveHistoryID: $PFLeaveHistoryID
    PFLeaveHistory: {leaveDate: $leaveDate, returnDate: $returnDate, reason: $reason, isINSS: $isINSS}
  ) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFupdateLeaveHistoryMutationFn = Apollo.MutationFunction<PFupdateLeaveHistoryMutation, PFupdateLeaveHistoryMutationVariables>;

/**
 * __usePFupdateLeaveHistoryMutation__
 *
 * To run a mutation, you first call `usePFupdateLeaveHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFupdateLeaveHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFupdateLeaveHistoryMutation, { data, loading, error }] = usePFupdateLeaveHistoryMutation({
 *   variables: {
 *      PFLeaveHistoryID: // value for 'PFLeaveHistoryID'
 *      leaveDate: // value for 'leaveDate'
 *      returnDate: // value for 'returnDate'
 *      reason: // value for 'reason'
 *      isINSS: // value for 'isINSS'
 *   },
 * });
 */
export function usePFupdateLeaveHistoryMutation(baseOptions?: Apollo.MutationHookOptions<PFupdateLeaveHistoryMutation, PFupdateLeaveHistoryMutationVariables>) {
        return Apollo.useMutation<PFupdateLeaveHistoryMutation, PFupdateLeaveHistoryMutationVariables>(PFupdateLeaveHistoryDocument, baseOptions);
      }
export type PFupdateLeaveHistoryMutationHookResult = ReturnType<typeof usePFupdateLeaveHistoryMutation>;
export type PFupdateLeaveHistoryMutationResult = Apollo.MutationResult<PFupdateLeaveHistoryMutation>;
export type PFupdateLeaveHistoryMutationOptions = Apollo.BaseMutationOptions<PFupdateLeaveHistoryMutation, PFupdateLeaveHistoryMutationVariables>;
export const PFremoveLeaveHistoryDocument = gql`
    mutation PFremoveLeaveHistory($PFLeaveHistoryIDS: [ID!]!) {
  PFremoveLeaveHistory(PFLeaveHistoryIDS: $PFLeaveHistoryIDS) {
    ...PFCustomerInfo
  }
}
    ${PfCustomerInfoFragmentDoc}`;
export type PFremoveLeaveHistoryMutationFn = Apollo.MutationFunction<PFremoveLeaveHistoryMutation, PFremoveLeaveHistoryMutationVariables>;

/**
 * __usePFremoveLeaveHistoryMutation__
 *
 * To run a mutation, you first call `usePFremoveLeaveHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFremoveLeaveHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFremoveLeaveHistoryMutation, { data, loading, error }] = usePFremoveLeaveHistoryMutation({
 *   variables: {
 *      PFLeaveHistoryIDS: // value for 'PFLeaveHistoryIDS'
 *   },
 * });
 */
export function usePFremoveLeaveHistoryMutation(baseOptions?: Apollo.MutationHookOptions<PFremoveLeaveHistoryMutation, PFremoveLeaveHistoryMutationVariables>) {
        return Apollo.useMutation<PFremoveLeaveHistoryMutation, PFremoveLeaveHistoryMutationVariables>(PFremoveLeaveHistoryDocument, baseOptions);
      }
export type PFremoveLeaveHistoryMutationHookResult = ReturnType<typeof usePFremoveLeaveHistoryMutation>;
export type PFremoveLeaveHistoryMutationResult = Apollo.MutationResult<PFremoveLeaveHistoryMutation>;
export type PFremoveLeaveHistoryMutationOptions = Apollo.BaseMutationOptions<PFremoveLeaveHistoryMutation, PFremoveLeaveHistoryMutationVariables>;
export const PJaddCustomerDocument = gql`
    mutation PJaddCustomer($legalName: String!, $tradingName: String!, $CNPJ: CNPJ!, $isActive: Boolean, $isAssociated: Boolean) {
  PJaddCustomer(
    PJCustomer: {legalName: $legalName, tradingName: $tradingName, CNPJ: $CNPJ, isActive: $isActive, isAssociated: $isAssociated}
  ) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;
export type PJaddCustomerMutationFn = Apollo.MutationFunction<PJaddCustomerMutation, PJaddCustomerMutationVariables>;

/**
 * __usePJaddCustomerMutation__
 *
 * To run a mutation, you first call `usePJaddCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJaddCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJaddCustomerMutation, { data, loading, error }] = usePJaddCustomerMutation({
 *   variables: {
 *      legalName: // value for 'legalName'
 *      tradingName: // value for 'tradingName'
 *      CNPJ: // value for 'CNPJ'
 *      isActive: // value for 'isActive'
 *      isAssociated: // value for 'isAssociated'
 *   },
 * });
 */
export function usePJaddCustomerMutation(baseOptions?: Apollo.MutationHookOptions<PJaddCustomerMutation, PJaddCustomerMutationVariables>) {
        return Apollo.useMutation<PJaddCustomerMutation, PJaddCustomerMutationVariables>(PJaddCustomerDocument, baseOptions);
      }
export type PJaddCustomerMutationHookResult = ReturnType<typeof usePJaddCustomerMutation>;
export type PJaddCustomerMutationResult = Apollo.MutationResult<PJaddCustomerMutation>;
export type PJaddCustomerMutationOptions = Apollo.BaseMutationOptions<PJaddCustomerMutation, PJaddCustomerMutationVariables>;
export const PJupdateCustomerDocument = gql`
    mutation PJupdateCustomer($PJCustomerID: ID!, $legalName: String, $tradingName: String, $CNPJ: CNPJ, $isActive: Boolean, $isAssociated: Boolean) {
  PJupdateCustomer(
    PJCustomerID: $PJCustomerID
    PJCustomer: {legalName: $legalName, tradingName: $tradingName, CNPJ: $CNPJ, isActive: $isActive, isAssociated: $isAssociated}
  ) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;
export type PJupdateCustomerMutationFn = Apollo.MutationFunction<PJupdateCustomerMutation, PJupdateCustomerMutationVariables>;

/**
 * __usePJupdateCustomerMutation__
 *
 * To run a mutation, you first call `usePJupdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJupdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJupdateCustomerMutation, { data, loading, error }] = usePJupdateCustomerMutation({
 *   variables: {
 *      PJCustomerID: // value for 'PJCustomerID'
 *      legalName: // value for 'legalName'
 *      tradingName: // value for 'tradingName'
 *      CNPJ: // value for 'CNPJ'
 *      isActive: // value for 'isActive'
 *      isAssociated: // value for 'isAssociated'
 *   },
 * });
 */
export function usePJupdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<PJupdateCustomerMutation, PJupdateCustomerMutationVariables>) {
        return Apollo.useMutation<PJupdateCustomerMutation, PJupdateCustomerMutationVariables>(PJupdateCustomerDocument, baseOptions);
      }
export type PJupdateCustomerMutationHookResult = ReturnType<typeof usePJupdateCustomerMutation>;
export type PJupdateCustomerMutationResult = Apollo.MutationResult<PJupdateCustomerMutation>;
export type PJupdateCustomerMutationOptions = Apollo.BaseMutationOptions<PJupdateCustomerMutation, PJupdateCustomerMutationVariables>;
export const PJremoveCustomersDocument = gql`
    mutation PJremoveCustomers($PJCustomerIDS: [ID!]!) {
  PJremoveCustomers(PJCustomerIDS: $PJCustomerIDS)
}
    `;
export type PJremoveCustomersMutationFn = Apollo.MutationFunction<PJremoveCustomersMutation, PJremoveCustomersMutationVariables>;

/**
 * __usePJremoveCustomersMutation__
 *
 * To run a mutation, you first call `usePJremoveCustomersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJremoveCustomersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJremoveCustomersMutation, { data, loading, error }] = usePJremoveCustomersMutation({
 *   variables: {
 *      PJCustomerIDS: // value for 'PJCustomerIDS'
 *   },
 * });
 */
export function usePJremoveCustomersMutation(baseOptions?: Apollo.MutationHookOptions<PJremoveCustomersMutation, PJremoveCustomersMutationVariables>) {
        return Apollo.useMutation<PJremoveCustomersMutation, PJremoveCustomersMutationVariables>(PJremoveCustomersDocument, baseOptions);
      }
export type PJremoveCustomersMutationHookResult = ReturnType<typeof usePJremoveCustomersMutation>;
export type PJremoveCustomersMutationResult = Apollo.MutationResult<PJremoveCustomersMutation>;
export type PJremoveCustomersMutationOptions = Apollo.BaseMutationOptions<PJremoveCustomersMutation, PJremoveCustomersMutationVariables>;
export const PJaddAddressDocument = gql`
    mutation PJaddAddress($PJCustomerID: ID!, $name: String!, $CEP: String!, $country: String, $state: String!, $city: String!, $district: String, $street: String!, $number: String!, $complement: String, $isMain: Boolean) {
  PJaddAddress(
    PJCustomerID: $PJCustomerID
    PJAddress: {name: $name, CEP: $CEP, country: $country, state: $state, city: $city, district: $district, street: $street, number: $number, complement: $complement, isMain: $isMain}
  ) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;
export type PJaddAddressMutationFn = Apollo.MutationFunction<PJaddAddressMutation, PJaddAddressMutationVariables>;

/**
 * __usePJaddAddressMutation__
 *
 * To run a mutation, you first call `usePJaddAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJaddAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJaddAddressMutation, { data, loading, error }] = usePJaddAddressMutation({
 *   variables: {
 *      PJCustomerID: // value for 'PJCustomerID'
 *      name: // value for 'name'
 *      CEP: // value for 'CEP'
 *      country: // value for 'country'
 *      state: // value for 'state'
 *      city: // value for 'city'
 *      district: // value for 'district'
 *      street: // value for 'street'
 *      number: // value for 'number'
 *      complement: // value for 'complement'
 *      isMain: // value for 'isMain'
 *   },
 * });
 */
export function usePJaddAddressMutation(baseOptions?: Apollo.MutationHookOptions<PJaddAddressMutation, PJaddAddressMutationVariables>) {
        return Apollo.useMutation<PJaddAddressMutation, PJaddAddressMutationVariables>(PJaddAddressDocument, baseOptions);
      }
export type PJaddAddressMutationHookResult = ReturnType<typeof usePJaddAddressMutation>;
export type PJaddAddressMutationResult = Apollo.MutationResult<PJaddAddressMutation>;
export type PJaddAddressMutationOptions = Apollo.BaseMutationOptions<PJaddAddressMutation, PJaddAddressMutationVariables>;
export const PJupdateAddressDocument = gql`
    mutation PJupdateAddress($PJAddressID: ID!, $name: String!, $CEP: String!, $country: String, $state: String!, $city: String!, $district: String, $street: String!, $number: String!, $complement: String, $isMain: Boolean) {
  PJupdateAddress(
    PJAddressID: $PJAddressID
    PJAddress: {name: $name, CEP: $CEP, country: $country, state: $state, city: $city, district: $district, street: $street, number: $number, complement: $complement, isMain: $isMain}
  ) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;
export type PJupdateAddressMutationFn = Apollo.MutationFunction<PJupdateAddressMutation, PJupdateAddressMutationVariables>;

/**
 * __usePJupdateAddressMutation__
 *
 * To run a mutation, you first call `usePJupdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJupdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJupdateAddressMutation, { data, loading, error }] = usePJupdateAddressMutation({
 *   variables: {
 *      PJAddressID: // value for 'PJAddressID'
 *      name: // value for 'name'
 *      CEP: // value for 'CEP'
 *      country: // value for 'country'
 *      state: // value for 'state'
 *      city: // value for 'city'
 *      district: // value for 'district'
 *      street: // value for 'street'
 *      number: // value for 'number'
 *      complement: // value for 'complement'
 *      isMain: // value for 'isMain'
 *   },
 * });
 */
export function usePJupdateAddressMutation(baseOptions?: Apollo.MutationHookOptions<PJupdateAddressMutation, PJupdateAddressMutationVariables>) {
        return Apollo.useMutation<PJupdateAddressMutation, PJupdateAddressMutationVariables>(PJupdateAddressDocument, baseOptions);
      }
export type PJupdateAddressMutationHookResult = ReturnType<typeof usePJupdateAddressMutation>;
export type PJupdateAddressMutationResult = Apollo.MutationResult<PJupdateAddressMutation>;
export type PJupdateAddressMutationOptions = Apollo.BaseMutationOptions<PJupdateAddressMutation, PJupdateAddressMutationVariables>;
export const PJremoveAddressesDocument = gql`
    mutation PJremoveAddresses($PJAddressIDS: [ID!]!) {
  PJremoveAddresses(PJAddressIDS: $PJAddressIDS) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;
export type PJremoveAddressesMutationFn = Apollo.MutationFunction<PJremoveAddressesMutation, PJremoveAddressesMutationVariables>;

/**
 * __usePJremoveAddressesMutation__
 *
 * To run a mutation, you first call `usePJremoveAddressesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJremoveAddressesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJremoveAddressesMutation, { data, loading, error }] = usePJremoveAddressesMutation({
 *   variables: {
 *      PJAddressIDS: // value for 'PJAddressIDS'
 *   },
 * });
 */
export function usePJremoveAddressesMutation(baseOptions?: Apollo.MutationHookOptions<PJremoveAddressesMutation, PJremoveAddressesMutationVariables>) {
        return Apollo.useMutation<PJremoveAddressesMutation, PJremoveAddressesMutationVariables>(PJremoveAddressesDocument, baseOptions);
      }
export type PJremoveAddressesMutationHookResult = ReturnType<typeof usePJremoveAddressesMutation>;
export type PJremoveAddressesMutationResult = Apollo.MutationResult<PJremoveAddressesMutation>;
export type PJremoveAddressesMutationOptions = Apollo.BaseMutationOptions<PJremoveAddressesMutation, PJremoveAddressesMutationVariables>;
export const PJaddContactDocument = gql`
    mutation PJaddContact($PJCustomerID: ID!, $contactEmployeeName: String, $email: String, $phone: String, $mobilePhone: String, $site: String, $isWhatsApp: Boolean, $isMain: Boolean) {
  PJaddContact(
    PJCustomerID: $PJCustomerID
    PJContact: {contactEmployeeName: $contactEmployeeName, email: $email, phone: $phone, mobilePhone: $mobilePhone, site: $site, isWhatsApp: $isWhatsApp, isMain: $isMain}
  ) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;
export type PJaddContactMutationFn = Apollo.MutationFunction<PJaddContactMutation, PJaddContactMutationVariables>;

/**
 * __usePJaddContactMutation__
 *
 * To run a mutation, you first call `usePJaddContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJaddContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJaddContactMutation, { data, loading, error }] = usePJaddContactMutation({
 *   variables: {
 *      PJCustomerID: // value for 'PJCustomerID'
 *      contactEmployeeName: // value for 'contactEmployeeName'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      mobilePhone: // value for 'mobilePhone'
 *      site: // value for 'site'
 *      isWhatsApp: // value for 'isWhatsApp'
 *      isMain: // value for 'isMain'
 *   },
 * });
 */
export function usePJaddContactMutation(baseOptions?: Apollo.MutationHookOptions<PJaddContactMutation, PJaddContactMutationVariables>) {
        return Apollo.useMutation<PJaddContactMutation, PJaddContactMutationVariables>(PJaddContactDocument, baseOptions);
      }
export type PJaddContactMutationHookResult = ReturnType<typeof usePJaddContactMutation>;
export type PJaddContactMutationResult = Apollo.MutationResult<PJaddContactMutation>;
export type PJaddContactMutationOptions = Apollo.BaseMutationOptions<PJaddContactMutation, PJaddContactMutationVariables>;
export const PJupdateContactDocument = gql`
    mutation PJupdateContact($PJContactID: ID!, $contactEmployeeName: String, $email: String, $phone: String, $mobilePhone: String, $site: String, $isWhatsApp: Boolean, $isMain: Boolean) {
  PJupdateContact(
    PJContactID: $PJContactID
    PJContact: {contactEmployeeName: $contactEmployeeName, email: $email, phone: $phone, mobilePhone: $mobilePhone, site: $site, isWhatsApp: $isWhatsApp, isMain: $isMain}
  ) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;
export type PJupdateContactMutationFn = Apollo.MutationFunction<PJupdateContactMutation, PJupdateContactMutationVariables>;

/**
 * __usePJupdateContactMutation__
 *
 * To run a mutation, you first call `usePJupdateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJupdateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJupdateContactMutation, { data, loading, error }] = usePJupdateContactMutation({
 *   variables: {
 *      PJContactID: // value for 'PJContactID'
 *      contactEmployeeName: // value for 'contactEmployeeName'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      mobilePhone: // value for 'mobilePhone'
 *      site: // value for 'site'
 *      isWhatsApp: // value for 'isWhatsApp'
 *      isMain: // value for 'isMain'
 *   },
 * });
 */
export function usePJupdateContactMutation(baseOptions?: Apollo.MutationHookOptions<PJupdateContactMutation, PJupdateContactMutationVariables>) {
        return Apollo.useMutation<PJupdateContactMutation, PJupdateContactMutationVariables>(PJupdateContactDocument, baseOptions);
      }
export type PJupdateContactMutationHookResult = ReturnType<typeof usePJupdateContactMutation>;
export type PJupdateContactMutationResult = Apollo.MutationResult<PJupdateContactMutation>;
export type PJupdateContactMutationOptions = Apollo.BaseMutationOptions<PJupdateContactMutation, PJupdateContactMutationVariables>;
export const PJremoveContactsDocument = gql`
    mutation PJremoveContacts($PJContactIDS: [ID!]!) {
  PJremoveContacts(PJContactIDS: $PJContactIDS) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;
export type PJremoveContactsMutationFn = Apollo.MutationFunction<PJremoveContactsMutation, PJremoveContactsMutationVariables>;

/**
 * __usePJremoveContactsMutation__
 *
 * To run a mutation, you first call `usePJremoveContactsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJremoveContactsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJremoveContactsMutation, { data, loading, error }] = usePJremoveContactsMutation({
 *   variables: {
 *      PJContactIDS: // value for 'PJContactIDS'
 *   },
 * });
 */
export function usePJremoveContactsMutation(baseOptions?: Apollo.MutationHookOptions<PJremoveContactsMutation, PJremoveContactsMutationVariables>) {
        return Apollo.useMutation<PJremoveContactsMutation, PJremoveContactsMutationVariables>(PJremoveContactsDocument, baseOptions);
      }
export type PJremoveContactsMutationHookResult = ReturnType<typeof usePJremoveContactsMutation>;
export type PJremoveContactsMutationResult = Apollo.MutationResult<PJremoveContactsMutation>;
export type PJremoveContactsMutationOptions = Apollo.BaseMutationOptions<PJremoveContactsMutation, PJremoveContactsMutationVariables>;
export const PJaddActivityClassificationDocument = gql`
    mutation PJaddActivityClassification($PJCustomerID: ID!, $CNAE: String!, $description: String, $isMain: Boolean) {
  PJaddActivityClassification(
    PJCustomerID: $PJCustomerID
    PJActivityClassification: {CNAE: $CNAE, description: $description, isMain: $isMain}
  ) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;
export type PJaddActivityClassificationMutationFn = Apollo.MutationFunction<PJaddActivityClassificationMutation, PJaddActivityClassificationMutationVariables>;

/**
 * __usePJaddActivityClassificationMutation__
 *
 * To run a mutation, you first call `usePJaddActivityClassificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJaddActivityClassificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJaddActivityClassificationMutation, { data, loading, error }] = usePJaddActivityClassificationMutation({
 *   variables: {
 *      PJCustomerID: // value for 'PJCustomerID'
 *      CNAE: // value for 'CNAE'
 *      description: // value for 'description'
 *      isMain: // value for 'isMain'
 *   },
 * });
 */
export function usePJaddActivityClassificationMutation(baseOptions?: Apollo.MutationHookOptions<PJaddActivityClassificationMutation, PJaddActivityClassificationMutationVariables>) {
        return Apollo.useMutation<PJaddActivityClassificationMutation, PJaddActivityClassificationMutationVariables>(PJaddActivityClassificationDocument, baseOptions);
      }
export type PJaddActivityClassificationMutationHookResult = ReturnType<typeof usePJaddActivityClassificationMutation>;
export type PJaddActivityClassificationMutationResult = Apollo.MutationResult<PJaddActivityClassificationMutation>;
export type PJaddActivityClassificationMutationOptions = Apollo.BaseMutationOptions<PJaddActivityClassificationMutation, PJaddActivityClassificationMutationVariables>;
export const PJupdateActivityClassificationDocument = gql`
    mutation PJupdateActivityClassification($PJActivityID: ID!, $CNAE: String!, $description: String, $isMain: Boolean) {
  PJupdateActivityClassification(
    PJActivityID: $PJActivityID
    PJActivityClassification: {CNAE: $CNAE, description: $description, isMain: $isMain}
  ) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;
export type PJupdateActivityClassificationMutationFn = Apollo.MutationFunction<PJupdateActivityClassificationMutation, PJupdateActivityClassificationMutationVariables>;

/**
 * __usePJupdateActivityClassificationMutation__
 *
 * To run a mutation, you first call `usePJupdateActivityClassificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJupdateActivityClassificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJupdateActivityClassificationMutation, { data, loading, error }] = usePJupdateActivityClassificationMutation({
 *   variables: {
 *      PJActivityID: // value for 'PJActivityID'
 *      CNAE: // value for 'CNAE'
 *      description: // value for 'description'
 *      isMain: // value for 'isMain'
 *   },
 * });
 */
export function usePJupdateActivityClassificationMutation(baseOptions?: Apollo.MutationHookOptions<PJupdateActivityClassificationMutation, PJupdateActivityClassificationMutationVariables>) {
        return Apollo.useMutation<PJupdateActivityClassificationMutation, PJupdateActivityClassificationMutationVariables>(PJupdateActivityClassificationDocument, baseOptions);
      }
export type PJupdateActivityClassificationMutationHookResult = ReturnType<typeof usePJupdateActivityClassificationMutation>;
export type PJupdateActivityClassificationMutationResult = Apollo.MutationResult<PJupdateActivityClassificationMutation>;
export type PJupdateActivityClassificationMutationOptions = Apollo.BaseMutationOptions<PJupdateActivityClassificationMutation, PJupdateActivityClassificationMutationVariables>;
export const PJremoveActivityClassificationsDocument = gql`
    mutation PJremoveActivityClassifications($PJActivityIDS: [ID!]!) {
  PJremoveActivityClassifications(PJActivityIDS: $PJActivityIDS) {
    ...PJCustomerInfo
  }
}
    ${PjCustomerInfoFragmentDoc}`;
export type PJremoveActivityClassificationsMutationFn = Apollo.MutationFunction<PJremoveActivityClassificationsMutation, PJremoveActivityClassificationsMutationVariables>;

/**
 * __usePJremoveActivityClassificationsMutation__
 *
 * To run a mutation, you first call `usePJremoveActivityClassificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJremoveActivityClassificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJremoveActivityClassificationsMutation, { data, loading, error }] = usePJremoveActivityClassificationsMutation({
 *   variables: {
 *      PJActivityIDS: // value for 'PJActivityIDS'
 *   },
 * });
 */
export function usePJremoveActivityClassificationsMutation(baseOptions?: Apollo.MutationHookOptions<PJremoveActivityClassificationsMutation, PJremoveActivityClassificationsMutationVariables>) {
        return Apollo.useMutation<PJremoveActivityClassificationsMutation, PJremoveActivityClassificationsMutationVariables>(PJremoveActivityClassificationsDocument, baseOptions);
      }
export type PJremoveActivityClassificationsMutationHookResult = ReturnType<typeof usePJremoveActivityClassificationsMutation>;
export type PJremoveActivityClassificationsMutationResult = Apollo.MutationResult<PJremoveActivityClassificationsMutation>;
export type PJremoveActivityClassificationsMutationOptions = Apollo.BaseMutationOptions<PJremoveActivityClassificationsMutation, PJremoveActivityClassificationsMutationVariables>;
export const FetchServicesDocument = gql`
    query fetchServices {
  fetchServices {
    ...ServiceInfo
  }
}
    ${ServiceInfoFragmentDoc}`;

/**
 * __useFetchServicesQuery__
 *
 * To run a query within a React component, call `useFetchServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchServicesQuery(baseOptions?: Apollo.QueryHookOptions<FetchServicesQuery, FetchServicesQueryVariables>) {
        return Apollo.useQuery<FetchServicesQuery, FetchServicesQueryVariables>(FetchServicesDocument, baseOptions);
      }
export function useFetchServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchServicesQuery, FetchServicesQueryVariables>) {
          return Apollo.useLazyQuery<FetchServicesQuery, FetchServicesQueryVariables>(FetchServicesDocument, baseOptions);
        }
export type FetchServicesQueryHookResult = ReturnType<typeof useFetchServicesQuery>;
export type FetchServicesLazyQueryHookResult = ReturnType<typeof useFetchServicesLazyQuery>;
export type FetchServicesQueryResult = Apollo.QueryResult<FetchServicesQuery, FetchServicesQueryVariables>;
export const FetchServicesByIdDocument = gql`
    query fetchServicesByID($ids: [ID!]!) {
  fetchServicesById(ServiceIDS: $ids) {
    ...ServiceInfo
  }
}
    ${ServiceInfoFragmentDoc}`;

/**
 * __useFetchServicesByIdQuery__
 *
 * To run a query within a React component, call `useFetchServicesByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchServicesByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchServicesByIdQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFetchServicesByIdQuery(baseOptions: Apollo.QueryHookOptions<FetchServicesByIdQuery, FetchServicesByIdQueryVariables>) {
        return Apollo.useQuery<FetchServicesByIdQuery, FetchServicesByIdQueryVariables>(FetchServicesByIdDocument, baseOptions);
      }
export function useFetchServicesByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchServicesByIdQuery, FetchServicesByIdQueryVariables>) {
          return Apollo.useLazyQuery<FetchServicesByIdQuery, FetchServicesByIdQueryVariables>(FetchServicesByIdDocument, baseOptions);
        }
export type FetchServicesByIdQueryHookResult = ReturnType<typeof useFetchServicesByIdQuery>;
export type FetchServicesByIdLazyQueryHookResult = ReturnType<typeof useFetchServicesByIdLazyQuery>;
export type FetchServicesByIdQueryResult = Apollo.QueryResult<FetchServicesByIdQuery, FetchServicesByIdQueryVariables>;
export const FetchServiceByIdDocument = gql`
    query fetchServiceByID($id: ID!) {
  fetchServiceById(ServiceID: $id) {
    ...ServiceInfo
  }
}
    ${ServiceInfoFragmentDoc}`;

/**
 * __useFetchServiceByIdQuery__
 *
 * To run a query within a React component, call `useFetchServiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchServiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchServiceByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchServiceByIdQuery(baseOptions: Apollo.QueryHookOptions<FetchServiceByIdQuery, FetchServiceByIdQueryVariables>) {
        return Apollo.useQuery<FetchServiceByIdQuery, FetchServiceByIdQueryVariables>(FetchServiceByIdDocument, baseOptions);
      }
export function useFetchServiceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchServiceByIdQuery, FetchServiceByIdQueryVariables>) {
          return Apollo.useLazyQuery<FetchServiceByIdQuery, FetchServiceByIdQueryVariables>(FetchServiceByIdDocument, baseOptions);
        }
export type FetchServiceByIdQueryHookResult = ReturnType<typeof useFetchServiceByIdQuery>;
export type FetchServiceByIdLazyQueryHookResult = ReturnType<typeof useFetchServiceByIdLazyQuery>;
export type FetchServiceByIdQueryResult = Apollo.QueryResult<FetchServiceByIdQuery, FetchServiceByIdQueryVariables>;
export const AddServiceDocument = gql`
    mutation addService($name: String!, $code: String!, $description: String!, $deliveryTime: Int, $baseSaleValue: Float, $associatedSaleValue: Float, $baseCost: Float, $fixedRentability: Float, $percentualRentability: Float, $fixedAssociatedDiscount: Float, $percentualAssociatedDiscount: Float) {
  addService(
    Service: {name: $name, code: $code, description: $description, deliveryTime: $deliveryTime, baseSaleValue: $baseSaleValue, associatedSaleValue: $associatedSaleValue, baseCost: $baseCost, fixedRentability: $fixedRentability, percentualRentability: $percentualRentability, fixedAssociatedDiscount: $fixedAssociatedDiscount, percentualAssociatedDiscount: $percentualAssociatedDiscount}
  ) {
    ...ServiceInfo
  }
}
    ${ServiceInfoFragmentDoc}`;
export type AddServiceMutationFn = Apollo.MutationFunction<AddServiceMutation, AddServiceMutationVariables>;

/**
 * __useAddServiceMutation__
 *
 * To run a mutation, you first call `useAddServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addServiceMutation, { data, loading, error }] = useAddServiceMutation({
 *   variables: {
 *      name: // value for 'name'
 *      code: // value for 'code'
 *      description: // value for 'description'
 *      deliveryTime: // value for 'deliveryTime'
 *      baseSaleValue: // value for 'baseSaleValue'
 *      associatedSaleValue: // value for 'associatedSaleValue'
 *      baseCost: // value for 'baseCost'
 *      fixedRentability: // value for 'fixedRentability'
 *      percentualRentability: // value for 'percentualRentability'
 *      fixedAssociatedDiscount: // value for 'fixedAssociatedDiscount'
 *      percentualAssociatedDiscount: // value for 'percentualAssociatedDiscount'
 *   },
 * });
 */
export function useAddServiceMutation(baseOptions?: Apollo.MutationHookOptions<AddServiceMutation, AddServiceMutationVariables>) {
        return Apollo.useMutation<AddServiceMutation, AddServiceMutationVariables>(AddServiceDocument, baseOptions);
      }
export type AddServiceMutationHookResult = ReturnType<typeof useAddServiceMutation>;
export type AddServiceMutationResult = Apollo.MutationResult<AddServiceMutation>;
export type AddServiceMutationOptions = Apollo.BaseMutationOptions<AddServiceMutation, AddServiceMutationVariables>;
export const RemoveServicesDocument = gql`
    mutation removeServices($ServiceIDS: [ID!]!) {
  removeServices(ServiceIDS: $ServiceIDS)
}
    `;
export type RemoveServicesMutationFn = Apollo.MutationFunction<RemoveServicesMutation, RemoveServicesMutationVariables>;

/**
 * __useRemoveServicesMutation__
 *
 * To run a mutation, you first call `useRemoveServicesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveServicesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeServicesMutation, { data, loading, error }] = useRemoveServicesMutation({
 *   variables: {
 *      ServiceIDS: // value for 'ServiceIDS'
 *   },
 * });
 */
export function useRemoveServicesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveServicesMutation, RemoveServicesMutationVariables>) {
        return Apollo.useMutation<RemoveServicesMutation, RemoveServicesMutationVariables>(RemoveServicesDocument, baseOptions);
      }
export type RemoveServicesMutationHookResult = ReturnType<typeof useRemoveServicesMutation>;
export type RemoveServicesMutationResult = Apollo.MutationResult<RemoveServicesMutation>;
export type RemoveServicesMutationOptions = Apollo.BaseMutationOptions<RemoveServicesMutation, RemoveServicesMutationVariables>;
export const UpdateServicesDocument = gql`
    mutation updateServices($ServiceID: ID!, $makeCalculations: Boolean, $name: String, $code: String, $description: String, $deliveryTime: Int, $baseSaleValue: Float, $associatedSaleValue: Float, $baseCost: Float, $fixedRentability: Float, $percentualRentability: Float, $fixedAssociatedDiscount: Float, $percentualAssociatedDiscount: Float) {
  updateService(
    ServiceID: $ServiceID
    makeCalculations: $makeCalculations
    Service: {name: $name, code: $code, description: $description, deliveryTime: $deliveryTime, baseSaleValue: $baseSaleValue, associatedSaleValue: $associatedSaleValue, baseCost: $baseCost, fixedRentability: $fixedRentability, percentualRentability: $percentualRentability, fixedAssociatedDiscount: $fixedAssociatedDiscount, percentualAssociatedDiscount: $percentualAssociatedDiscount}
  ) {
    ...ServiceInfo
  }
}
    ${ServiceInfoFragmentDoc}`;
export type UpdateServicesMutationFn = Apollo.MutationFunction<UpdateServicesMutation, UpdateServicesMutationVariables>;

/**
 * __useUpdateServicesMutation__
 *
 * To run a mutation, you first call `useUpdateServicesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServicesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServicesMutation, { data, loading, error }] = useUpdateServicesMutation({
 *   variables: {
 *      ServiceID: // value for 'ServiceID'
 *      makeCalculations: // value for 'makeCalculations'
 *      name: // value for 'name'
 *      code: // value for 'code'
 *      description: // value for 'description'
 *      deliveryTime: // value for 'deliveryTime'
 *      baseSaleValue: // value for 'baseSaleValue'
 *      associatedSaleValue: // value for 'associatedSaleValue'
 *      baseCost: // value for 'baseCost'
 *      fixedRentability: // value for 'fixedRentability'
 *      percentualRentability: // value for 'percentualRentability'
 *      fixedAssociatedDiscount: // value for 'fixedAssociatedDiscount'
 *      percentualAssociatedDiscount: // value for 'percentualAssociatedDiscount'
 *   },
 * });
 */
export function useUpdateServicesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServicesMutation, UpdateServicesMutationVariables>) {
        return Apollo.useMutation<UpdateServicesMutation, UpdateServicesMutationVariables>(UpdateServicesDocument, baseOptions);
      }
export type UpdateServicesMutationHookResult = ReturnType<typeof useUpdateServicesMutation>;
export type UpdateServicesMutationResult = Apollo.MutationResult<UpdateServicesMutation>;
export type UpdateServicesMutationOptions = Apollo.BaseMutationOptions<UpdateServicesMutation, UpdateServicesMutationVariables>;