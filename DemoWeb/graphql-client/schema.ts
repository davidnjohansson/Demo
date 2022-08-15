import { Observable } from 'bf-graphql-typed-client'

export interface Query {
  addresses: AddressCollectionSegment | null
  customers: CustomerCollectionSegment | null
  positions: PositionCollectionSegment | null
  workplaces: WorkplaceCollectionSegment | null
  __typename: 'Query'
}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean = boolean

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type String = string

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
export type Float = number

export enum SortEnumType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface AddressCollectionSegment {
  items: Address[] | null
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo
  totalCount: Int
  __typename: 'AddressCollectionSegment'
}

export interface Address {
  id: Int
  active: Boolean | null
  address1: String | null
  city: String | null
  zipCode: String | null
  addressTypeId: Int
  addressType: AddressType
  positionId: Int | null
  position: Position | null
  workplaces: Workplace[]
  visitingAddressFor: Customer[]
  invoiceAddressFor: Customer[]
  __typename: 'Address'
}

export interface AddressType {
  id: Int
  addressTypeName: String | null
  addresses: Address[]
  __typename: 'AddressType'
}

export interface Position {
  id: Int
  latitude: Float
  longitude: Float
  addresses: Address[]
  workplaces: Workplace[]
  __typename: 'Position'
}

export interface Workplace {
  id: Int
  active: Boolean | null
  workplaceName: String
  addressId: Int
  address: Address
  customerId: Int
  customer: Customer
  positionId: Int | null
  position: Position | null
  __typename: 'Workplace'
}

export interface Customer {
  id: Int
  active: Boolean | null
  customerName: String
  customerNo: String
  visitingAddressId: Int | null
  visitingAddress: Address | null
  invoiceAddressId: Int | null
  invoiceAddress: Address | null
  payerId: Int | null
  payer: Customer | null
  contractorId: Int | null
  contractor: Customer | null
  corporationId: Int | null
  corporation: Customer | null
  workplaces: Workplace[]
  payerFor: Customer[]
  contractorFor: Customer[]
  corporationFor: Customer[]
  __typename: 'Customer'
}

/** Information about the offset pagination. */
export interface CollectionSegmentInfo {
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Boolean
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Boolean
  __typename: 'CollectionSegmentInfo'
}

export interface CustomerCollectionSegment {
  items: Customer[] | null
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo
  totalCount: Int
  __typename: 'CustomerCollectionSegment'
}

export interface PositionCollectionSegment {
  items: Position[] | null
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo
  totalCount: Int
  __typename: 'PositionCollectionSegment'
}

export interface WorkplaceCollectionSegment {
  items: Workplace[] | null
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo
  totalCount: Int
  __typename: 'WorkplaceCollectionSegment'
}

export interface Mutation {
  upsertWorkplace: MutationOutput
  __typename: 'Mutation'
}

export interface MutationOutput {
  id: Int | null
  validationErrors: ValidationError[]
  __typename: 'MutationOutput'
}

export interface ValidationError {
  message: String
  property: String
  __typename: 'ValidationError'
}

export interface Subscription {
  workplaceInserted: Workplace
  workplaceUpdated: Workplace
  __typename: 'Subscription'
}

