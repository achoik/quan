import { Component,Input,OnInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ServerService } from '../service/server.service';
import { JsonpClientBackend } from '@angular/common/http';
import { values } from 'lodash';
import * as _ from 'lodash';
import { StateService } from '../state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Crédit',
  templateUrl: './Crédit.component.html',
  providers: [ServerService],
  styleUrls: ['./Crédit.component.scss']
})
export class CréditComponent implements OnInit {

  clients :any =[];
  filteredClients: any =[];
  searchValue: string="";
  total=0;
  constructor(private server: ServerService, private stateService: StateService, public router: Router) {}

  ngOnInit() {
    this.getClients();
   } 

  openForm() {
    document.getElementById("FormClient")!.style.display = "block";
  }
  
   closeForm() {
    document.getElementById("FormClient")!.style.display = "none";
  }

  getClients()  {
    this.server.getClients().subscribe((data) =>{
      this.clients=data;
      this.filteredClients=this.clients;
    }
    );    

  }
  applyFilter(eve:Event) {
    let search=this.searchValue;
    this.filteredClients=_.filter(this.clients,function(item){
      return item.nom.toLowerCase().indexOf(search.toLowerCase())>-1;
    });
  }

  onClickNomClient(index: number){
    this.stateService.state.subscribe((Articles: any)=>{
      this.server.GetClientByNomSurnom({nom:this.clients[index]['nom'],surnom:this.clients[index]['surnom']}).subscribe((id: any)=>{
        for (let i =0; i<Articles.length;i++){
          Articles[i]['id']=id[0]['id'];
          this.total+=(Articles[i].prix_unitaire)*(Articles[i].quantite_achetee);
        }
        this.server.handleAddArticleAchete(Articles).subscribe(()=> {
          this.server.updateTotalClient(id[0].id,this.total).subscribe(()=> {
            this.stateService.destroyData();
            this.router.navigate(['/Client', this.clients[index].id ]);
          })
          
        })
        
      });
    });
   
  }

  onClickAddClient(form: NgForm){
    this.stateService.state.subscribe((Articles)=>{
      this.server.handleAddClient(form, Articles);
    });
    this.closeForm();
    this.stateService.destroyData();
  }

}