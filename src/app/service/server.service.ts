
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Form, NgForm } from '@angular/forms';
import { data } from 'jquery';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  totalCLient=0;
  constructor(private http: HttpClient) {
  }



  //--------------------------Articles-------------------------------
  getArticles(){
    return this.http.get('http://localhost:8080/articles');
  }
  getArticlesPeinture(){
    return this.http.get('http://localhost:8080/articles/peinture');
  }
  getArticlesPlomberie(){
    return this.http.get('http://localhost:8080/articles/plomberie');
  }
  getArticlesMenuiserie(){
    return this.http.get('http://localhost:8080/articles/menuiserie');
  }
  getArticlesPVC(){
    return this.http.get('http://localhost:8080/articles/pvc');
  }
  getArticlesAutres(){
    return this.http.get('http://localhost:8080/articles/autres');
  }
  addArticle(name:string,prixAchat:number,prixVente:number,Qty:number,Category:string){
    const article={
      nom : name,
      prix_achat: prixAchat,
      prix_vente: prixVente,
      quantité: Qty,
      catégorie:Category,
   }
     this.http.post('http://localhost:8080/ajouterArticle',article).subscribe();
  }

  updateArticle(name:string,prixAchat:number,prixVente:number,Qty:number) {
    const article={
      nom : name,
      prix_achat: prixAchat,
      prix_vente: prixVente,
      quantité: Qty
   }
    this.http.put('http://localhost:8080/update', article).subscribe();
  }


    //--------------------------Articles Achetés-------------------------------

  getArticlesAchetes(){
    return this.http.get('http://localhost:8080/articlesAchetes');
  }

  updateArticleAchat(name:string,qty:number){
    const article={
      nom: name,
      qty_vendue:qty
    }
    this.http.put('http://localhost:8080/updateAchat', article).subscribe();
  }

  handleAddArticleAchete(Article: any){ 
    return this.http.post('http://localhost:8080/ArticleAchete',Article);
  }

  handleDeleteArticleAchete(Article:any){
    this.http.delete('http://localhost:8080/articleAchete',({
      body: Article
   })).subscribe();
  }
  deleteArticle(Article:any){
    this.http.put('http://localhost:8080/deleteArticleAchete',Article).subscribe();
  }

     //--------------------------Clients-------------------------------


 
  getClients(){
    return this.http.get('http://localhost:8080/clients');
  }
  updateTotalClient(id:number,total:number){
    const totalfix={
      id:id,
      total:total
    }
    return this.http.put('http://localhost:8080/updateTotal',totalfix);
  }


  handleAddClient(form: NgForm, Articles: any){
    this.addClient(form.value['nom'],form.value['surnom'],form.value['numero']).subscribe((id: any)=> {
      for (let i =0; i<Articles.length;i++){
        Articles[i]['id']=id[0]['id'];
        this.totalCLient+=(Articles[i].prix_unitaire)*(Articles[i].quantite_achetee);
      }
      this.handleAddArticleAchete(Articles);
      this.updateTotalClient(id[0].id,this.totalCLient);
    }); 
  }

  GetClientByNomSurnom(nom_surnom: any){
    return this.http.post('http://localhost:8080/GetClientNomSurnom',nom_surnom);
    
  }

  

 
  addClient(name:string, surnom:string,numero:number){
    const client={
      nom : name,
      surnom:surnom,
      numero:numero
   };
    return this.http.post('http://localhost:8080/ajouterClient', client);
   
  }

  //--------------------------Transactions-------------------------------


  handleTotal(id:number,total:number){
    const totalfix={
      id:id,
      total:total
    }
    this.http.put('http://localhost:8080/total-',totalfix).subscribe(); 
  }
  AddTransaction(id:number,total:number,date:Date){
    const transaction={
      id_client:id,
      montant:total,
      date:date
    }
    this.http.post('http://localhost:8080/ajouterTransaction',transaction).subscribe(); 
  }

  getTransaction(){
    return this.http.get('http://localhost:8080/getTransactions');
  }
  

//----------------------------Calcul Profit---------------------
AddProfit(Article:any){
  return this.http.post('http://localhost:8080/profit',Article).subscribe();
}
ADDTotal(total:number){
  const totalAny={
    total:total
  }
  this.http.post('http://localhost:8080/totals',totalAny).subscribe();
}
getprofitTotal(){
  return this.http.get('http://localhost:8080/profitTotal');
}


getprofitDetaille(){
  return this.http.get('http://localhost:8080/profitDetaille');
}

}