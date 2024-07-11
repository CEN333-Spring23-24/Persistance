export class Car {
  id: number;
  make: string;
  model: string;
  year: number;

  constructor(id: number, make: string, model: string, year: number) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

//let myCar = new Car(1,"Nissan","Altima", 2012);
// myCar.make
