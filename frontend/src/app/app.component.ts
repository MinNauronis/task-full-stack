import {Component} from '@angular/core';
import {ImageService} from "./services/image.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'frontend';

    constructor(private _imageService: ImageService) { }

}
