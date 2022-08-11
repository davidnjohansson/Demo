import { Client, ClientOptions } from 'bf-graphql-typed-client'
import {
  QueryRequest,
  QueryPromiseChain,
  Query,
  MutationRequest,
  MutationPromiseChain,
  Mutation,
  SubscriptionRequest,
  SubscriptionObservableChain,
  Subscription,
} from './schema'
export declare const createClient: (
  options: ClientOptions,
) => Client<
  QueryRequest,
  QueryPromiseChain,
  Query,
  MutationRequest,
  MutationPromiseChain,
  Mutation,
  SubscriptionRequest,
  SubscriptionObservableChain,
  Subscription
>
