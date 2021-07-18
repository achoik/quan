import { Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ServerService } from '../service/server.service';
import { HttpClient } from '@angular/common/http';
import { values } from 'lodash';



@Component({
  selector: 'app-Stock',
  templateUrl: './Stock.component.html',
  styleUrls: ['./Stock.component.scss']
})
export class StockComponent {

  articles: any=[];

  constructor(private server: ServerService) {}
  
  ngOnInit() {
    this.getArticles();
   }

   getArticles()  {
    this.server.getArticles().subscribe((data) =>{
      this.articles=data;
    }
    );
  }

  openForm() {
    document.getElementById("myForm")!.style.display = "block";
  }
  openFormMiseAjour() {
    document.getElementById("FormMiseAjour")!.style.display = "block";
  }
  
   closeForm() {
    document.getElementById("myForm")!.style.display = "none";
  }

  closeFormMiseAjour(){
    document.getElementById("FormMiseAjour")!.style.display = "none";
  }

  addArticle(form: NgForm){
   
    const nom = form.value['nom'];
    const prix_achat=form.value['prix_achat'];
    const prix_vente= form.value['prix_vente'];
    const quantité=form.value['quantité'];
    const catégorie=form.value['catégorie'];
    this.server.addArticle(nom,prix_achat,prix_vente,quantité,catégorie);
    this.closeForm();
  }
  enregistrer(formulaire: NgForm){
    console.log(formulaire);
  }

}