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
  fetchCustomers: Array<PfCustomer>;
  fetchCustomersPFById: Array<PfCustomer>;
  PJfetchCustomers: Array<PjCustomer>;
  PJfetchCustomersById: Array<PjCustomer>;
  protectedQuery: Scalars['String'];
};


export type QueryFetchCustomersPfByIdArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryPJfetchCustomersByIdArgs = {
  ids: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createCustomer: PfCustomer;
  createBaseCustomer: PfCustomer;
  removeCustomers: Scalars['Boolean'];
  PFaddCompany: Array<PfCustomer>;
  PFremoveCompany: Array<PfCustomer>;
  PJcreateBaseCustomer: PjCustomer;
  PJremoveCustomers: Scalars['Boolean'];
  register: User;
};


export type MutationCreateCustomerArgs = {
  PFCustomer: PfCustomerInput;
};


export type MutationCreateBaseCustomerArgs = {
  PFCustomer: PfCustomerBaseInput;
};


export type MutationRemoveCustomersArgs = {
  ids: Array<Scalars['String']>;
};


export type MutationPFaddCompanyArgs = {
  PFCustomerIDS: Array<Scalars['ID']>;
  PJCustomerID: Scalars['ID'];
  force?: Maybe<Scalars['Boolean']>;
};


export type MutationPFremoveCompanyArgs = {
  PFCustomerIDS: Array<Scalars['ID']>;
};


export type MutationPJcreateBaseCustomerArgs = {
  PJCustomer: PjCustomerBaseInput;
};


export type MutationPJremoveCustomersArgs = {
  ids?: Maybe<Array<Scalars['ID']>>;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
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
  name: Scalars['String'];
  CEP: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  city: Scalars['String'];
  district: Scalars['String'];
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
  office: Scalars['String'];
  CBO: Scalars['String'];
  admissionDate: Scalars['Date'];
  startDate?: Maybe<Scalars['Date']>;
  recisionDate?: Maybe<Scalars['Date']>;
  EPI: Scalars['Boolean'];
  address?: Maybe<PfAddress>;
  leaveHistory?: Maybe<Array<PfLeaveHistory>>;
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
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
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
  company?: Maybe<PjCustomer>;
  isActive: Scalars['Boolean'];
  hasDisability: Scalars['Boolean'];
  extraInfo?: Maybe<Array<PfExtraInfo>>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PfDisabilityInput = {
  CID: Scalars['String'];
  nomenclature?: Maybe<Scalars['String']>;
};

export type PfContactInput = {
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
  district: Scalars['String'];
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
  office: Scalars['String'];
  CBO: Scalars['String'];
  admissionDate: Scalars['Date'];
  startDate?: Maybe<Scalars['Date']>;
  recisionDate?: Maybe<Scalars['Date']>;
  EPI?: Maybe<Scalars['Boolean']>;
  address?: Maybe<PfAddressInput>;
  leaveHistory?: Maybe<Array<PfLeaveHistoryInput>>;
};

export type PfExtraInfoInput = {
  contacts?: Maybe<Array<PfContactInput>>;
  addresses?: Maybe<Array<PfAddressInput>>;
  professionalHistory?: Maybe<Array<PfProfessionalHistoryInput>>;
  disabilities?: Maybe<Array<PfDisabilityInput>>;
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
  extraInfo?: Maybe<Array<PfExtraInfoInput>>;
};

export type PfCustomerBaseInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  birthDate: Scalars['Date'];
  CPF: Scalars['CPF'];
  gender: GenderEnum;
  preferedPronoun: PreferedPronounEnum;
  isActive?: Maybe<Scalars['Boolean']>;
  hasDisability?: Maybe<Scalars['Boolean']>;
};

