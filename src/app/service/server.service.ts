
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {
  }




  getArticles(){
    return this.http.get('http://localhost:8080/articles');
  }

  addArticle(article:any){
    return this.http.post('http://localhost:8080/article',article);
  }

  updateArticle(article:any) {
    return this.http.put('http://localhost:8080/article/${article.nom}', article);
  }

  deleteArticle(article:any) {
    return this.http.delete('http://localhost:8080/article/${article.nom}');
  }
}