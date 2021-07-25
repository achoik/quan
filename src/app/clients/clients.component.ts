import { Component, OnInit } from '@angular/core';
import { ServerService } from '../service/server.service';
import { JsonpClientBackend } from '@angular/common/http';
import { values } from 'lodash';
import * as _ from 'lodash';
import { StateService } from '../state.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  
  clients :any =[];
  filteredClients: any =[];
  searchValue: string="";
  constructor(private server: ServerService, private stateService: StateService, public router: Router) {}

  ngOnInit() {
    this.getClients();
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
    this.router.navigate(['/Client', this.clients[index].id ]);
  }

}
