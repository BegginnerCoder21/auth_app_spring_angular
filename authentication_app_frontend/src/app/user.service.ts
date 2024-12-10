import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:9090/user/register';

  constructor(private http: HttpClient) {}

  registerUser(user: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