export interface QueryRequest {
  addresses?:
    | [
        { skip?: Int | null; take?: Int | null; where?: AddressFilterInput | null; order?: AddressSortInput[] | null },
        AddressCollectionSegmentRequest,
      ]
    | AddressCollectionSegmentRequest
  customers?:
    | [
        { skip?: Int | null; take?: Int | null; where?: CustomerFilterInput | null; order?: CustomerSortInput[] | null },
        CustomerCollectionSegmentRequest,
      ]
    | CustomerCollectionSegmentRequest
  positions?:
    | [
        { skip?: Int | null; take?: Int | null; where?: PositionFilterInput | null; order?: PositionSortInput[] | null },
        PositionCollectionSegmentRequest,
      ]
    | PositionCollectionSegmentRequest
  workplaces?:
    | [
        { skip?: Int | null; take?: Int | null; where?: WorkplaceFilterInput | null; order?: WorkplaceSortInput[] | null },
        WorkplaceCollectionSegmentRequest,
      ]
    | WorkplaceCollectionSegmentRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface AddressFilterInput {
  and?: AddressFilterInput[] | null
  or?: AddressFilterInput[] | null
  id?: ComparableInt32OperationFilterInput | null
  active?: BooleanOperationFilterInput | null
  address1?: StringOperationFilterInput | null
  city?: StringOperationFilterInput | null
  zipCode?: StringOperationFilterInput | null
  addressTypeId?: ComparableInt32OperationFilterInput | null
  addressType?: AddressTypeFilterInput | null
  positionId?: ComparableNullableOfInt32OperationFilterInput | null
  position?: PositionFilterInput | null
  workplaces?: ListFilterInputTypeOfWorkplaceFilterInput | null
  visitingAddressFor?: ListFilterInputTypeOfCustomerFilterInput | null
  invoiceAddressFor?: ListFilterInputTypeOfCustomerFilterInput | null
}

export interface ComparableInt32OperationFilterInput {
  eq?: Int | null
  neq?: Int | null
  in?: Int[] | null
  nin?: Int[] | null
  gt?: Int | null
  ngt?: Int | null
  gte?: Int | null
  ngte?: Int | null
  lt?: Int | null
  nlt?: Int | null
  lte?: Int | null
  nlte?: Int | null
}

export interface BooleanOperationFilterInput {
  eq?: Boolean | null
  neq?: Boolean | null
}

export interface StringOperationFilterInput {
  and?: StringOperationFilterInput[] | null
  or?: StringOperationFilterInput[] | null
  eq?: String | null
  neq?: String | null
  contains?: String | null
  ncontains?: String | null
  in?: (String | null)[] | null
  nin?: (String | null)[] | null
  startsWith?: String | null
  nstartsWith?: String | null
  endsWith?: String | null
  nendsWith?: String | null
}

export interface AddressTypeFilterInput {
  and?: AddressTypeFilterInput[] | null
  or?: AddressTypeFilterInput[] | null
  id?: ComparableInt32OperationFilterInput | null
  addressTypeName?: StringOperationFilterInput | null
  addresses?: ListFilterInputTypeOfAddressFilterInput | null
}

export interface ListFilterInputTypeOfAddressFilterInput {
  all?: AddressFilterInput | null
  none?: AddressFilterInput | null
  some?: AddressFilterInput | null
  any?: Boolean | null
}

export interface ComparableNullableOfInt32OperationFilterInput {
  eq?: Int | null
  neq?: Int | null
  in?: (Int | null)[] | null
  nin?: (Int | null)[] | null
  gt?: Int | null
  ngt?: Int | null
  gte?: Int | null
  ngte?: Int | null
  lt?: Int | null
  nlt?: Int | null
  lte?: Int | null
  nlte?: Int | null
}

export interface PositionFilterInput {
  and?: PositionFilterInput[] | null
  or?: PositionFilterInput[] | null
  id?: ComparableInt32OperationFilterInput | null
  latitude?: ComparableDoubleOperationFilterInput | null
  longitude?: ComparableDoubleOperationFilterInput | null
  addresses?: ListFilterInputTypeOfAddressFilterInput | null
  workplaces?: ListFilterInputTypeOfWorkplaceFilterInput | null
}

export interface ComparableDoubleOperationFilterInput {
  eq?: Float | null
  neq?: Float | null
  in?: Float[] | null
  nin?: Float[] | null
  gt?: Float | null
  ngt?: Float | null
  gte?: Float | null
  ngte?: Float | null
  lt?: Float | null
  nlt?: Float | null
  lte?: Float | null
  nlte?: Float | null
}

export interface ListFilterInputTypeOfWorkplaceFilterInput {
  all?: WorkplaceFilterInput | null
  none?: WorkplaceFilterInput | null
  some?: WorkplaceFilterInput | null
  any?: Boolean | null
}

export interface WorkplaceFilterInput {
  and?: WorkplaceFilterInput[] | null
  or?: WorkplaceFilterInput[] | null
  id?: ComparableInt32OperationFilterInput | null
  active?: BooleanOperationFilterInput | null
  workplaceName?: StringOperationFilterInput | null
  addressId?: ComparableInt32OperationFilterInput | null
  address?: AddressFilterInput | null
  customerId?: ComparableInt32OperationFilterInput | null
  customer?: CustomerFilterInput | null
  positionId?: ComparableNullableOfInt32OperationFilterInput | null
  position?: PositionFilterInput | null
}

export interface CustomerFilterInput {
  and?: CustomerFilterInput[] | null
  or?: CustomerFilterInput[] | null
  id?: ComparableInt32OperationFilterInput | null
  active?: BooleanOperationFilterInput | null
  customerName?: StringOperationFilterInput | null
  customerNo?: StringOperationFilterInput | null
  visitingAddressId?: ComparableNullableOfInt32OperationFilterInput | null
  visitingAddress?: AddressFilterInput | null
  invoiceAddressId?: ComparableNullableOfInt32OperationFilterInput | null
  invoiceAddress?: AddressFilterInput | null
  payerId?: ComparableNullableOfInt32OperationFilterInput | null
  payer?: CustomerFilterInput | null
  contractorId?: ComparableNullableOfInt32OperationFilterInput | null
  contractor?: CustomerFilterInput | null
  corporationId?: ComparableNullableOfInt32OperationFilterInput | null
  corporation?: CustomerFilterInput | null
  workplaces?: ListFilterInputTypeOfWorkplaceFilterInput | null
  payerFor?: ListFilterInputTypeOfCustomerFilterInput | null
  contractorFor?: ListFilterInputTypeOfCustomerFilterInput | null
  corporationFor?: ListFilterInputTypeOfCustomerFilterInput | null
}

export interface ListFilterInputTypeOfCustomerFilterInput {
  all?: CustomerFilterInput | null
  none?: CustomerFilterInput | null
  some?: CustomerFilterInput | null
  any?: Boolean | null
}

export interface AddressSortInput {
  id?: SortEnumType | null
  active?: SortEnumType | null
  address1?: SortEnumType | null
  city?: SortEnumType | null
  zipCode?: SortEnumType | null
  addressTypeId?: SortEnumType | null
  addressType?: AddressTypeSortInput | null
  positionId?: SortEnumType | null
  position?: PositionSortInput | null
}

export interface AddressTypeSortInput {
  id?: SortEnumType | null
  addressTypeName?: SortEnumType | null
}

export interface PositionSortInput {
  id?: SortEnumType | null
  latitude?: SortEnumType | null
  longitude?: SortEnumType | null
}

export interface AddressCollectionSegmentRequest {
  items?: AddressRequest
  /** Information to aid in pagination. */
  pageInfo?: CollectionSegmentInfoRequest
  totalCount?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface AddressRequest {
  id?: boolean | number
  active?: boolean | number
  address1?: boolean | number
  city?: boolean | number
  zipCode?: boolean | number
  addressTypeId?: boolean | number
  addressType?: AddressTypeRequest
  positionId?: boolean | number
  position?: PositionRequest
  workplaces?: WorkplaceRequest
  visitingAddressFor?: CustomerRequest
  invoiceAddressFor?: CustomerRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface AddressTypeRequest {
  id?: boolean | number
  addressTypeName?: boolean | number
  addresses?: AddressRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PositionRequest {
  id?: boolean | number
  latitude?: boolean | number
  longitude?: boolean | number
  addresses?: AddressRequest
  workplaces?: WorkplaceRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface WorkplaceRequest {
  id?: boolean | number
  active?: boolean | number
  workplaceName?: boolean | number
  addressId?: boolean | number
  address?: AddressRequest
  customerId?: boolean | number
  customer?: CustomerRequest
  positionId?: boolean | number
  position?: PositionRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CustomerRequest {
  id?: boolean | number
  active?: boolean | number
  customerName?: boolean | number
  customerNo?: boolean | number
  visitingAddressId?: boolean | number
  visitingAddress?: AddressRequest
  invoiceAddressId?: boolean | number
  invoiceAddress?: AddressRequest
  payerId?: boolean | number
  payer?: CustomerRequest
  contractorId?: boolean | number
  contractor?: CustomerRequest
  corporationId?: boolean | number
  corporation?: CustomerRequest
  workplaces?: WorkplaceRequest
  payerFor?: CustomerRequest
  contractorFor?: CustomerRequest
  corporationFor?: CustomerRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Information about the offset pagination. */
export interface CollectionSegmentInfoRequest {
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage?: boolean | number
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CustomerSortInput {
  id?: SortEnumType | null
  active?: SortEnumType | null
  customerName?: SortEnumType | null
  customerNo?: SortEnumType | null
  visitingAddressId?: SortEnumType | null
  visitingAddress?: AddressSortInput | null
  invoiceAddressId?: SortEnumType | null
  invoiceAddress?: AddressSortInput | null
  payerId?: SortEnumType | null
  payer?: CustomerSortInput | null
  contractorId?: SortEnumType | null
  contractor?: CustomerSortInput | null
  corporationId?: SortEnumType | null
  corporation?: CustomerSortInput | null
}

export interface CustomerCollectionSegmentRequest {
  items?: CustomerRequest
  /** Information to aid in pagination. */
  pageInfo?: CollectionSegmentInfoRequest
  totalCount?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface PositionCollectionSegmentRequest {
  items?: PositionRequest
  /** Information to aid in pagination. */
  pageInfo?: CollectionSegmentInfoRequest
  totalCount?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface WorkplaceSortInput {
  id?: SortEnumType | null
  active?: SortEnumType | null
  workplaceName?: SortEnumType | null
  addressId?: SortEnumType | null
  address?: AddressSortInput | null
  customerId?: SortEnumType | null
  customer?: CustomerSortInput | null
  positionId?: SortEnumType | null
  position?: PositionSortInput | null
}

export interface WorkplaceCollectionSegmentRequest {
  items?: WorkplaceRequest
  /** Information to aid in pagination. */
  pageInfo?: CollectionSegmentInfoRequest
  totalCount?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MutationRequest {
  upsertWorkplace?: [{ input: UpsertWorkplaceInput }, MutationOutputRequest]
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface UpsertWorkplaceInput {
  active?: Boolean | null
  workplaceName?: String | null
  customerId?: Int | null
  address1?: String | null
  city?: String | null
  zipCode?: String | null
  latitude?: Float | null
  longitude?: Float | null
  id?: Int | null
  onlyValidate?: Boolean | null
}

export interface MutationOutputRequest {
  id?: boolean | number
  validationErrors?: ValidationErrorRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ValidationErrorRequest {
  message?: boolean | number
  property?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface SubscriptionRequest {
  workplaceInserted?: WorkplaceRequest
  workplaceUpdated?: WorkplaceRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

const Query_possibleTypes = ['Query']
export const isQuery = (obj: { __typename: String }): obj is Query => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Query_possibleTypes.includes(obj.__typename)
}

const AddressCollectionSegment_possibleTypes = ['AddressCollectionSegment']
export const isAddressCollectionSegment = (obj: { __typename: String }): obj is AddressCollectionSegment => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return AddressCollectionSegment_possibleTypes.includes(obj.__typename)
}

const Address_possibleTypes = ['Address']
export const isAddress = (obj: { __typename: String }): obj is Address => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Address_possibleTypes.includes(obj.__typename)
}

const AddressType_possibleTypes = ['AddressType']
export const isAddressType = (obj: { __typename: String }): obj is AddressType => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return AddressType_possibleTypes.includes(obj.__typename)
}

const Position_possibleTypes = ['Position']
export const isPosition = (obj: { __typename: String }): obj is Position => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Position_possibleTypes.includes(obj.__typename)
}

const Workplace_possibleTypes = ['Workplace']
export const isWorkplace = (obj: { __typename: String }): obj is Workplace => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Workplace_possibleTypes.includes(obj.__typename)
}

const Customer_possibleTypes = ['Customer']
export const isCustomer = (obj: { __typename: String }): obj is Customer => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Customer_possibleTypes.includes(obj.__typename)
}

const CollectionSegmentInfo_possibleTypes = ['CollectionSegmentInfo']
export const isCollectionSegmentInfo = (obj: { __typename: String }): obj is CollectionSegmentInfo => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CollectionSegmentInfo_possibleTypes.includes(obj.__typename)
}

const CustomerCollectionSegment_possibleTypes = ['CustomerCollectionSegment']
export const isCustomerCollectionSegment = (obj: { __typename: String }): obj is CustomerCollectionSegment => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return CustomerCollectionSegment_possibleTypes.includes(obj.__typename)
}

const PositionCollectionSegment_possibleTypes = ['PositionCollectionSegment']
export const isPositionCollectionSegment = (obj: { __typename: String }): obj is PositionCollectionSegment => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PositionCollectionSegment_possibleTypes.includes(obj.__typename)
}

const WorkplaceCollectionSegment_possibleTypes = ['WorkplaceCollectionSegment']
export const isWorkplaceCollectionSegment = (obj: { __typename: String }): obj is WorkplaceCollectionSegment => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return WorkplaceCollectionSegment_possibleTypes.includes(obj.__typename)
}

const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj: { __typename: String }): obj is Mutation => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Mutation_possibleTypes.includes(obj.__typename)
}

const MutationOutput_possibleTypes = ['MutationOutput']
export const isMutationOutput = (obj: { __typename: String }): obj is MutationOutput => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return MutationOutput_possibleTypes.includes(obj.__typename)
}

const ValidationError_possibleTypes = ['ValidationError']
export const isValidationError = (obj: { __typename: String }): obj is ValidationError => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ValidationError_possibleTypes.includes(obj.__typename)
}

