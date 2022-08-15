import { Injectable } from '@angular/core';
import { Workplace } from 'graphql-client/schema';
import { BehaviorSubject } from 'rxjs';
import { GraphQLService } from '../graphql/graphql.service';

@Injectable({
	providedIn: 'root'
})
export class SubscriptionService {
	public workplaceInserted$ = new BehaviorSubject<Workplace | undefined>(undefined);
	public workplaceUpdated$ = new BehaviorSubject<Workplace | undefined>(undefined);

	constructor(private graphqlService: GraphQLService) { }

	public init() {
		this.graphqlService.client
			.subscription({ workplaceInserted: { id: true } })
			.subscribe(value => this.workplaceInserted$.next(value.data?.workplaceInserted));

		this.graphqlService.client
			.subscription({ workplaceUpdated: { id: true } })
			.subscribe(value => this.workplaceUpdated$.next(value.data?.workplaceUpdated));
	}
}