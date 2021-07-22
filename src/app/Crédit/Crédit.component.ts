import { Component,Input,OnInit} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ServerService } from '../service/server.service';
import { JsonpClientBackend } from '@angular/common/http';
import { values } from 'lodash';
import * as _ from 'lodash';

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
  constructor(private server: ServerService) {}


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
      console.log(this.filteredClients);
    }
    );
  }
  applyFilter(eve:Event) {
    let search=this.searchValue;
    this.filteredClients=_.filter(this.clients,function(item){
      return item.nom.toLowerCase().indexOf(search.toLowerCase())>-1;
    });
  }

  addClient(form: NgForm){
    const nom = form.value['nom'];
    const surnom=form.value['surnom'];
    const numero= form.value['numero'];
    this.server.addClient(nom,surnom,numero);
    this.closeForm();
  }

}