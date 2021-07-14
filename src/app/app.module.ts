import { animateChild } from '@angular/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { AchatComponent } from './Achat/Achat.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './CLients/Client.component';
import { CréditComponent } from './Crédit/Crédit.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './navbar/navbar.component';
import { ProfitComponent } from './Profit/Profit.component';
import { SearchComponent } from './search/Search.component';
import { StockComponent } from './Stock/Stock.component';
import { CatégorieComponent } from './Profit/catégorie/Catégorie.component';
import { CatégoriesComponent } from './Stock/catégories/Catégories.component';
import { ServerService } from './service/server.service';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Quincaillerie Nader && Jawhar', component: HomeComponent },
  { path: 'Stock', component: StockComponent },
  { path: 'Crédit', component: CréditComponent },
  { path: 'Profit', component: ProfitComponent },
  { path: 'Achat', component: AchatComponent },
  { path: 'Peinture' , component: CatégorieComponent},
  { path: 'Plomberie' , component: CatégorieComponent},
  { path: 'Autres' , component: CatégorieComponent},
  { path: 'Menuiserie' , component: CatégorieComponent},
  { path: 'PVC' , component: CatégorieComponent},
  { path: 'Pvc' , component: CatégoriesComponent},
  { path: 'plomberie' , component: CatégoriesComponent},
  { path: 'menuiserie' , component: CatégoriesComponent},
  { path: 'autres' , component: CatégoriesComponent},
  { path: 'peinture' , component: CatégoriesComponent},
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
    SearchComponent,
    CatégorieComponent,
    CatégoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
