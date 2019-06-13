import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user.model';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    // Sets local storage key to user subject. Local storage holds iuf the user if logged in
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // Sets current user to observable
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Returns the current User Object
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Returns an observable for every registered user
   */
  getAlUsers() {
    return this.http.get<any>(`${environment.apiUrl}/users`, {})
      .pipe(map(res => {
        return res;
      }));
  }

  /**
   * Login the user
   * @param username Username
   * @param password Password
   */
  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          let pureUser = user.userWithoutHash;
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(pureUser));
          this.currentUserSubject.next(pureUser);
        }

        return user;
      }));
  }

  /**
   * Edits current user
   * @param username New username
   * @param firstName New firstname
   * @param lastName New lastname
   * @param _id Id Remains the same
   */
  editUser(username: string, firstName: string, lastName: string, _id: number) {
    const options = { params: new HttpParams().set('_id', String(_id))};
    return this.http.put<any>(`${environment.apiUrl}/users/${_id}`,
      { username, firstName, lastName},
      options
        )
      .pipe(map(currentUser => {
        // login successful if there's a jwt token in the response
        if (currentUser) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          this.currentUserSubject.next(currentUser);
        }
        return currentUser;
      }));
  }

  /**
   * Registers user
   * @param email New Email
   * @param username New username
   * @param firstName Users First name
   * @param lastName New Last Name
   * @param password Password as String
   */
  register(email: string, username: string, firstName: string, lastName: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/register`, { username, email, password, firstName, lastName })
      .pipe(map(res => {
        return res;
      }));
  }

  /**
   * Logs out user by removing key from local storage
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