export type PjCustomer = {
  __typename?: 'PJCustomer';
  id: Scalars['ID'];
  legalName: Scalars['String'];
  tradingName: Scalars['String'];
  CNPJ: Scalars['CNPJ'];
  employees?: Maybe<Array<PfCustomer>>;
  isActive?: Maybe<Scalars['Boolean']>;
  isAssociated?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type PjCustomerBaseInput = {
  legalName: Scalars['String'];
  tradingName: Scalars['String'];
  CNPJ: Scalars['CNPJ'];
  isActive?: Maybe<Scalars['Boolean']>;
  isAssociated?: Maybe<Scalars['Boolean']>;
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

export type PFaddCompanyMutationVariables = Exact<{
  PFCustomerIDS: Array<Scalars['ID']> | Scalars['ID'];
  PJCustomerID: Scalars['ID'];
  force: Scalars['Boolean'];
}>;


export type PFaddCompanyMutation = (
  { __typename?: 'Mutation' }
  & { PFaddCompany: Array<(
    { __typename?: 'PFCustomer' }
    & Pick<PfCustomer, 'id' | 'firstName' | 'lastName'>
    & { company?: Maybe<(
      { __typename?: 'PJCustomer' }
      & Pick<PjCustomer, 'id' | 'legalName' | 'tradingName'>
    )> }
  )> }
);

export type PFremoveCompanyMutationVariables = Exact<{
  PFCustomerIDS: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PFremoveCompanyMutation = (
  { __typename?: 'Mutation' }
  & { PFremoveCompany: Array<(
    { __typename?: 'PFCustomer' }
    & Pick<PfCustomer, 'id'>
  )> }
);

export type PJcreateBaseCustomerMutationVariables = Exact<{
  legalName: Scalars['String'];
  tradingName: Scalars['String'];
  CNPJ: Scalars['CNPJ'];
  isActive?: Maybe<Scalars['Boolean']>;
  isAssociated?: Maybe<Scalars['Boolean']>;
}>;


export type PJcreateBaseCustomerMutation = (
  { __typename?: 'Mutation' }
  & { PJcreateBaseCustomer: (
    { __typename?: 'PJCustomer' }
    & Pick<PjCustomer, 'id' | 'legalName' | 'tradingName' | 'CNPJ' | 'isActive' | 'isAssociated' | 'createdAt' | 'updatedAt'>
  ) }
);

export type PJnameFieldsFragment = (
  { __typename?: 'PJCustomer' }
  & Pick<PjCustomer, 'id' | 'tradingName' | 'legalName'>
);

export type PJfetchCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type PJfetchCustomersQuery = (
  { __typename?: 'Query' }
  & { PJfetchCustomers: Array<(
    { __typename?: 'PJCustomer' }
    & Pick<PjCustomer, 'id' | 'legalName' | 'tradingName' | 'CNPJ' | 'isActive' | 'isAssociated' | 'createdAt' | 'updatedAt'>
  )> }
);

export type PJfetchCustomersNameQueryVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type PJfetchCustomersNameQuery = (
  { __typename?: 'Query' }
  & { PJfetchCustomersById: Array<(
    { __typename?: 'PJCustomer' }
    & PJnameFieldsFragment
  )> }
);

export type PJremoveCustomersMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type PJremoveCustomersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'PJremoveCustomers'>
);

export type CreateBasePfCustomerMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  birthDate: Scalars['Date'];
  CPF: Scalars['CPF'];
  gender: GenderEnum;
  preferedPronoun: PreferedPronounEnum;
  isActive?: Maybe<Scalars['Boolean']>;
  hasDisability?: Maybe<Scalars['Boolean']>;
}>;


export type CreateBasePfCustomerMutation = (
  { __typename?: 'Mutation' }
  & { createBaseCustomer: (
    { __typename?: 'PFCustomer' }
    & Pick<PfCustomer, 'id' | 'firstName' | 'lastName' | 'birthDate' | 'CPF' | 'gender' | 'preferedPronoun' | 'isActive' | 'hasDisability' | 'createdAt' | 'updatedAt'>
  ) }
);

export type FetchCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCustomersQuery = (
  { __typename?: 'Query' }
  & { fetchCustomers: Array<(
    { __typename?: 'PFCustomer' }
    & Pick<PfCustomer, 'id' | 'firstName' | 'lastName' | 'birthDate' | 'CPF' | 'gender' | 'preferedPronoun' | 'isActive' | 'hasDisability' | 'createdAt' | 'updatedAt'>
  )> }
);

export type NameFieldsFragment = (
  { __typename?: 'PFCustomer' }
  & Pick<PfCustomer, 'id' | 'firstName' | 'lastName'>
);

export type FetchPfCustomersNameQueryVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type FetchPfCustomersNameQuery = (
  { __typename?: 'Query' }
  & { fetchCustomersPFById: Array<(
    { __typename?: 'PFCustomer' }
    & NameFieldsFragment
  )> }
);

export type PFfetchCustomersByIdQueryVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type PFfetchCustomersByIdQuery = (
  { __typename?: 'Query' }
  & { fetchCustomersPFById: Array<(
    { __typename?: 'PFCustomer' }
    & Pick<PfCustomer, 'id' | 'firstName' | 'lastName' | 'birthDate' | 'CPF' | 'gender' | 'preferedPronoun' | 'isActive' | 'hasDisability' | 'createdAt' | 'updatedAt'>
    & { company?: Maybe<(
      { __typename?: 'PJCustomer' }
      & Pick<PjCustomer, 'id' | 'legalName' | 'tradingName' | 'CNPJ' | 'createdAt' | 'updatedAt'>
    )>, extraInfo?: Maybe<Array<(
      { __typename?: 'PFExtraInfo' }
      & Pick<PfExtraInfo, 'id' | 'createdAt' | 'updatedAt'>
      & { contacts?: Maybe<Array<(
        { __typename?: 'PFContact' }
        & Pick<PfContact, 'id' | 'email' | 'phone' | 'mobilePhone' | 'isWhatsApp' | 'isMain' | 'createdAt' | 'updatedAt'>
      )>>, addresses?: Maybe<Array<(
        { __typename?: 'PFAddress' }
        & Pick<PfAddress, 'id' | 'name' | 'CEP' | 'country' | 'state' | 'city' | 'district' | 'street' | 'number' | 'complement' | 'isMain' | 'createdAt' | 'updatedAt'>
      )>>, professionalHistory?: Maybe<Array<(
        { __typename?: 'PFProfessionalHistory' }
        & Pick<PfProfessionalHistory, 'id' | 'office' | 'CBO' | 'admissionDate' | 'startDate' | 'recisionDate' | 'EPI' | 'createdAt' | 'updatedAt'>
        & { address?: Maybe<(
          { __typename?: 'PFAddress' }
          & Pick<PfAddress, 'id' | 'name' | 'CEP' | 'country' | 'state' | 'city' | 'district' | 'street' | 'number' | 'complement' | 'isMain' | 'createdAt' | 'updatedAt'>
        )>, leaveHistory?: Maybe<Array<(
          { __typename?: 'PFLeaveHistory' }
          & Pick<PfLeaveHistory, 'id' | 'leaveDate' | 'returnDate' | 'reason' | 'isINSS' | 'createdAt' | 'updatedAt'>
        )>> }
      )>>, disabilities?: Maybe<Array<(
        { __typename?: 'PFDisability' }
        & Pick<PfDisability, 'id' | 'CID' | 'nomenclature' | 'createdAt' | 'updatedAt'>
      )>> }
    )>> }
  )> }
);

export type RemoveCustomersMutationVariables = Exact<{
  ids: Array<Scalars['String']> | Scalars['String'];
}>;


export type RemoveCustomersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeCustomers'>
);

