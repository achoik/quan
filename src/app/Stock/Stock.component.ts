import { Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ServerService } from '../service/server.service';
import { HttpClient } from '@angular/common/http';
import { values } from 'lodash';
import { AchatComponent } from '../Achat/Achat.component';



@Component({
  selector: 'app-Stock',
  templateUrl: './Stock.component.html',
  styleUrls: ['./Stock.component.scss']
})
export class StockComponent {

  articles: any=[];
  achat=0;
  vente=0;
  stock=0;

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
  enregistrer(f: NgForm){
    const nom = f.value['nom'];
    const prix_achat=this.prixAchat(f);
    
    const prix_vente=this.prixVente(f);
    const quantité=this.qty(f);
    this.server.updateArticle(nom,prix_achat,prix_vente,quantité);
    location.reload();
  }

  

  remplissage(ev: Event){
    let name=(ev.currentTarget  as HTMLSelectElement).value;
    let i=0;
    while(name!==this.articles[i]['nom']&& i<this.articles.length-1){
      i++;
    }
    this.achat=this.articles[i].prix_achat;
    this.vente=this.articles[i].prix_vente;
    this.stock=this.articles[i].stock;

  }
  prixAchat(f:NgForm){
    if(!f.value['prix_achat']){
      let i=0;
        while(f.value['nom']!==this.articles[i]['nom']&& i<this.articles.length-1){
          i++;
        }
        return this.articles[i].prix_achat;
    } else {
      return f.value['prix_achat'];
    }
  }
  prixVente(f:NgForm){
    if(!f.value['prix_vente']){
      let i=0;
        while(f.value['nom']!==this.articles[i]['nom']&& i<this.articles.length-1){
          i++;
        }
        return this.articles[i].prix_vente;
    } else {
      return f.value['prix_vente'];
    }
  }
  qty(f:NgForm){
    if(!f.value['quantité']){
      let i=0;
        while(f.value['nom']!==this.articles[i]['nom']&& i<this.articles.length-1){
          i++;
        }
        return this.articles[i].stock;
    } else {
      return f.value['quantité'];
    }
  }
}