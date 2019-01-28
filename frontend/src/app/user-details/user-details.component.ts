import {Component, Input, OnInit} from '@angular/core';
import {User} from "../objects/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

    user: User;

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.getUser();
    }

    private getUser() {
        const id = +this._route.snapshot.paramMap.get('id');

        this._userService.getUser(id).subscribe(
            user => this.user = user
        );

        console.log(this.user);
    }

}
