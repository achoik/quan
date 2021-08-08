import { Component,Input,OnInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ServerService } from '../service/server.service';
import { JsonpClientBackend } from '@angular/common/http';
import { values } from 'lodash';
import * as _ from 'lodash';
import { StateService,State } from '../state.service';
import { Router } from '@angular/router';



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
  

  article_quantity_change(eve: Event){
    let input= eve.currentTarget;
    let quantity=parseInt((input as HTMLInputElement).value);
    let id = (input as HTMLInputElement).id;
    for (let i = 0; i < this.articles.length; i++) {
      if (this.articles[i].nom === id) {
        document.getElementById(id+"_total")?.setAttribute("value",new Number(this.articles[i].prix_vente*quantity).toString());
        document.getElementById(this.articles[i].nom)?.setAttribute("value",quantity.toString());
      }
    }
    this.total=0;
    for (let i = 0; i < this.articles.length; i++) {
      this.total+=Number(document.getElementById(this.articles[i].nom+"_total")?.getAttribute("value"))
    }
  }

  applyRemise(){
    this.total-=this.total*(this.remise/100);
  }
  
  getArticles()  {
    this.server.getArticles().subscribe((data) =>{
      this.articles=data;
      this.filteredArticles=this.articles;
    }
    );
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
  }

  annuler(){
    this.closeForm();
    location.reload();
  }
}