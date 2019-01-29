import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {HeroImage} from "../objects/hero-image";

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private _isPathLoad = false;
    private _isWebPSupport = false;
    private _heroesImages: HeroImage[];
    private _pngPath: string;
    private _webpPath: string;

    constructor(private _http: HttpClient) {

        (async () => {
            this._isWebPSupport = await this.supportsWebp()
        })();

        this.getJSON().subscribe(
            data => {
                this._heroesImages = data['images'];
                this._pngPath = 'assets/' + data['png_path'];
                this._webpPath = 'assets/' + data['webp_path'];
                console.log('images is loaded');
                this._isPathLoad = true;
            }
        );

    }

    private getJSON(): Observable<any> {
        return this._http.get("assets/heroesImages.json").pipe(
            tap((error: any) => console.log(error))
        )
    }

    public getImagePath(seed: number): Observable<string> {
        console.log(this._isWebPSupport);
        const pathGiver = new Observable<string>(
            (obsever) => {
                if (!this._isPathLoad) {

                }

                if (!this._isPathLoad) {
                    obsever.next('');
                } else {
                    let id = this.generateImageId(seed);
                    let path = this.generateImagePath(id);
                    obsever.next(path);
                }

                obsever.complete()
            }
        );

        return pathGiver;
    }

    /**
     * @param seed
     */
    private generateImageId(seed: number): number {
        let id = 0;
        let i = 1;

        while (seed > 1) {
            let num = seed % 7 + seed * 3;
            id += num / i;
            i = num / 2 + 1;
            seed = Math.round(seed / 5);
        }

        id = Math.round(id % this._heroesImages.length);

        return id;
    }

    /**
     * Return path to image.
     * If extension is 'webp' then return path to webp asset
     * Otherwise, return path of png asset
     */
    private generateImagePath(id: number, webpSupport = false): string {
        if (webpSupport === true) {
            return this._webpPath + this._heroesImages[id].webp;
        }

        return this._pngPath + this._heroesImages[id].png;
    }

    private async supportsWebp() {
        if (!self.createImageBitmap) return false;

        const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
        const blob = await fetch(webpData).then(r => r.blob());
        return createImageBitmap(blob).then(() => true, () => false);
    }

}