const Subscription_possibleTypes = ['Subscription']
export const isSubscription = (obj: { __typename: String }): obj is Subscription => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Subscription_possibleTypes.includes(obj.__typename)
}

export interface QueryPromiseChain {
  addresses: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: AddressFilterInput | null
    order?: AddressSortInput[] | null
  }) => AddressCollectionSegmentPromiseChain & {
    execute: (
      request: AddressCollectionSegmentRequest,
      defaultValue?: AddressCollectionSegment | null,
    ) => Promise<AddressCollectionSegment | null>
  }) &
    (AddressCollectionSegmentPromiseChain & {
      execute: (
        request: AddressCollectionSegmentRequest,
        defaultValue?: AddressCollectionSegment | null,
      ) => Promise<AddressCollectionSegment | null>
    })
  customers: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: CustomerFilterInput | null
    order?: CustomerSortInput[] | null
  }) => CustomerCollectionSegmentPromiseChain & {
    execute: (
      request: CustomerCollectionSegmentRequest,
      defaultValue?: CustomerCollectionSegment | null,
    ) => Promise<CustomerCollectionSegment | null>
  }) &
    (CustomerCollectionSegmentPromiseChain & {
      execute: (
        request: CustomerCollectionSegmentRequest,
        defaultValue?: CustomerCollectionSegment | null,
      ) => Promise<CustomerCollectionSegment | null>
    })
  positions: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: PositionFilterInput | null
    order?: PositionSortInput[] | null
  }) => PositionCollectionSegmentPromiseChain & {
    execute: (
      request: PositionCollectionSegmentRequest,
      defaultValue?: PositionCollectionSegment | null,
    ) => Promise<PositionCollectionSegment | null>
  }) &
    (PositionCollectionSegmentPromiseChain & {
      execute: (
        request: PositionCollectionSegmentRequest,
        defaultValue?: PositionCollectionSegment | null,
      ) => Promise<PositionCollectionSegment | null>
    })
  workplaces: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: WorkplaceFilterInput | null
    order?: WorkplaceSortInput[] | null
  }) => WorkplaceCollectionSegmentPromiseChain & {
    execute: (
      request: WorkplaceCollectionSegmentRequest,
      defaultValue?: WorkplaceCollectionSegment | null,
    ) => Promise<WorkplaceCollectionSegment | null>
  }) &
    (WorkplaceCollectionSegmentPromiseChain & {
      execute: (
        request: WorkplaceCollectionSegmentRequest,
        defaultValue?: WorkplaceCollectionSegment | null,
      ) => Promise<WorkplaceCollectionSegment | null>
    })
}