export const PJnameFieldsFragmentDoc = gql`
    fragment PJnameFields on PJCustomer {
  id
  tradingName
  legalName
}
    `;
export const NameFieldsFragmentDoc = gql`
    fragment nameFields on PFCustomer {
  id
  firstName
  lastName
}
    `;
export const PFaddCompanyDocument = gql`
    mutation PFaddCompany($PFCustomerIDS: [ID!]!, $PJCustomerID: ID!, $force: Boolean!) {
  PFaddCompany(
    PFCustomerIDS: $PFCustomerIDS
    PJCustomerID: $PJCustomerID
    force: $force
  ) {
    id
    firstName
    lastName
    company {
      id
      legalName
      tradingName
    }
  }
}
    `;
export type PFaddCompanyMutationFn = Apollo.MutationFunction<PFaddCompanyMutation, PFaddCompanyMutationVariables>;

/**
 * __usePFaddCompanyMutation__
 *
 * To run a mutation, you first call `usePFaddCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFaddCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFaddCompanyMutation, { data, loading, error }] = usePFaddCompanyMutation({
 *   variables: {
 *      PFCustomerIDS: // value for 'PFCustomerIDS'
 *      PJCustomerID: // value for 'PJCustomerID'
 *      force: // value for 'force'
 *   },
 * });
 */
export function usePFaddCompanyMutation(baseOptions?: Apollo.MutationHookOptions<PFaddCompanyMutation, PFaddCompanyMutationVariables>) {
        return Apollo.useMutation<PFaddCompanyMutation, PFaddCompanyMutationVariables>(PFaddCompanyDocument, baseOptions);
      }
