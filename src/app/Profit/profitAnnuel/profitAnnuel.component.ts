import { Component,Input,OnInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ServerService } from '../../service/server.service';
import { JsonpClientBackend } from '@angular/common/http';
import { values } from 'lodash';
import * as _ from 'lodash';
import { StateService,State } from '../../state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profitAnnuel',
  templateUrl: './profitAnnuel.component.html',
  styleUrls: ['./profitAnnuel.component.scss']
})
export class profitAnnuelComponent implements OnInit{

    articles: any =[];
    articlesAchetes: any =[];
    filteredArticles: any =[];
    totals: any=[];
    profitTotal=0;
    profitNet=0;
    annee=0;
    constructor(private server: ServerService ,private stateService: StateService, public router: Router) {}
  

  ngOnInit() {
  }


  applyDate(eve:Event) {
    let input= eve.currentTarget;
    this.annee=parseInt((input as HTMLInputElement).value);
    this.getArticles();
    this.getProfitTotal();
    this.getProfitNet();
  }

  getArticles()  {
    this.filteredArticles =[];
    this.server.getprofitDetaille().subscribe((data) =>{
        this.articlesAchetes=data;
        let j=0;
        for(let i=0; i<this.articlesAchetes.length; i++){
          if (String(this.articlesAchetes[i].date).substring(0,5)===String(this.annee)){
            this.filteredArticles[j]=this.articlesAchetes[i];
            j++;
          }
        }
    });

  }
  
  getProfitTotal(){
    this.server.getprofitTotal().subscribe((data)=>{
        this.totals=data;
        this.profitTotal=0;
        for(let i=0; i<this.totals.length; i++){
          console.log(String(this.totals[i].date).substring(0,5));
          if(String(this.totals[i].date).substring(0,5)===String(this.annee)){
            this.profitTotal+=this.totals[i].total;
          }
        }
    });
  }

  getProfitNet(){
    this.server.getArticles().subscribe((data)=>{
      this.articles=data;
      this.profitNet=0;
    for (let i=0; i<this.filteredArticles.length; i++){
      let j=0;
      let found=false;
      while(j<this.articles.length && found===false){
        if(this.filteredArticles[i].nom_article===this.articles[j].nom){
          found=true;
        }
        else{
          j++;
        }
      }
      this.profitNet+=(this.articles[j].prix_vente*this.filteredArticles[i].qte_achetee)-(this.articles[j].prix_achat*this.filteredArticles[i].qte_achetee);

     
    }
  });
  }

}

