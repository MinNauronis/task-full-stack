import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../objects/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this._userService.getUsers().subscribe(
        users => this.users = users,
    );

  }

}
