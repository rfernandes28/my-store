import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL_TEST}/api`;
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private user = new BehaviorSubject<User | null>(null);

  // forma de observable variable$
  user$ = this.user.asObservable();

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  profile() {
    /* Se delega el trabajo del token al interceptor */
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(
      `${this.apiUrl}/auth/profile`
      // {
      //   headers,
      // }
    ).pipe(tap(user => this.user.next(user)));
  }
//tap solo realiza una accion

  loginAndGetProfile(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.profile()));
  }

  logout() {
    this.tokenService.removeToken();
  }
}
