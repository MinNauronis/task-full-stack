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
            },
        );
    }

    private getImage(seed: number) {
        return 'assets/images/heroes/png/avric_albright.PNG'
    }

}
