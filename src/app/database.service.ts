import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  getParcels() {
    return this.http.get('/parcels')
  }

  getSenders() {
    return this.http.get('/senders');
  }

  addParcel(data: any) {
    return this.http.put('/sender/parcel', data, httpOptions);
  }

  addSender(data: any) {
    return this.http.post('/sender', data, httpOptions);
  }
}
