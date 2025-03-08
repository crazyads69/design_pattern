// Define abstract product interface
interface AbstractCar {
  engine: string;
  seat: number;
  size: string;
  displayInfo(): void;
}

// Define concrete product classes for European region
class XeSedanEuropean implements AbstractCar {
  engine = "1.5L Diesel";
  seat = 5;
  size = "4.7m";

  displayInfo(): void {
    console.log("Xe Sedan (Châu Âu):", this.engine, this.seat, this.size);
  }
}

class XeSUVEuropean implements AbstractCar {
  engine = "2.0L Diesel";
  seat = 7;
  size = "5.0m";

  displayInfo(): void {
    console.log("Xe SUV (Châu Âu):", this.engine, this.seat, this.size);
  }
}

class XeDienEuropean implements AbstractCar {
  engine = "Electric - High Performance";
  seat = 5;
  size = "4.6m";

  displayInfo(): void {
    console.log("Xe Điện (Châu Âu):", this.engine, this.seat, this.size);
  }
}

// Define concrete product classes for Asian region
class XeSedanAsian implements AbstractCar {
  engine = "1.5L Hybrid";
  seat = 5;
  size = "4.5m";

  displayInfo(): void {
    console.log("Xe Sedan (Châu Á):", this.engine, this.seat, this.size);
  }
}

class XeSUVAsian implements AbstractCar {
  engine = "2.0L Petrol";
  seat = 7;
  size = "4.9m";

  displayInfo(): void {
    console.log("Xe SUV (Châu Á):", this.engine, this.seat, this.size);
  }
}

class XeDienAsian implements AbstractCar {
  engine = "Electric - Eco Friendly";
  seat = 5;
  size = "4.4m";

  displayInfo(): void {
    console.log("Xe Điện (Châu Á):", this.engine, this.seat, this.size);
  }
}

// Define multiple related product for each region e.g. Sedan, SUV, Electric

// Define abstract factory interface
interface AbstractCarFactory {
  createSedan(): AbstractCar;
  createSUV(): AbstractCar;
  createElectric(): AbstractCar;
}

// Define concrete factory for European region
class EuropeanCarFactory implements AbstractCarFactory {
  createSedan(): AbstractCar {
    return new XeSedanEuropean();
  }
  createSUV(): AbstractCar {
    return new XeSUVEuropean();
  }
  createElectric(): AbstractCar {
    return new XeDienEuropean();
  }
}

// Define concrete factory for Asian region
class AsianCarFactory implements AbstractCarFactory {
  createSedan(): AbstractCar {
    return new XeSedanAsian();
  }
  createSUV(): AbstractCar {
    return new XeSUVAsian();
  }
  createElectric(): AbstractCar {
    return new XeDienAsian();
  }
}

// Define client class using abstract factory for creating products without specifying their concrete classes
class CarClient {
  private factory: AbstractCarFactory;

  constructor(factory: AbstractCarFactory) {
    this.factory = factory;
  }

  getSedan(): AbstractCar {
    return this.factory.createSedan();
  }

  getSUV(): AbstractCar {
    return this.factory.createSUV();
  }

  getElectric(): AbstractCar {
    return this.factory.createElectric();
  }
}

// Usage
// Use European car factory to create products for European region
const europeanFactory = new EuropeanCarFactory();
const europeanClient = new CarClient(europeanFactory);

const europeanSedan = europeanClient.getSedan();
europeanSedan.displayInfo();

const europeanSUV = europeanClient.getSUV();
europeanSUV.displayInfo();

const europeanElectric = europeanClient.getElectric();
europeanElectric.displayInfo();

// Use Asian car factory to create products for Asian region
const asianFactory = new AsianCarFactory();
const asianClient = new CarClient(asianFactory);

const asianSedan = asianClient.getSedan();
asianSedan.displayInfo();

const asianSUV = asianClient.getSUV();
asianSUV.displayInfo();

const asianElectric = asianClient.getElectric();
asianElectric.displayInfo();