export interface QueryObservableChain {
  addresses: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: AddressFilterInput | null
    order?: AddressSortInput[] | null
  }) => AddressCollectionSegmentObservableChain & {
    execute: (
      request: AddressCollectionSegmentRequest,
      defaultValue?: AddressCollectionSegment | null,
    ) => Observable<AddressCollectionSegment | null>
  }) &
    (AddressCollectionSegmentObservableChain & {
      execute: (
        request: AddressCollectionSegmentRequest,
        defaultValue?: AddressCollectionSegment | null,
      ) => Observable<AddressCollectionSegment | null>
    })
  customers: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: CustomerFilterInput | null
    order?: CustomerSortInput[] | null
  }) => CustomerCollectionSegmentObservableChain & {
    execute: (
      request: CustomerCollectionSegmentRequest,
      defaultValue?: CustomerCollectionSegment | null,
    ) => Observable<CustomerCollectionSegment | null>
  }) &
    (CustomerCollectionSegmentObservableChain & {
      execute: (
        request: CustomerCollectionSegmentRequest,
        defaultValue?: CustomerCollectionSegment | null,
      ) => Observable<CustomerCollectionSegment | null>
    })
  positions: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: PositionFilterInput | null
    order?: PositionSortInput[] | null
  }) => PositionCollectionSegmentObservableChain & {
    execute: (
      request: PositionCollectionSegmentRequest,
      defaultValue?: PositionCollectionSegment | null,
    ) => Observable<PositionCollectionSegment | null>
  }) &
    (PositionCollectionSegmentObservableChain & {
      execute: (
        request: PositionCollectionSegmentRequest,
        defaultValue?: PositionCollectionSegment | null,
      ) => Observable<PositionCollectionSegment | null>
    })
  workplaces: ((args?: {
    skip?: Int | null
    take?: Int | null
    where?: WorkplaceFilterInput | null
    order?: WorkplaceSortInput[] | null
  }) => WorkplaceCollectionSegmentObservableChain & {
    execute: (
      request: WorkplaceCollectionSegmentRequest,
      defaultValue?: WorkplaceCollectionSegment | null,
    ) => Observable<WorkplaceCollectionSegment | null>
  }) &
    (WorkplaceCollectionSegmentObservableChain & {
      execute: (
        request: WorkplaceCollectionSegmentRequest,
        defaultValue?: WorkplaceCollectionSegment | null,
      ) => Observable<WorkplaceCollectionSegment | null>
    })
}

