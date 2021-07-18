
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Form, NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {
  }




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
     this.http.post('http://localhost:8080/ajouterArticle',article).subscribe(data => {
      console.log(data);
  })
  }

  updateArticle(article:any) {
    return this.http.put('http://localhost:8080/article/${article.nom}', article);
  }

  deleteArticle(article:any) {
    return this.http.delete('http://localhost:8080/article/${article.nom}');
  }
  
}