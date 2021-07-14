import { Component} from '@angular/core';

@Component({
  selector: 'app-Profit',
  templateUrl: './Profit.component.html',
  styleUrls: ['./Profit.component.scss']
})
export class ProfitComponent {
  valeur="0";

  ngOnInit() {
    this.valeur=(parseFloat(document.getElementById("Peinture")!.getAttribute('value')||"")+parseFloat(document.getElementById("PVC")!.getAttribute('value')||"")+parseFloat(document.getElementById("Menuiserie")!.getAttribute('value')||"")+parseFloat(document.getElementById("Plomberie")!.getAttribute('value')||"")+parseFloat(document.getElementById("Autres")!.getAttribute('value')||"")).toString()+"DT"
  }

}