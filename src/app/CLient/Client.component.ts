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
   transactions:any=[];
   transactionsPerClient:any=[];
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
        this.getTransactions();
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

    delete(index: number){
        const article={
            nom:this.articlesAchetesPerClient[index].nom,
            qty:this.articlesAchetesPerClient[index].quantite_achetee,
            prix_unitaire:this.articlesAchetesPerClient[index].prix_unitaire,
            id_client:this.id
        }
        this.server.handleDeleteArticleAchete(article);  
        this.server.handleTotal(this.id,(article.qty*article.prix_unitaire));
        this.server.deleteArticle(article);
        location.reload();      
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
        this.server.handleTotal(this.id,montant);
        this.server.AddTransaction(this.id,montant,date);
        this.closeForm();
    }

    getTransactions(){
        this.server.getTransaction().subscribe((data) =>{
            let i=0;
            this.transactions=data;
           for(i=0;i<this.transactions.length;i++){
               if (this.transactions[i].id_client===this.id){
                this.transactionsPerClient.push(this.transactions[i]);
               }
           }
        });
    }

}
