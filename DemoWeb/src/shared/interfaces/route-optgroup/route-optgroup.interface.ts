import { RouteOption } from '../route-option/route-option.interface';

export interface RouteOptgroup {
    path: string;
    title: string;
    routeOptions: RouteOption[];
}