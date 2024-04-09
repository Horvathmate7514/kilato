import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RateModel } from './rate-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  APIUrl = 'https://viewpoint.jedlik.cloud'
  constructor(private http: HttpClient) { }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/api/locations');
  }

  getLocationByName(locationName: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + `/api/locations/${locationName}/viewpoints`);



  }

  getKilato(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/api/viewpoints');

  }

  sendRate(model: RateModel):Observable<any>{
    return this.http.post(this.APIUrl + '/api/rate', model);
  }

}
