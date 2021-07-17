import { Component,Input,OnInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from '../service/server.service';
import { JsonpClientBackend } from '@angular/common/http';
import { values } from 'lodash';
import * as _ from 'lodash';



@Component({
  selector: 'app-Achat',
  templateUrl: './Achat.component.html',
  providers: [ServerService],
  styleUrls: ['./Achat.component.scss']
})

export class AchatComponent implements OnInit{
 
  remise=0;
  articles: any =[];
  total=0;
  filteredArticles: any =[];
  searchValue: string="";
  
  constructor(private server: ServerService) {}
  

  ngOnInit() {
   this.getArticles();
  }

  applyFilter(eve:Event) {
    let search=this.searchValue;
    this.filteredArticles=_.filter(this.articles,function(item){
      return item.nom.indexOf(search)>-1;
      });
  }


  changeRemise(eve: Event){
    this.remise=Number((<HTMLInputElement>eve.target).value)
    ;
  }
  

  article_quantity_change(eve: Event){
    let input= eve.currentTarget;
    let quantity=parseInt((input as HTMLInputElement).value);
    let id = (input as HTMLInputElement).id;
    for (let i = 0; i < this.articles.length; i++) {
      if (this.articles[i].nom === id) {
        document.getElementById(id+"_total")?.setAttribute("value",new Number(this.articles[i].prix_vente*quantity).toString())
      }
    }
    this.total+=Number(document.getElementById(id+"_total")?.getAttribute('value'))
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
}