import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListOffersComponent } from './components/list-offers/list-offers.component';
import { AddOfferComponent
 } from './components/add-offer/add-offer.component';
const routes: Routes = [
  {path:'home', redirectTo: '', pathMatch: 'full'},
  {path:'', component: HomeComponent},
  {path:'business/offers', component: ListOffersComponent},
  {path:'offers/new', component: AddOfferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
