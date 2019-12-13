import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

// Router file which will be exported to the app module
export const appRoutes: Routes = [
    {path: '', component: HomeComponent}, // home route, make it empty so that you can access it in other browser when you loggedin
    {
        path: '', // create a dummy routing and add the childrend inside,so that you can do multiple routes
        runGuardsAndResolvers: 'always', // add runGuards
        canActivate: [AuthGuard],
        children: [
            // tslint:disable-next-line: max-line-length
            {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]}, // add the canActivate to block this page to be access by URL
            {path: 'messages', component: MessagesComponent},
            {path: 'list', component: ListComponent},


        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'} // re-direct to home page




];
