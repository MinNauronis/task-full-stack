import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

    private latitude = 54.89722;
    private longitude = 23.88611;
    private isLocationChosen = false;

    private mapHeight: string;
    private mapWidth: string;

    constructor() {
        this.mapWidth = '100px';
    }

    ngOnInit() {
        this.mapWidth = '300px';
        this.mapHeight = '200px';
    }

    onChoseLocation(latitude: number, longitude: number): void {
        this.latitude = latitude;
        this.longitude = longitude;
        this.isLocationChosen = true;
    }

    /**
     * set height in pixels
     * @param height
     */
    setHeight(height: number): void {
        this.mapHeight = height + 'px';
    }

    /**
     * set width in pixels
     * @param width
     */
    public setWidth(width: number): void {
        this.mapWidth = width + 'px';
    }
}
