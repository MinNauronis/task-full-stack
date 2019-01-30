import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {HttpClientModule} from "@angular/common/http";
import {UserDetailsComponent} from './user-details/user-details.component';
import {AppRoutingModule} from './app-routing.module';
import {NavigationComponent} from './navigation/navigation.component';
import {MapComponent} from './map/map.component';
import {AgmCoreModule} from "@agm/core";

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        UserDetailsComponent,
        NavigationComponent,
        MapComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBCb0ER1LjrbUf0vCxVRRToHftTIo6DJhY'
        })
    ],
    providers: [],
    bootstrap:
        [AppComponent]
})

export class AppModule {
}
