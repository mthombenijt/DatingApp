import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list-resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsave-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';


// Router file which will be exported to the app module
export const appRoutes: Routes = [
    {path: '', component: HomeComponent}, // home route, make it empty so that you can access it in other browser when you loggedin
    {
        path: '', // create a dummy routing and add the childrend inside,so that you can do multiple routes
        runGuardsAndResolvers: 'always', // add runGuards
        canActivate: [AuthGuard],
        children: [
            // tslint:disable-next-line: max-line-length
            {path: 'members', component: MemberListComponent,
             resolve: {users: MemberListResolver}}, // add the canActivate to block this page to be access by URL
            {path: 'members/:id', component: MemberDetailComponent,
             resolve: {user: MemberDetailResolver}}, // rout parameter, add a resolver to avoid safe navigation operator '?'
            {path: 'member/edit', component: MemberEditComponent,
             resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            {path: 'messages', component: MessagesComponent},
            {path: 'list', component: ListComponent, resolve: {users: ListsResolver}},


        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'} // re-direct to home page




];