export interface AddressCollectionSegmentPromiseChain {
  items: { execute: (request: AddressRequest, defaultValue?: Address[] | null) => Promise<Address[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoPromiseChain & {
    execute: (request: CollectionSegmentInfoRequest, defaultValue?: CollectionSegmentInfo) => Promise<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface AddressCollectionSegmentObservableChain {
  items: { execute: (request: AddressRequest, defaultValue?: Address[] | null) => Observable<Address[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoObservableChain & {
    execute: (
      request: CollectionSegmentInfoRequest,
      defaultValue?: CollectionSegmentInfo,
    ) => Observable<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface AddressPromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  active: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  address1: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  city: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  zipCode: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  addressTypeId: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  addressType: AddressTypePromiseChain & {
    execute: (request: AddressTypeRequest, defaultValue?: AddressType) => Promise<AddressType>
  }
  positionId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  position: PositionPromiseChain & {
    execute: (request: PositionRequest, defaultValue?: Position | null) => Promise<Position | null>
  }
  workplaces: { execute: (request: WorkplaceRequest, defaultValue?: Workplace[]) => Promise<Workplace[]> }
  visitingAddressFor: { execute: (request: CustomerRequest, defaultValue?: Customer[]) => Promise<Customer[]> }
  invoiceAddressFor: { execute: (request: CustomerRequest, defaultValue?: Customer[]) => Promise<Customer[]> }
}

export interface AddressObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  active: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  address1: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  city: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  zipCode: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  addressTypeId: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  addressType: AddressTypeObservableChain & {
    execute: (request: AddressTypeRequest, defaultValue?: AddressType) => Observable<AddressType>
  }
  positionId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  position: PositionObservableChain & {
    execute: (request: PositionRequest, defaultValue?: Position | null) => Observable<Position | null>
  }
  workplaces: { execute: (request: WorkplaceRequest, defaultValue?: Workplace[]) => Observable<Workplace[]> }
  visitingAddressFor: { execute: (request: CustomerRequest, defaultValue?: Customer[]) => Observable<Customer[]> }
  invoiceAddressFor: { execute: (request: CustomerRequest, defaultValue?: Customer[]) => Observable<Customer[]> }
}

export interface AddressTypePromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  addressTypeName: { execute: (request?: boolean | number, defaultValue?: String | null) => Promise<String | null> }
  addresses: { execute: (request: AddressRequest, defaultValue?: Address[]) => Promise<Address[]> }
}

export interface AddressTypeObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  addressTypeName: { execute: (request?: boolean | number, defaultValue?: String | null) => Observable<String | null> }
  addresses: { execute: (request: AddressRequest, defaultValue?: Address[]) => Observable<Address[]> }
}

export interface PositionPromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  latitude: { execute: (request?: boolean | number, defaultValue?: Float) => Promise<Float> }
  longitude: { execute: (request?: boolean | number, defaultValue?: Float) => Promise<Float> }
  addresses: { execute: (request: AddressRequest, defaultValue?: Address[]) => Promise<Address[]> }
  workplaces: { execute: (request: WorkplaceRequest, defaultValue?: Workplace[]) => Promise<Workplace[]> }
}

export interface PositionObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  latitude: { execute: (request?: boolean | number, defaultValue?: Float) => Observable<Float> }
  longitude: { execute: (request?: boolean | number, defaultValue?: Float) => Observable<Float> }
  addresses: { execute: (request: AddressRequest, defaultValue?: Address[]) => Observable<Address[]> }
  workplaces: { execute: (request: WorkplaceRequest, defaultValue?: Workplace[]) => Observable<Workplace[]> }
}

export interface WorkplacePromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  active: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  workplaceName: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  addressId: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  address: AddressPromiseChain & { execute: (request: AddressRequest, defaultValue?: Address) => Promise<Address> }
  customerId: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  customer: CustomerPromiseChain & { execute: (request: CustomerRequest, defaultValue?: Customer) => Promise<Customer> }
  positionId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  position: PositionPromiseChain & {
    execute: (request: PositionRequest, defaultValue?: Position | null) => Promise<Position | null>
  }
}

export interface WorkplaceObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  active: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  workplaceName: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  addressId: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  address: AddressObservableChain & { execute: (request: AddressRequest, defaultValue?: Address) => Observable<Address> }
  customerId: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  customer: CustomerObservableChain & {
    execute: (request: CustomerRequest, defaultValue?: Customer) => Observable<Customer>
  }
  positionId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  position: PositionObservableChain & {
    execute: (request: PositionRequest, defaultValue?: Position | null) => Observable<Position | null>
  }
}

