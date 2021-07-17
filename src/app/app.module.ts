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
import { ServerService } from './service/server.service';
import { PeintureStockComponent } from './Stock/catégories/peinture Stock/peintureStock.component';
import { PeintureProfitComponent } from './Profit/catégorie/peintureProfit/PeintureProfit.component';
import { AutresStockComponent } from './Stock/catégories/autresStock/autresStock.component';
import { PvcStockComponent } from './Stock/catégories/pvcStock/pvcStock.component';
import { MenuiserieStockComponent } from './Stock/catégories/menuiserieStock/mznuiserieStock.component';
import { PlomberieStockComponent } from './Stock/catégories/plomberieStock/plomberieStock.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Quincaillerie Nader && Jawhar', component: HomeComponent },
  { path: 'Stock', component: StockComponent },
  { path: 'Crédit', component: CréditComponent },
  { path: 'Profit', component: ProfitComponent },
  { path: 'Achat', component: AchatComponent },
  /*{ path: 'Peinture' , component: CatégorieComponent},
  { path: 'Plomberie' , component: CatégorieComponent},
  { path: 'Autres' , component: CatégorieComponent},
  { path: 'Menuiserie' , component: CatégorieComponent},
  { path: 'PVC' , component: CatégorieComponent},*/
  { path: 'plomberie' , component: PlomberieStockComponent},
  { path: 'menuiserie' , component: MenuiserieStockComponent},
  { path: 'Pvc' , component: PvcStockComponent},
  { path: 'autres' , component: AutresStockComponent},
  { path: 'peinture' , component: PeintureStockComponent},
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
    PeintureStockComponent,
    PeintureProfitComponent,
    AutresStockComponent,
    PvcStockComponent,
    MenuiserieStockComponent,
    PlomberieStockComponent,
    
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
