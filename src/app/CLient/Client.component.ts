import { Component, OnInit } from '@angular/core';
import { ServerService } from '../service/server.service';
import { JsonpClientBackend } from '@angular/common/http';
import { values } from 'lodash';
import * as _ from 'lodash';
import { StateService } from '../state.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({    
    selector:'app-Client',    
    templateUrl:'./Client.component.html',    
    styleUrls:['./Client.component.scss']    
    })  

export class ClientComponent implements OnInit {
   private sub: any;
   id=0;
   clients:any=[];
   client:any;
   articlesAchetes:any=[];
   articlesAchetesPerClient:any=[];
    constructor(private server: ServerService,private route: ActivatedRoute){}
   
    ngOnInit(){
        this.sub=this.route.params.subscribe(params => {
            this.id = +params['id'];
        });
        this.getClient();
        this.getArticlesAchetes();
        
    }

    getClient(){
        this.server.getClients().subscribe((data) =>{
            let i=0;
            this.clients=data;
            while(!(this.clients[i].id==this.id)&& i<this.clients.length){
                i++;
            }
            this.client=this.clients[i];
        });
    }

    getArticlesAchetes(){
        this.server.getArticlesAchetes().subscribe((data) =>{
            let i=0;
            this.articlesAchetes=data;
           for(i=0;i<this.articlesAchetes.length;i++){
               if (this.articlesAchetes[i].id_client===this.id){
                this.articlesAchetesPerClient.push(this.articlesAchetes[i]);
               }
           }
        });
    }

    delete(){

    }

    openForm() {
        document.getElementById("transactionForm")!.style.display = "block";
    }
      
    closeForm() {
        document.getElementById("transactionForm")!.style.display = "none";
    }

    onClickEnregistrer(f:NgForm){
        const montant = f.value['montant'];
        const date = f.value['date'];
        this.server.handleTransaction(this.id,montant);
        this.server.AddTransaction(this.id,montant,date);
        
    }

}