export type PFaddCompanyMutationHookResult = ReturnType<typeof usePFaddCompanyMutation>;
export type PFaddCompanyMutationResult = Apollo.MutationResult<PFaddCompanyMutation>;
export type PFaddCompanyMutationOptions = Apollo.BaseMutationOptions<PFaddCompanyMutation, PFaddCompanyMutationVariables>;
export const PFremoveCompanyDocument = gql`
    mutation PFremoveCompany($PFCustomerIDS: [ID!]!) {
  PFremoveCompany(PFCustomerIDS: $PFCustomerIDS) {
    id
  }
}
    `;
export type PFremoveCompanyMutationFn = Apollo.MutationFunction<PFremoveCompanyMutation, PFremoveCompanyMutationVariables>;

/**
 * __usePFremoveCompanyMutation__
 *
 * To run a mutation, you first call `usePFremoveCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePFremoveCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pFremoveCompanyMutation, { data, loading, error }] = usePFremoveCompanyMutation({
 *   variables: {
 *      PFCustomerIDS: // value for 'PFCustomerIDS'
 *   },
 * });
 */
export function usePFremoveCompanyMutation(baseOptions?: Apollo.MutationHookOptions<PFremoveCompanyMutation, PFremoveCompanyMutationVariables>) {
        return Apollo.useMutation<PFremoveCompanyMutation, PFremoveCompanyMutationVariables>(PFremoveCompanyDocument, baseOptions);
      }
export type PFremoveCompanyMutationHookResult = ReturnType<typeof usePFremoveCompanyMutation>;
export type PFremoveCompanyMutationResult = Apollo.MutationResult<PFremoveCompanyMutation>;
export type PFremoveCompanyMutationOptions = Apollo.BaseMutationOptions<PFremoveCompanyMutation, PFremoveCompanyMutationVariables>;
export const PJcreateBaseCustomerDocument = gql`
    mutation PJcreateBaseCustomer($legalName: String!, $tradingName: String!, $CNPJ: CNPJ!, $isActive: Boolean, $isAssociated: Boolean) {
  PJcreateBaseCustomer(
    PJCustomer: {legalName: $legalName, tradingName: $tradingName, CNPJ: $CNPJ, isActive: $isActive, isAssociated: $isAssociated}
  ) {
    id
    legalName
    tradingName
    CNPJ
    isActive
    isAssociated
    createdAt
    updatedAt
  }
}
    `;
export type PJcreateBaseCustomerMutationFn = Apollo.MutationFunction<PJcreateBaseCustomerMutation, PJcreateBaseCustomerMutationVariables>;

/**
 * __usePJcreateBaseCustomerMutation__
 *
 * To run a mutation, you first call `usePJcreateBaseCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePJcreateBaseCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pJcreateBaseCustomerMutation, { data, loading, error }] = usePJcreateBaseCustomerMutation({
 *   variables: {
 *      legalName: // value for 'legalName'
 *      tradingName: // value for 'tradingName'
 *      CNPJ: // value for 'CNPJ'
 *      isActive: // value for 'isActive'
 *      isAssociated: // value for 'isAssociated'
 *   },
 * });
 */
export function usePJcreateBaseCustomerMutation(baseOptions?: Apollo.MutationHookOptions<PJcreateBaseCustomerMutation, PJcreateBaseCustomerMutationVariables>) {
        return Apollo.useMutation<PJcreateBaseCustomerMutation, PJcreateBaseCustomerMutationVariables>(PJcreateBaseCustomerDocument, baseOptions);
      }
export type PJcreateBaseCustomerMutationHookResult = ReturnType<typeof usePJcreateBaseCustomerMutation>;
export type PJcreateBaseCustomerMutationResult = Apollo.MutationResult<PJcreateBaseCustomerMutation>;
export type PJcreateBaseCustomerMutationOptions = Apollo.BaseMutationOptions<PJcreateBaseCustomerMutation, PJcreateBaseCustomerMutationVariables>;
export const PJfetchCustomersDocument = gql`
    query PJfetchCustomers {
  PJfetchCustomers {
    id
    legalName
    tradingName
    CNPJ
    isActive
    isAssociated
    createdAt
    updatedAt
  }
}
    `;

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
export const PJfetchCustomersNameDocument = gql`
    query PJfetchCustomersName($ids: [String!]!) {
  PJfetchCustomersById(ids: $ids) {
    ...PJnameFields
  }
}
    ${PJnameFieldsFragmentDoc}`;

