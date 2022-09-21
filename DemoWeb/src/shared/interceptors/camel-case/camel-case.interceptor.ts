import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationError } from 'graphql-client/schema';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CamelCaseInterceptor implements HttpInterceptor {
	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next
			.handle(req)
			.pipe(
				map((event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						if (event.body?.data) {
							return event.clone({
								body: this.camelCase(event.body)
							});
						}
					}
					return event;
				}));
	}

	private camelCase(body: any) {
		for (let key in body.data) {
			if (body.data[key]?.validationErrors?.length) {
				for (let validationError of (body.data[key].validationErrors as ValidationError[])) {
					if (validationError.propertyName) {
						validationError.propertyName = this.camelCaseString(validationError.propertyName);
					}
				}
			}
		}

		return body;
	}

	private camelCaseString(input: string) {
		return input.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		}).replace(/\s+/g, '');
	}
}