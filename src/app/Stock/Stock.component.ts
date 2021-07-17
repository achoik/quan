import { Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ServerService } from '../service/server.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-Stock',
  templateUrl: './Stock.component.html',
  styleUrls: ['./Stock.component.scss']
})
export class StockComponent {

  

  constructor(private server: ServerService) {}
  


  openForm() {
    document.getElementById("myForm")!.style.display = "block";
  }
  
   closeForm() {
    document.getElementById("myForm")!.style.display = "none";
  }

  addArticle(form: NgForm){
   
    const nom = form.value('nom');
    const prix_achat=form.value('prix_achat');
    const prix_vente= form.value('prix_vente');
    const quantité=form.value('quantité');
    const catégorie=form.value('catégorie');
    
    this.server.addArticle(nom,prix_achat,prix_vente,quantité,catégorie);
    this.closeForm();
  }

}