export interface CustomerPromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
  active: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Promise<Boolean | null> }
  customerName: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  customerNo: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  visitingAddressId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  visitingAddress: AddressPromiseChain & {
    execute: (request: AddressRequest, defaultValue?: Address | null) => Promise<Address | null>
  }
  invoiceAddressId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  invoiceAddress: AddressPromiseChain & {
    execute: (request: AddressRequest, defaultValue?: Address | null) => Promise<Address | null>
  }
  payerId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  payer: CustomerPromiseChain & {
    execute: (request: CustomerRequest, defaultValue?: Customer | null) => Promise<Customer | null>
  }
  contractorId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  contractor: CustomerPromiseChain & {
    execute: (request: CustomerRequest, defaultValue?: Customer | null) => Promise<Customer | null>
  }
  corporationId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  corporation: CustomerPromiseChain & {
    execute: (request: CustomerRequest, defaultValue?: Customer | null) => Promise<Customer | null>
  }
  workplaces: { execute: (request: WorkplaceRequest, defaultValue?: Workplace[]) => Promise<Workplace[]> }
  payerFor: { execute: (request: CustomerRequest, defaultValue?: Customer[]) => Promise<Customer[]> }
  contractorFor: { execute: (request: CustomerRequest, defaultValue?: Customer[]) => Promise<Customer[]> }
  corporationFor: { execute: (request: CustomerRequest, defaultValue?: Customer[]) => Promise<Customer[]> }
}

