import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {NewUserComponent} from "./user-new/new-user.component";

const routes: Routes = [
    //{path: '', component: AppComponent},
    {path: 'users', component: UsersComponent},
    {path: 'users/:id', component: UserDetailsComponent},
    {path: 'users/edit/', component: NewUserComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
