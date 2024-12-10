import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { UserModule } from '../models/user/user.module';
import { Credentials } from '../register/register.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:9090';
  private http = inject(HttpClient);

  
  isRegistred = false;
  user = signal<UserModule>(new UserModule())

  isCredentials = false;
  loginUser(credentials: Credentials): Observable<any> {
    // console.log(credentials);
    return this.http.post(this.apiUrl + "/user/login", credentials).pipe(
      tap((result: any) => {}),
      map((result: any) => {
        this.isRegistred = false;
        this.isCredentials = !result;
        // console.log(result);
      })
    );

    
  }

  registerUser(credentials: Credentials): Observable<any> {
    console.log(credentials);
    
    return this.http.post(this.apiUrl + "/user/register", credentials).pipe(
      tap((result : unknown) => {
        this.isRegistred = true;
        
      })
    );
  }
}