import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private http:HttpClient) { }
  private baseUrl="http://localhost:8080/api/checkout/purchase";

  sendProducts(purchase:Purchase):Observable<any>{

    return this.http.post(this.baseUrl,purchase);
  }
}
