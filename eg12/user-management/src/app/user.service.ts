/*
 * @Author: Admin
 * @Date: 2020-01-17 21:42:51
 * @FilePath: \Angular7Study\eg12\user-management\src\app\user.service.ts
 * @Description: file content
 */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { MessageService } from "./message.service";
import { User } from "./user";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed:${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`UserService:${message}`);
  }

  private usersURL = "api/users";
  // getUsers(): Observable<User[]> {
  //   this.messageService.add("UserService:已经获取到用户列表！");
  //   return of(USERS);
  // }

  // 重构1
  /*   getUsers(): Observable<User[]> {
    this.log("已经获取到用户列表！");
    return this.http.get<User[]>(this.usersURL);
  } */

  // 重构2
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersURL).pipe(
      tap(Users => this.log("fetched Users")),
      catchError(this.handleError("getUsers", []))
    );
  }

  /*   getUser(id: number): Observable<User> {
    // console.log(id);
    this.messageService.add(`UserService:已经获取到用户 id=${id}`);
    return of(USERS.find(user => user.id === id));
  } */

  getUser(id: number): Observable<User> {
    // console.trace("");
    this.log(`已经获取到用户 id=${id}`);
    const url = `${this.usersURL}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }
}
