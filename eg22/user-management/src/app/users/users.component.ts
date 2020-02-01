/*
 * @Author: Admin
 * @Date: 2020-01-10 16:48:23
 * @FilePath: \Angular7Study\eg12\user-management\src\app\users\users.component.ts
 * @Description: file content
 */

import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { UserService } from "../user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  // selectedUser: User;
  // onSelect(user: User): void {
  //   this.selectedUser = user;
  // }
  getUsers(): void {
    // this.users = this.userService.getUsers();
    this.userService.getUsers().subscribe(users => (this.users = users));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({ name } as User).subscribe(user => { this.users.push(user) });
  }

  delete(user: User): void { 
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
  }
}