export interface CustomerObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
  active: { execute: (request?: boolean | number, defaultValue?: Boolean | null) => Observable<Boolean | null> }
  customerName: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  customerNo: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  visitingAddressId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  visitingAddress: AddressObservableChain & {
    execute: (request: AddressRequest, defaultValue?: Address | null) => Observable<Address | null>
  }
  invoiceAddressId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  invoiceAddress: AddressObservableChain & {
    execute: (request: AddressRequest, defaultValue?: Address | null) => Observable<Address | null>
  }
  payerId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  payer: CustomerObservableChain & {
    execute: (request: CustomerRequest, defaultValue?: Customer | null) => Observable<Customer | null>
  }
  contractorId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  contractor: CustomerObservableChain & {
    execute: (request: CustomerRequest, defaultValue?: Customer | null) => Observable<Customer | null>
  }
  corporationId: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  corporation: CustomerObservableChain & {
    execute: (request: CustomerRequest, defaultValue?: Customer | null) => Observable<Customer | null>
  }
  workplaces: { execute: (request: WorkplaceRequest, defaultValue?: Workplace[]) => Observable<Workplace[]> }
  payerFor: { execute: (request: CustomerRequest, defaultValue?: Customer[]) => Observable<Customer[]> }
  contractorFor: { execute: (request: CustomerRequest, defaultValue?: Customer[]) => Observable<Customer[]> }
  corporationFor: { execute: (request: CustomerRequest, defaultValue?: Customer[]) => Observable<Customer[]> }
}

/** Information about the offset pagination. */
export interface CollectionSegmentInfoPromiseChain {
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: { execute: (request?: boolean | number, defaultValue?: Boolean) => Promise<Boolean> }
}

