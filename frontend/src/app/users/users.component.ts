import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../objects/user";
import {ImageService} from "../services/image.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

    private hideFillButton = true;

    users: User[];

    constructor(private _imagesService: ImageService,
                private _userService: UserService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    private getUsers() {
        this._userService.getUsers().subscribe(
            users => {
                this.users = users;
                if (users.length < 1) {
                    this.hideFillButton = false;

                }
            },
        );
    }

    private getImage(seed: number) {
        return 'assets/images/heroes/png/avric_albright.PNG'
    }

    private fillWithUsers() {
        this._userService.getUsers(true).subscribe(
            users => {
                this.users = users;
                this.hideFillButton = true;
                this.users.forEach(user => {
                    this.addUser(user);
                });
            },
        );
    }

    private addUser(user: User) {
        this._userService.createUser(user).subscribe(
            _ => {
                console.log('user added ' + _);
            },
            _ => {
                console.log('error userAdd ' + _)
            }
        )
    }

}
