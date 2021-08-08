import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../service/server.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  articles:any=[];

  constructor(private server: ServerService, public router: Router){}

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
    document.getElementById("echangeForm")!.style.display = "block";
  }

  closeForm() {
    document.getElementById("echangeForm")!.style.display = "none";
  }

  enregistrer(f:NgForm){
    const nom=f.value['nom'];
    const qty=f.value['qty'];
    const Article={
      nom:nom,
      qty:qty
    }
    console.log(Article);
    this.server.deleteArticle(Article);
    this.closeForm();
    this.router.navigate(['/Achat']);
  }
}