import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListOffersComponent } from './components/list-offers/list-offers.component';

const routes: Routes = [
  {path:'home', redirectTo: '', pathMatch: 'full'},
  {path:'', component: HomeComponent},
  {path:'offers', component: ListOffersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