/** Information about the offset pagination. */
export interface CollectionSegmentInfoObservableChain {
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: { execute: (request?: boolean | number, defaultValue?: Boolean) => Observable<Boolean> }
}

export interface CustomerCollectionSegmentPromiseChain {
  items: { execute: (request: CustomerRequest, defaultValue?: Customer[] | null) => Promise<Customer[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoPromiseChain & {
    execute: (request: CollectionSegmentInfoRequest, defaultValue?: CollectionSegmentInfo) => Promise<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface CustomerCollectionSegmentObservableChain {
  items: { execute: (request: CustomerRequest, defaultValue?: Customer[] | null) => Observable<Customer[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoObservableChain & {
    execute: (
      request: CollectionSegmentInfoRequest,
      defaultValue?: CollectionSegmentInfo,
    ) => Observable<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface PositionCollectionSegmentPromiseChain {
  items: { execute: (request: PositionRequest, defaultValue?: Position[] | null) => Promise<Position[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoPromiseChain & {
    execute: (request: CollectionSegmentInfoRequest, defaultValue?: CollectionSegmentInfo) => Promise<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface PositionCollectionSegmentObservableChain {
  items: { execute: (request: PositionRequest, defaultValue?: Position[] | null) => Observable<Position[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoObservableChain & {
    execute: (
      request: CollectionSegmentInfoRequest,
      defaultValue?: CollectionSegmentInfo,
    ) => Observable<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface WorkplaceCollectionSegmentPromiseChain {
  items: { execute: (request: WorkplaceRequest, defaultValue?: Workplace[] | null) => Promise<Workplace[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoPromiseChain & {
    execute: (request: CollectionSegmentInfoRequest, defaultValue?: CollectionSegmentInfo) => Promise<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int> }
}

export interface WorkplaceCollectionSegmentObservableChain {
  items: { execute: (request: WorkplaceRequest, defaultValue?: Workplace[] | null) => Observable<Workplace[] | null> }
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfoObservableChain & {
    execute: (
      request: CollectionSegmentInfoRequest,
      defaultValue?: CollectionSegmentInfo,
    ) => Observable<CollectionSegmentInfo>
  }
  totalCount: { execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int> }
}

export interface MutationPromiseChain {
  upsertWorkplace: (args: {
    input: UpsertWorkplaceInput
  }) => MutationOutputPromiseChain & {
    execute: (request: MutationOutputRequest, defaultValue?: MutationOutput) => Promise<MutationOutput>
  }
}

export interface MutationObservableChain {
  upsertWorkplace: (args: {
    input: UpsertWorkplaceInput
  }) => MutationOutputObservableChain & {
    execute: (request: MutationOutputRequest, defaultValue?: MutationOutput) => Observable<MutationOutput>
  }
}

export interface MutationOutputPromiseChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int | null) => Promise<Int | null> }
  validationErrors: {
    execute: (request: ValidationErrorRequest, defaultValue?: ValidationError[]) => Promise<ValidationError[]>
  }
}

export interface MutationOutputObservableChain {
  id: { execute: (request?: boolean | number, defaultValue?: Int | null) => Observable<Int | null> }
  validationErrors: {
    execute: (request: ValidationErrorRequest, defaultValue?: ValidationError[]) => Observable<ValidationError[]>
  }
}

export interface ValidationErrorPromiseChain {
  message: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
  property: { execute: (request?: boolean | number, defaultValue?: String) => Promise<String> }
}

export interface ValidationErrorObservableChain {
  message: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
  property: { execute: (request?: boolean | number, defaultValue?: String) => Observable<String> }
}

export interface SubscriptionPromiseChain {
  workplaceInserted: WorkplacePromiseChain & {
    execute: (request: WorkplaceRequest, defaultValue?: Workplace) => Promise<Workplace>
  }
  workplaceUpdated: WorkplacePromiseChain & {
    execute: (request: WorkplaceRequest, defaultValue?: Workplace) => Promise<Workplace>
  }
}

export interface SubscriptionObservableChain {
  workplaceInserted: WorkplaceObservableChain & {
    execute: (request: WorkplaceRequest, defaultValue?: Workplace) => Observable<Workplace>
  }
  workplaceUpdated: WorkplaceObservableChain & {
    execute: (request: WorkplaceRequest, defaultValue?: Workplace) => Observable<Workplace>
  }
}
