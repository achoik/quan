import { Component,OnInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from '../service/server.service';
import { JsonpClientBackend } from '@angular/common/http';


@Component({
  selector: 'app-Achat',
  templateUrl: './Achat.component.html',
  providers: [ServerService],
  styleUrls: ['./Achat.component.scss']
})

export class AchatComponent implements OnInit{
 
  
  articles ='';

  constructor(private server: ServerService) {}


  ngOnInit() {
   this.getArticles();
   
  }
  
  getArticles()  {
    this.server.getArticles().subscribe((data) =>{
      this.articles=JSON.stringify(data);
      console.log(this.articles[0].nom);
    }
    );
  }
}