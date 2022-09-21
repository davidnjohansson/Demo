import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { createClient } from 'graphql-client/createClient';
import { Mutation, ValidationError } from 'graphql-client/schema';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GraphQLService {

	constructor(private http: HttpClient) { }

	public get client() {
		return createClient({
			fetcher: ({ query, variables }) => {
				return lastValueFrom(this.http.post(environment.GRAPHQL, { query: query, variables: variables }));
			},
			subscriptionCreatorOptions: {
				uri: environment.GRAPHQL_SUBSCRIPTION
			}
		});
	}

	public validate(data: Mutation | null | undefined, formGroup: FormGroup) {
		if (data === null || data === undefined) return;
		for (let key in data) {
			if ((<any>data)[key]?.validationErrors?.length) {
				for (let validationError of ((<any>data)[key]?.validationErrors as ValidationError[])) {
					for (let control in formGroup.controls) {
						if (validationError.propertyName === control) {
							console.log(validationError);
							if (formGroup.get(control)!.errors) {
								break;
							} else {
								formGroup.get(control)!.setErrors({ [control]: validationError.message });
							}
						}
					}
				}
			}
		}
	}
}
