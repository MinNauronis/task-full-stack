import {AfterViewInit, Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {User} from "../objects/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
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

    isMapLoaded = false;
    lastWindowSize = 300;
    minMapWidth = 270;

    //events
    viewSizeChecker;
    addressOnMapSetter;

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.getUser();
        this.viewSizeChecker = setInterval(() => this.changeMapSize(), 1000);
        this.addressOnMapSetter = setInterval(() => this.setAddressOnMap(), 2000);
    }

    getUser() {
        const id = +this._route.snapshot.paramMap.get('id');

        this._userService.getUser(id).subscribe(
            user => {
                this.user = user;
                this.setAddressOnMap().then(message => console.log(message));
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
        this.isMapLoaded = true;
        let coordinates = this.user.address.geo;
        this.map.onChoseLocation(coordinates.lat, coordinates.lng);
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

        if (width && this.lastWindowSize != width) {
            if (width < this.minMapWidth) {
                width = this.minMapWidth;
            }

            this.setMapSize(width * 3 / 4, width);
        }

        this.lastWindowSize = windowsWidth;
    }

}
