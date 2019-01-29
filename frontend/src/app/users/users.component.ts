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
    numbers: number[];

    constructor(private _imagesService: ImageService,
                private _userService: UserService) {
        this.numbers = Array(25).fill(1, 1, 25);
    }

    ngOnInit() {
        this.getUsers();
        this.getImage(0);
    }

    private getUsers() {
        this._userService.getUsers().subscribe(
            users => this.users = users,
        );
    }

    getImage(seed: number): string {
        this._imagesService.getImagePath(seed).subscribe(_ => console.log(_), _ => console.log('errr'));
        return '';
    }

}
