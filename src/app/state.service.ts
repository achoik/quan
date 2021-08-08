import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const INITIAL_STATE: State [] = [{"nom": "", "prix_unitaire": 0, "quantite_achetee": 0}];

@Injectable({
  providedIn: 'root'
})
export class StateService {

    private _state: BehaviorSubject<State[]> = new BehaviorSubject<State[]>(INITIAL_STATE);

    state = this._state.asObservable(); 

    loadData(newData: any) {
      const initialData = this._state.getValue()
      this._state.next(newData);
    }
    destroyData(){
      this._state.unsubscribe();
    }

}

export interface State {
  nom: string;
  prix_unitaire: number;
  quantite_achetee: number
}