/**
 * __usePJfetchCustomersNameQuery__
 *
 * To run a query within a React component, call `usePJfetchCustomersNameQuery` and pass it any options that fit your needs.
 * When your component renders, `usePJfetchCustomersNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePJfetchCustomersNameQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function usePJfetchCustomersNameQuery(baseOptions: Apollo.QueryHookOptions<PJfetchCustomersNameQuery, PJfetchCustomersNameQueryVariables>) {
        return Apollo.useQuery<PJfetchCustomersNameQuery, PJfetchCustomersNameQueryVariables>(PJfetchCustomersNameDocument, baseOptions);
      }
export function usePJfetchCustomersNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PJfetchCustomersNameQuery, PJfetchCustomersNameQueryVariables>) {
          return Apollo.useLazyQuery<PJfetchCustomersNameQuery, PJfetchCustomersNameQueryVariables>(PJfetchCustomersNameDocument, baseOptions);
        }
export type PJfetchCustomersNameQueryHookResult = ReturnType<typeof usePJfetchCustomersNameQuery>;
export type PJfetchCustomersNameLazyQueryHookResult = ReturnType<typeof usePJfetchCustomersNameLazyQuery>;
export type PJfetchCustomersNameQueryResult = Apollo.QueryResult<PJfetchCustomersNameQuery, PJfetchCustomersNameQueryVariables>;
export const PJremoveCustomersDocument = gql`
    mutation PJremoveCustomers($ids: [ID!]!) {
  PJremoveCustomers(ids: $ids)
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
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function usePJremoveCustomersMutation(baseOptions?: Apollo.MutationHookOptions<PJremoveCustomersMutation, PJremoveCustomersMutationVariables>) {
        return Apollo.useMutation<PJremoveCustomersMutation, PJremoveCustomersMutationVariables>(PJremoveCustomersDocument, baseOptions);
      }
export type PJremoveCustomersMutationHookResult = ReturnType<typeof usePJremoveCustomersMutation>;
export type PJremoveCustomersMutationResult = Apollo.MutationResult<PJremoveCustomersMutation>;
export type PJremoveCustomersMutationOptions = Apollo.BaseMutationOptions<PJremoveCustomersMutation, PJremoveCustomersMutationVariables>;
export const CreateBasePfCustomerDocument = gql`
    mutation createBasePFCustomer($firstName: String!, $lastName: String!, $birthDate: Date!, $CPF: CPF!, $gender: GenderEnum!, $preferedPronoun: PreferedPronounEnum!, $isActive: Boolean, $hasDisability: Boolean) {
  createBaseCustomer(
    PFCustomer: {firstName: $firstName, lastName: $lastName, birthDate: $birthDate, CPF: $CPF, gender: $gender, preferedPronoun: $preferedPronoun, isActive: $isActive, hasDisability: $hasDisability}
  ) {
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
  }
}
    `;
export type CreateBasePfCustomerMutationFn = Apollo.MutationFunction<CreateBasePfCustomerMutation, CreateBasePfCustomerMutationVariables>;

/**
 * __useCreateBasePfCustomerMutation__
 *
 * To run a mutation, you first call `useCreateBasePfCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBasePfCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBasePfCustomerMutation, { data, loading, error }] = useCreateBasePfCustomerMutation({
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
export function useCreateBasePfCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateBasePfCustomerMutation, CreateBasePfCustomerMutationVariables>) {
        return Apollo.useMutation<CreateBasePfCustomerMutation, CreateBasePfCustomerMutationVariables>(CreateBasePfCustomerDocument, baseOptions);
      }
export type CreateBasePfCustomerMutationHookResult = ReturnType<typeof useCreateBasePfCustomerMutation>;
export type CreateBasePfCustomerMutationResult = Apollo.MutationResult<CreateBasePfCustomerMutation>;
export type CreateBasePfCustomerMutationOptions = Apollo.BaseMutationOptions<CreateBasePfCustomerMutation, CreateBasePfCustomerMutationVariables>;
export const FetchCustomersDocument = gql`
    query fetchCustomers {
  fetchCustomers {
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
  }
}
    `;

/**
 * __useFetchCustomersQuery__
 *
 * To run a query within a React component, call `useFetchCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchCustomersQuery(baseOptions?: Apollo.QueryHookOptions<FetchCustomersQuery, FetchCustomersQueryVariables>) {
        return Apollo.useQuery<FetchCustomersQuery, FetchCustomersQueryVariables>(FetchCustomersDocument, baseOptions);
      }
export function useFetchCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchCustomersQuery, FetchCustomersQueryVariables>) {
          return Apollo.useLazyQuery<FetchCustomersQuery, FetchCustomersQueryVariables>(FetchCustomersDocument, baseOptions);
        }
export type FetchCustomersQueryHookResult = ReturnType<typeof useFetchCustomersQuery>;
export type FetchCustomersLazyQueryHookResult = ReturnType<typeof useFetchCustomersLazyQuery>;
export type FetchCustomersQueryResult = Apollo.QueryResult<FetchCustomersQuery, FetchCustomersQueryVariables>;
export const FetchPfCustomersNameDocument = gql`
    query fetchPFCustomersName($ids: [String!]!) {
  fetchCustomersPFById(ids: $ids) {
    ...nameFields
  }
}
    ${NameFieldsFragmentDoc}`;

/**
 * __useFetchPfCustomersNameQuery__
 *
 * To run a query within a React component, call `useFetchPfCustomersNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPfCustomersNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPfCustomersNameQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useFetchPfCustomersNameQuery(baseOptions: Apollo.QueryHookOptions<FetchPfCustomersNameQuery, FetchPfCustomersNameQueryVariables>) {
        return Apollo.useQuery<FetchPfCustomersNameQuery, FetchPfCustomersNameQueryVariables>(FetchPfCustomersNameDocument, baseOptions);
      }
export function useFetchPfCustomersNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPfCustomersNameQuery, FetchPfCustomersNameQueryVariables>) {
          return Apollo.useLazyQuery<FetchPfCustomersNameQuery, FetchPfCustomersNameQueryVariables>(FetchPfCustomersNameDocument, baseOptions);
        }
export type FetchPfCustomersNameQueryHookResult = ReturnType<typeof useFetchPfCustomersNameQuery>;
export type FetchPfCustomersNameLazyQueryHookResult = ReturnType<typeof useFetchPfCustomersNameLazyQuery>;
export type FetchPfCustomersNameQueryResult = Apollo.QueryResult<FetchPfCustomersNameQuery, FetchPfCustomersNameQueryVariables>;
export const PFfetchCustomersByIdDocument = gql`
    query PFfetchCustomersByID($ids: [String!]!) {
  fetchCustomersPFById(ids: $ids) {
    id
    firstName
    lastName
    birthDate
    CPF
    gender
    preferedPronoun
    company {
      id
      legalName
      tradingName
      CNPJ
      createdAt
      updatedAt
    }
    isActive
    hasDisability
    extraInfo {
      id
      contacts {
        id
        email
        phone
        mobilePhone
        isWhatsApp
        isMain
        createdAt
        updatedAt
      }
      addresses {
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
      professionalHistory {
        id
        office
        CBO
        admissionDate
        startDate
        recisionDate
        EPI
        address {
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
        leaveHistory {
          id
          leaveDate
          returnDate
          reason
          isINSS
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      disabilities {
        id
        CID
        nomenclature
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;

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
 *      ids: // value for 'ids'
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
export const RemoveCustomersDocument = gql`
    mutation removeCustomers($ids: [String!]!) {
  removeCustomers(ids: $ids)
}
    `;
export type RemoveCustomersMutationFn = Apollo.MutationFunction<RemoveCustomersMutation, RemoveCustomersMutationVariables>;

/**
 * __useRemoveCustomersMutation__
 *
 * To run a mutation, you first call `useRemoveCustomersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCustomersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCustomersMutation, { data, loading, error }] = useRemoveCustomersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useRemoveCustomersMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCustomersMutation, RemoveCustomersMutationVariables>) {
        return Apollo.useMutation<RemoveCustomersMutation, RemoveCustomersMutationVariables>(RemoveCustomersDocument, baseOptions);
      }
export type RemoveCustomersMutationHookResult = ReturnType<typeof useRemoveCustomersMutation>;
export type RemoveCustomersMutationResult = Apollo.MutationResult<RemoveCustomersMutation>;
export type RemoveCustomersMutationOptions = Apollo.BaseMutationOptions<RemoveCustomersMutation, RemoveCustomersMutationVariables>;