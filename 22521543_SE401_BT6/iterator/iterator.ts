class Vehicle {
  private vehicleId: number;
  private type: string;
  private licensePlate: string;
  private capacity: number;
  private manufacturer: string;

  constructor(
    vehicleId: number,
    type: string,
    licensePlate: string,
    capacity: number,
    manufacturer: string
  ) {
    this.vehicleId = vehicleId;
    this.type = type;
    this.licensePlate = licensePlate;
    this.capacity = capacity;
    this.manufacturer = manufacturer;
  }

  getVehicleId(): number {
    return this.vehicleId;
  }

  getType(): string {
    return this.type;
  }
  getLicensePlate(): string {
    return this.licensePlate;
  }

  getCapacity(): number {
    return this.capacity;
  }
  getManufacturer(): string {
    return this.manufacturer;
  }
}

interface VehicleIterator {
  next(): Vehicle | null;
  hasNext(): boolean;
}

class BusIterator implements VehicleIterator {
  private buses: Vehicle[];
  private index: number = 0;

  constructor(buses: Vehicle[]) {
    this.buses = buses;
  }

  next(): Vehicle | null {
    if (this.hasNext()) {
      return this.buses[this.index++];
    }
    return null;
  }

  hasNext(): boolean {
    return this.index < this.buses.length;
  }
}

class TruckIterator implements VehicleIterator {
  private trucks: Vehicle[];
  private index: number = 0;

  constructor(trucks: Vehicle[]) {
    this.trucks = trucks;
  }

  next(): Vehicle | null {
    while (this.index < this.trucks.length) {
      const truck = this.trucks[this.index++];
      if (truck.getCapacity() > 1000) {
        return truck;
      }
    }
    return null;
  }

  hasNext(): boolean {
    // Check if there are more trucks with capacity greater than 1000
    while (this.index < this.trucks.length) {
      if (this.trucks[this.index].getCapacity() > 1000) {
        return true;
      }
      this.index++;
    }
    return false;
  }
}

class CarIterator implements VehicleIterator {
  private cars: Vehicle[];
  private index: number = 0;

  constructor(cars: Vehicle[]) {
    this.cars = [...cars].sort((a, b) =>
      a.getManufacturer().localeCompare(b.getManufacturer())
    );
  }

  next(): Vehicle | null {
    if (this.hasNext()) {
      return this.cars[this.index++];
    }
    return null;
  }

  hasNext(): boolean {
    return this.index < this.cars.length;
  }
}

interface VehicleCollection {
  createIterator(): VehicleIterator;
}

class BusCollection implements VehicleCollection {
  private buses: Vehicle[] = [];

  addBus(bus: Vehicle) {
    this.buses.push(bus);
  }

  getBuses(): Vehicle[] {
    return this.buses;
  }

  createIterator(): VehicleIterator {
    return new BusIterator(this.buses);
  }
}

class TruckCollection implements VehicleCollection {
  private trucks: Vehicle[] = [];

  addTruck(truck: Vehicle) {
    this.trucks.push(truck);
  }

  getTrucks(): Vehicle[] {
    return this.trucks;
  }

  createIterator(): VehicleIterator {
    return new TruckIterator(this.trucks);
  }
}

class CarCollection implements VehicleCollection {
  private cars: Vehicle[] = [];

  addCar(car: Vehicle) {
    this.cars.push(car);
  }

  getCars(): Vehicle[] {
    return this.cars;
  }

  createIterator(): VehicleIterator {
    return new CarIterator(this.cars);
  }
}

// TrafficManager class to manage the collections of vehicles and use the iterators to iterate through them
class TrafficManager {
  private busCollection: BusCollection;
  private truckCollection: TruckCollection;
  private carCollection: CarCollection;

  constructor() {
    this.busCollection = new BusCollection();
    this.truckCollection = new TruckCollection();
    this.carCollection = new CarCollection();
  }

  addBus(bus: Vehicle) {
    this.busCollection.addBus(bus);
  }

  addTruck(truck: Vehicle) {
    this.truckCollection.addTruck(truck);
  }

  addCar(car: Vehicle) {
    this.carCollection.addCar(car);
  }

  displayBuses() {
    const busIterator = this.busCollection.createIterator();
    while (busIterator.hasNext()) {
      const bus = busIterator.next();
      if (bus) {
        console.log(bus);
      }
    }
  }

  displayTrucks() {
    const truckIterator = this.truckCollection.createIterator();
    while (truckIterator.hasNext()) {
      const truck = truckIterator.next();
      if (truck) {
        console.log(truck);
      }
    }
  }

  displayCars() {
    const carIterator = this.carCollection.createIterator();
    while (carIterator.hasNext()) {
      const car = carIterator.next();
      if (car) {
        console.log(car);
      }
    }
  }
}

// Usage
// Sample Vehicles
const bus1 = new Vehicle(1, "Bus", "BUS123", 50, "Volvo");
const bus2 = new Vehicle(2, "Bus", "BUS456", 55, "Mercedes");

const truck1 = new Vehicle(3, "Truck", "TRK789", 800, "MAN");
const truck2 = new Vehicle(4, "Truck", "TRK101", 1500, "Scania");
const truck3 = new Vehicle(5, "Truck", "TRK202", 1200, "Iveco");

const car1 = new Vehicle(6, "Car", "CAR303", 4, "Toyota");
const car2 = new Vehicle(7, "Car", "CAR404", 4, "BMW");
const car3 = new Vehicle(8, "Car", "CAR505", 4, "Audi");

const trafficManager = new TrafficManager();

trafficManager.addBus(bus1);
trafficManager.addBus(bus2);

trafficManager.addTruck(truck1);
trafficManager.addTruck(truck2);
trafficManager.addTruck(truck3);

trafficManager.addCar(car1);
trafficManager.addCar(car2);
trafficManager.addCar(car3);

console.log("Displaying Buses:");
trafficManager.displayBuses();

console.log("\nDisplaying Trucks (only trucks with capacity > 1000):");
trafficManager.displayTrucks();

console.log("\nDisplaying Cars (sorted by manufacturer):");
trafficManager.displayCars();
