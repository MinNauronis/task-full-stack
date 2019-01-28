import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {UserDetailsComponent} from "./user-details/user-details.component";

const routes: Routes = [
    {path: '', redirectTo: '/'},
    {path: 'users', component: UsersComponent},
    {path: 'users/:id', component: UserDetailsComponent}
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class AppRoutingModule {
}
