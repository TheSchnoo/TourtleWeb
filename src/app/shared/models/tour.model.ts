import { IBeacon } from './beacon.model';

export class ITour {
    tourId: string;
    name: string;
    imageurl: string;
    beacons: IBeacon[];
}