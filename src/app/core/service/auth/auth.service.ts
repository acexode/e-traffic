import { authEndpoints, baseEndpoints } from './../../config/endpoints';
import { RequestService } from './../../request/request.service';
import { Injectable } from '@angular/core';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

// eslint-disable-next-line @typescript-eslint/naming-convention
const User = {
  email: 'random@gmail.com',
  fullName: 'Abubakar',
  isActivated: false,
  password: 'password',
  phone: '11223334455',
  resetToken: null,
  id: 1,
};
const TOKEN_KEY = 'my-token';
const CURRENT_USER = 'current-user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  currentUser$: BehaviorSubject<any> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private reqS: RequestService) {
    this.loadToken();
    this.currentUser().subscribe((e) => {
      console.log(e);
      this.currentUser$.next(JSON.parse(e.value));
    });
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  async getToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    return token && token.value ? token.value : null;
  }

  login(credentials: { email; password }) {
    // return this.reqS.post(authEndpoints.signup, credentials)
    return of(credentials).pipe(
      switchMap((res: any) => {
        console.log(res);
        this.currentUser$.next(User);
        from(Storage.set({ key: CURRENT_USER, value: JSON.stringify(User) }));
        return from(Storage.set({ key: TOKEN_KEY, value: 'token' }));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }
  signup(credentials: { name; email; password }): Observable<any> {
    // return this.reqS.post(authEndpoints.signup, credentials).pipe(
    return of(credentials).pipe(
      switchMap((res: any) =>
        from(
          Storage.set({ key: CURRENT_USER, value: JSON.stringify(res.data) })
        )
      ),
      tap((_) => {
        console.log('authenticated');
      })
    );
  }
  activateAccount(credentials: { email; verificationCode }): Observable<any> {
    return this.reqS.post(authEndpoints.activate, credentials).pipe(
      switchMap((data: any) => {
        from(
          Storage.set({ key: CURRENT_USER, value: JSON.stringify(data.user) })
        );
        return from(Storage.set({ key: TOKEN_KEY, value: data.token }));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }
  forgotPasswordInitiate(credentials: { email }): Observable<any> {
    return this.reqS.post(authEndpoints.forgotPasswordInitiate, credentials);
  }
  forgotPasswordComplete(credentials: {
    email;
    verificationCode;
    password;
  }): Observable<any> {
    return this.reqS.post(authEndpoints.forgotPasswordComplete, credentials);
  }
  changePassword(credentials: { oldPassword; newPassword }): Observable<any> {
    return this.reqS.post(authEndpoints.changePassword, credentials);
  }
  updateUser(id, credentials): Observable<any> {
    return this.reqS.put(baseEndpoints.auth + '/' + id, credentials).pipe(
      switchMap((res: any) => {
        console.log(res);
        this.currentUser$.next(res.data);
        return from(
          Storage.set({ key: CURRENT_USER, value: JSON.stringify(res.data) })
        );
      })
    );
  }
  uploadProfileImage(data): Observable<any> {
    return from([]);
  }

  currentUser(): Observable<any> {
    return from(Storage.get({ key: CURRENT_USER }));
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    Storage.remove({ key: CURRENT_USER });
    Storage.remove({ key: 'my_cart' });
    return Storage.remove({ key: TOKEN_KEY });
  }
}
