import { Component,EventEmitter } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../../data/CarData';
import { MCardComponent } from '../../m-framework/m-card/m-card.component';
import { MTableComponent } from "../../m-framework/m-table/m-table.component";
import { MSearchButtonComponent } from "../../m-framework/m-search-button/m-search-button.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MContainerComponent, MCardComponent, MTableComponent, MSearchButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  model: string; 
  make: string; 
  year: number; 
  filterTerm: string = "";
  listofcars: Car[]; 
  headers: string[] = ['ID','Make','Model','Year'];

  id: number = 1;

  constructor(){
    this.model = "";
    this.make = "";
    this.year = 2019;
    this.listofcars = []; 
    
  }

  addCar(){
    let car = new Car(this.id++,this.make,this.model,this.year);
    this.listofcars = [...this.listofcars, car];
    this.make = "";
    this.model = "";
    this.year = 2019;
  }
  removeCar(carID: number){
    console.log("Request to remove CARID " + carID);
    let index = this.listofcars.findIndex(anycar => anycar.id == carID);
    if(index != -1) 
      this.listofcars.splice(index,1);
  }
  removeAll(){
    this.listofcars = [];
  }
}

