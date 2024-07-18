import { Component } from '@angular/core';
import { MContainerComponent } from '../../m-framework/m-container/m-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../../data/Car';
import { MTableComponent } from "../../m-framework/m-table/m-table.component";
import { MSearchButtonComponent } from "../../m-framework/m-search-button/m-search-button.component";
import { MLocaldataService } from '../../services/m-localdata.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CanvasJSAngularChartsModule,CommonModule, FormsModule, MContainerComponent, MTableComponent, MSearchButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  model: string; 
  make: string; 
  year: number; 
  filterTerm: string = "";
  headers: string[] = ['ID','Make','Model','Year'];
  
  // This is code added for live charts from CanvasJS example
  dataPoints:any[] = [];
  chart: any;
  chartOptions = {
    theme: "light2",
    title: {
      text: "Live Data"
    },
    data: [{
      type: "bar",
      dataPoints: this.dataPoints
    }]
  }
  // Added code ends here 

  constructor(private mLocaldataService:MLocaldataService){
    this.model = "";
    this.make = "";
    this.year = 2019;
    
  }
  getChartInstance(chart: object) {
    this.chart = chart;
    //this.updateData();
  }
  updateData(){
    let myMap = this.applicationLogic(); 
    this.dataPoints.splice(0, this.dataPoints.length);
    for (let [key,value] of myMap)      
        this.dataPoints.push({x: key, y: value});
    this.chart.render();
  }
  applicationLogic(){ // this kind of code is what I am looking for in a project
    
    //Histogram Logic 

    // Sample Question 1

    // People register for one of three trips (to Dubai, to AlAin, and to Sharjah)
    // They provide their phone number and their name. 
    // A bar chart shows the number of people on each trip. 
    // A table also shows who is going to each trip in a first come first served way
    // There is a limit of 50 people in the bus. If the limit is reached
    // No more registrations to be accepted to this trip. 
    // A box shows saying this trip is complete. 

    // Sample Question 2

    // How many times does a patient fever reaches the high range (40 and above)
    // elevated (38 to 39.9), and normal (below 38). Readings need to be
    // one hour apart to count. 
    // If the reading is high, a box appears asking the patient 
    // to seek help. If the temperature is elevated for more than 24
    // hours, again the same box appears providing the reason as
    // consistently elevated temp. 

    let myMap = new Map<string, number>(); 
    this.mLocaldataService.getList().forEach(car => {
        myMap.set(car.year,0);
    });
    let years = myMap.keys();
    for(let year of years){
      let count = 0; 
      this.mLocaldataService.getList().forEach(car =>{
        if(car.year == year)
          count++; 
      });
      myMap.set(year,count);
    } 
    return myMap;
  }
  public get listofcars(){
    return this.mLocaldataService.getList(); 
  }
  addCar(){
    
    let car = new Car(
      this.mLocaldataService.getNextID(),
      this.make,
      this.model,
      this.year
    );
    this.mLocaldataService.add(car);
    this.updateData();
    this.make = "";
    this.model = "";
    this.year = 2019;

  }

  removeCar(carID: number){
    this.mLocaldataService.remove(carID);
  }
  removeAll(){
    this.mLocaldataService.removeAll();
  }
  navigateCar(){
    console.log("Called");
  }
 
}

