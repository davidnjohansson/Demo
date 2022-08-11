import { Injectable } from '@angular/core';
import { Arbetsplatser } from 'graphql-client/schema';
import { BehaviorSubject } from 'rxjs';
import { GraphQLService } from '../graphql/graphql.service';

@Injectable({
	providedIn: 'root'
})
export class SubscriptionService {
	public arbetsplatsInserted$ = new BehaviorSubject<Arbetsplatser | undefined>(undefined);
	public arbetsplatsUpdated$ = new BehaviorSubject<Arbetsplatser | undefined>(undefined);

	constructor(private graphqlService: GraphQLService) { }

	public init() {
		this.graphqlService.client
			.subscription({ arbetsplatsInserted: { pk: true } })
			.subscribe(value => this.arbetsplatsInserted$.next(value.data?.arbetsplatsInserted));

		this.graphqlService.client
			.subscription({ arbetsplatsUpdated: { pk: true } })
			.subscribe(value => this.arbetsplatsUpdated$.next(value.data?.arbetsplatsUpdated));
	}
}