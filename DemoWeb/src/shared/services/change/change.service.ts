import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChangeService {
    public arbetsplatser$ = new Subject<void>();
}