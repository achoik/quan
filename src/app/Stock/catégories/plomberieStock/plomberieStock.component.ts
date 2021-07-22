import { Component,Input,OnInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JsonpClientBackend } from '@angular/common/http';
import { ServerService } from 'src/app/service/server.service';
import { values } from 'lodash';
import * as _ from 'lodash';

@Component({
  selector: 'app-plomberieStock',
  templateUrl: './plomberieStock.component.html',
  styleUrls: ['./plomberieStock.component.scss']
})
export class PlomberieStockComponent implements OnInit{
  articles: any =[];
  filteredArticles: any =[];
  searchValue: string="";
  
  constructor(private server: ServerService) {}

  ngOnInit() {
    this.getArticlesPlomberie();
   }

   getArticlesPlomberie()  {
    this.server.getArticlesPlomberie().subscribe((data) =>{
      this.articles=data;
      this.filteredArticles=this.articles;
    }
    );
  }

  applyFilter(eve:Event) {
    let search=this.searchValue;
    this.filteredArticles=_.filter(this.articles,function(item){
      return item.nom.toLowerCase().indexOf(search.toLowerCase())>-1;
    });
  }

}