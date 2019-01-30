import {AfterViewInit, Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {User} from "../objects/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MapComponent} from "../map/map.component";
import {max, timeout} from "rxjs/operators";

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {

    @ViewChild(MapComponent) map;

    user: User;

    hideAddress = true;
    hideCompany = true;

    lastWindowSize = 300;
    minMapWidth = 270;

    //events
    viewSizeChecker;
    addressOnMapSetter;

    constructor(
        private _userService: UserService,
        private _routeInfo: ActivatedRoute,
        private _router: Router
    ) {
    }

    ngOnInit() {
        this.getUser();
        this.viewSizeChecker = setInterval(() => this.changeMapSize(), 1000);
        this.addressOnMapSetter = setInterval(() => this.setAddressOnMap(), 2000);
    }

    getUser() {
        const id = +this._routeInfo.snapshot.paramMap.get('id');

        this._userService.getUser(id).subscribe(
            user => {
                this.user = user;
            }
        );
    }

    getImage(seed: number) {
        return 'assets/images/heroes/png/avric_albright.PNG'
    }

    setMapSize(height: number, width: number): void {
        if (height > 0) {
            this.map.setHeight(height);
        }

        if (width > 0) {
            this.map.setWidth(width);
        }

    }

    ngAfterViewInit(): void {
    }

    async setAddressOnMap() {
        if (this.user != null && this.map != null) {
            let coordinates = this.user.address.geo;
            console.log(coordinates);

            this.map.onChoseLocation(coordinates.lat, coordinates.lng);

            clearInterval(this.addressOnMapSetter);
        }
    }

    changeMapSize(): void {
        var windowsWidth = window.innerWidth;
        let width = this.minMapWidth + windowsWidth * 0.5 - 280;

        if (this.map != null && this.lastWindowSize != width) {
            if (width < this.minMapWidth) {
                width = this.minMapWidth;
            }

            this.setMapSize(width * 3 / 4, width);
        }

        this.lastWindowSize = windowsWidth;
    }

    onCompanyClick() {
        this.hideCompany = !this.hideCompany;
    }


    onAddressClick(): void {
        this.hideAddress = !this.hideAddress;
    }

    onDelete(name: string, id: number) {
        if(confirm("Are you sure to delete " + name + "?")) {
            this._userService.deleteCurtain(id).subscribe();
            this._router.navigateByUrl('users');

        }
    }

}
