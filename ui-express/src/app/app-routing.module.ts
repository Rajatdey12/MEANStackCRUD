import { DeleteListComponent } from './components/delete-list/delete-list.component';
import { GetUsersListComponent } from './components/get-users-list/get-users-list.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-users' },
  { path: 'add-users', component: AddUsersComponent },
  { path: 'edit-users/:id', component: EditUsersComponent },
  { path: 'get-users', component: GetUsersListComponent },
  { path: 'delete-users', component: DeleteListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
