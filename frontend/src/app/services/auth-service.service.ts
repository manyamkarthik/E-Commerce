import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../interfaces/USer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean=false;

 private baseUrl = 'http://localhost:8080/api/login';

 constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
   this.isBrowser = isPlatformBrowser(platformId);
   this.checkToken();
 }

 getUsername(): string | null {
  if (this.isBrowser) {
    return localStorage.getItem('token');
  }
  return null;
}
 get isLoggedIn() {
   return this.loggedIn.asObservable();
 }

 login(user: User) {
  return this.http.post<boolean>(this.baseUrl, user)
    .pipe(map((response: boolean) => {
      if (response && this.isBrowser) {
        localStorage.setItem('token', user.username);
        this.loggedIn.next(true);
      }
      return response;
    }));
}

 logout() {
   if (this.isBrowser) {
     localStorage.removeItem('token');
   }
   this.loggedIn.next(false);
 }

 private checkToken() {
   if (this.isBrowser) {
     const token = localStorage.getItem('token');
     this.loggedIn.next(!!token);
   }
 }
}