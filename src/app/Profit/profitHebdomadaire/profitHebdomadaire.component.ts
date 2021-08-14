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
  selector: 'app-profitHebdomadaire',
  templateUrl: './profitHebdomadaire.component.html',
  styleUrls: ['./profitHebdomadaire.component.scss']
})
export class profitHebdomadaireComponent implements OnInit{

    articles: any =[];
    articlesAchetes: any =[];
    filteredArticles: any =[];
    totals: any=[];
    profitTotal=0;
    profitNet=0;
    dateDebut: any = new Date();
    dateFin: any = new Date();
    date= new Date();
    constructor(private server: ServerService ,private stateService: StateService, public router: Router) {}
  

  ngOnInit() {
    
  }


  formatDate(date : Date){
    var dateStr =
      date.getFullYear() + "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
      ("00" + date.getDate()).slice(-2) + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
   return dateStr;

  }

  applyDate(eve) {
    this.filteredArticles =[];

      let deb="";
      let fin="";
      this.dateDebut= new Date(this.dateDebut);
      this.dateFin.setDate(this.dateDebut.getDate() + 7);
      deb=this.formatDate (this.dateDebut);
      fin=this.formatDate(this.dateFin);
      console.log(deb);
      console.log(fin);
      this.getArticles(deb,fin);
      this.getProfitTotal(deb,fin);
      this.getProfitNet();
    
  }



  

  getArticles(deb: string , fin: string)  {
    this.server.getprofitDetaille().subscribe((data) =>{
        this.articlesAchetes=data;
        let j=0;
        for(let i=0; i<this.articlesAchetes.length; i++){
          if ((String(this.articlesAchetes[i].date).substring(0,10)>=deb.substring(0,10)&&(String(this.articlesAchetes[i].date).substring(0,10)<fin.substring(0,10)))){
            this.filteredArticles[j]=this.articlesAchetes[i];
            j++;
          }
        }
    });

  }
  
  getProfitTotal(deb: string , fin: string){
    this.server.getprofitTotal().subscribe((data)=>{
        this.totals=data;
        this.profitTotal=0;
        for(let i=0; i<this.totals.length; i++){
          if ((String(this.totals[i].date).substring(0,10)>=deb.substring(0,10)&&(String(this.totals[i].date).substring(0,10)<fin.substring(0,10)))){
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

