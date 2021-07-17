import { Component} from '@angular/core';

@Component({
  selector: 'app-Crédit',
  templateUrl: './Crédit.component.html',
  styleUrls: ['./Crédit.component.scss']
})
export class CréditComponent {
  openForm() {
    document.getElementById("myForm")!.style.display = "block";
  }
  
   closeForm() {
    document.getElementById("myForm")!.style.display = "none";
  }
}