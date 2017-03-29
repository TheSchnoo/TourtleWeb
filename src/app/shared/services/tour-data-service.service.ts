import { IBeacon } from '../models/beacon.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ITour } from '../models/tour.model';
import 'rxjs/Rx';


@Injectable()
export class TourDataService {

  tourEndpointUrl = "https://tourtle-app.herokuapp.com/tours"
  poisBaseUrl = "https://tourtle-app.herokuapp.com/pois/"

  constructor(private _http: Http) {};

  getToursFromServer():Observable<ITour[]> {
    // let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Access-Control-Allow-Origin', '*');
        var resp = this._http.get(this.tourEndpointUrl, {}).map(response => response.json());
        console.log("TAG = " + JSON.stringify(resp));
        return resp;
  }

  saveBeacon(beacon: IBeacon) :Promise<Response>{
    var completeUrl = this.poisBaseUrl + beacon.uuid
    console.log("posting to " + completeUrl)
    console.log("payload is "+ JSON.stringify(beacon))
    var payload = {
      description: beacon.description,
      name: beacon.name,
      imageurl: beacon.imageurl,
      beaconid: beacon.uuid
    }
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers})
    var resp = this._http.post(completeUrl, payload, options).toPromise()
    return resp
  }

  // extractData(res: Response){
  //   console.log("raw response is "+ res)
  //   let body = res.json()
  //   console.log("received a response of " + JSON.stringify(body.data))
  // }

  // private handleError (error: Response | any) {
  //   // In a real world app, we might use a remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Promise.reject(errMsg);
  // } 

}