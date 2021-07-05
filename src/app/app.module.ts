import { animateChild } from '@angular/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { AchatComponent } from './Achat/Achat.component';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './CLients/Client.component';
import { CréditComponent } from './Crédit/Crédit.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './navbar/navbar.component';
import { ProfitComponent } from './Profit/Profit.component';
import { SearchComponent } from './search/Search.component';
import { StockComponent } from './Stock/Stock.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Quincaillerie Nader && Jawhar', component: HomeComponent },
  { path: 'Stock', component: StockComponent },
  { path: 'Crédit', component: CréditComponent },
  { path: 'Profit', component: ProfitComponent },
  { path: 'Achat', component: AchatComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    StockComponent,
    CréditComponent,
    ProfitComponent,
    AchatComponent,
    ClientComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
