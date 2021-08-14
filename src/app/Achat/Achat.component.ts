import { Component,Input,OnInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ServerService } from '../service/server.service';
import { JsonpClientBackend } from '@angular/common/http';
import { values } from 'lodash';
import * as _ from 'lodash';
import { StateService,State } from '../state.service';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';



@Component({
  selector: 'app-Achat',
  templateUrl: './Achat.component.html',
  providers: [ServerService],
  styleUrls: ['./Achat.component.scss']
})

export class AchatComponent implements OnInit{
 
  credit= false;
  remise=0;
  articles: any =[];
  total=0;
  filteredArticles: any =[];
  searchValue: string="";
  articlesAchetes:any =[];
  articleAchete={
    'nom': '',
    'prix_unitaire' :0,
    'quantite_achetee': 0
  };
  
  constructor(private server: ServerService ,private stateService: StateService, public router: Router) {}
  

  ngOnInit() {
   this.getArticles();
  }



  applyFilter(eve:Event) {
    let search=this.searchValue;
    this.filteredArticles=_.filter(this.articles,function(item){
      return item.nom.toLowerCase().indexOf(search.toLowerCase())>-1;
      });
  }


  changeRemise(eve: Event){
    this.remise=Number((<HTMLInputElement>eve.target).value);
  }
  

  article_quantity_change(eve: Event, i: any){// ayyah
    
    this.articles[i].total=this.articles[i].prix_vente*this.articles[i].quantity;
    this.total=0;
    for (let i = 0; i < this.articles.length; i++) {
      this.total+=this.articles[i].total;
    }
  }

  applyRemise(){
    this.total-=this.total*(this.remise/100);
  }
  
  getArticles()  {
    this.server.getArticles().subscribe((data) =>{
      this.articles=data;
      for (let i=0;i<this.articles.length;i++){
        this.articles[i]['id']=i;

        this.articles[i]['quantity']=0;
        this.articles[i]['total']=0;
      }
      this.filteredArticles=this.articles;
      console.log(this.articles);
      });
  }


  openForm() {
    document.getElementById("confirmForm")!.style.display = "block";
  }

  closeForm() {
    document.getElementById("confirmForm")!.style.display = "none";
  }
  OnClickCredit(){ 
    this.credit=true;
    this.openForm();
    for (let i = 0; i < this.articles.length; i++) {
      let qty=Number(document.getElementById(this.articles[i].nom)?.getAttribute("value"));
      if(qty!==0){
        this.articleAchete = {
          nom : this.articles[i].nom,
          prix_unitaire : this.articles[i].prix_vente,
          quantite_achetee : Number(document.getElementById(this.articles[i].nom)?.getAttribute("value"))
        };
        this.articlesAchetes.push(this.articleAchete);
      } 
    } 
  }


  OnClickCash(){
    this.credit=false;
    this.openForm();
    for (let i = 0; i < this.articles.length; i++) {
      let qty=Number(document.getElementById(this.articles[i].nom)?.getAttribute("value"));
      if(qty!==0){
        this.articleAchete = {
          nom : this.articles[i].nom,
          prix_unitaire : this.articles[i].prix_vente,
          quantite_achetee : Number(document.getElementById(this.articles[i].nom)?.getAttribute("value"))
        };
        this.articlesAchetes.push(this.articleAchete);
      }
    } 
  }

  confirmer(){
    this.closeForm();
    let i=0
    if(this.credit===true){
      for(i=0;i<this.articlesAchetes.length;i++){
        this.server.updateArticleAchat(this.articlesAchetes[i].nom,this.articlesAchetes[i].quantite_achetee);
        this.stateService.loadData(this.articlesAchetes);
        this.stateService.state.subscribe( (data) =>{
          this.router.navigate(['/Crédit']);
        });
      }
    }
    else{
      for(i=0;i<this.articlesAchetes.length;i++){
        this.server.updateArticleAchat(this.articlesAchetes[i].nom,this.articlesAchetes[i].quantite_achetee);
        location.reload();
      }
    }
    this.server.AddProfit(this.articlesAchetes);
    this.server.ADDTotal(this.total);
  }

  annuler(){
    this.closeForm();
    location.reload();
  }
}