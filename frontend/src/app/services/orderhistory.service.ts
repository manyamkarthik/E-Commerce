import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderhistoryService {

  constructor(private http:HttpClient) { }

  private baseUrl:string="http://localhost:8080/api/orders/search/findByCustomerEmail?email="

  getByEmail(email:string):Observable<any[]>{
    console.log(email);
    return this.http.get<any[]>(this.baseUrl+email)
  }
}
