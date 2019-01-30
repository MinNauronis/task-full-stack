import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "../objects/user";
import {catchError, map, tap} from "rxjs/operators";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _baseURL = 'http://localhost:8000/api/users';
    private _secondaryDataSource = 'https://jsonplaceholder.typicode.com/users';

    constructor(private _http: HttpClient) {
    }

    public getUsers(useFallbackData = false): Observable<User[]> {
        let url = this._baseURL;
        if (useFallbackData) {
            url = this._secondaryDataSource;
        }

        return this._http.get<User[]>(url, httpOptions).pipe(
            catchError(this.handleError('get users', []))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private getUrlWithId(id: number) : string {
        return this._baseURL + "/" + id;
    }

    public getUser(userId: number): Observable<User> {
        let url = this.getUrlWithId(userId);

        return this._http.get<User>(url, httpOptions).pipe(
            catchError(this.handleError<User>('get user'))
        );
    }

    public createUser(user: User): Observable<any> {
        console.log(user);
        return this._http.post<any>(this._baseURL, user, httpOptions).pipe(
            catchError(this.handleError<User>('create user'))
        );
    }

    public updateUser(user: User): Observable<any> {
        let url = this.getUrlWithId(user.id);

        return this._http.put<any>(url, user, httpOptions).pipe(
            catchError(this.handleError<User>('update user'))
        );
    }

    public deleteCurtain(user: User | number): Observable<any> {
        const id = typeof user === 'number' ? user : user.id;
        let url = this.getUrlWithId(id);

        return this._http.delete<any>(url, httpOptions).pipe(
            catchError(this.handleError<any>('delete user'))
        )
    }
}
