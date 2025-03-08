// Define product interface
interface AbstractDish {
  prepare(): void;
  cook(): void;
  serve(): void;
}

// Define concrete product classes that implement the product interface
class Pizza implements AbstractDish {
  prepare(): void {
    console.log("Chuẩn bị nguyên liệu cho Pizza");
  }
  cook(): void {
    console.log("Nướng Pizza trong lò");
  }
  serve(): void {
    console.log("Phục vụ Pizza");
  }
}

class Burger implements AbstractDish {
  prepare(): void {
    console.log("Chuẩn bị nguyên liệu cho Burger");
  }
  cook(): void {
    console.log("Nướng Burger trên bếp");
  }
  serve(): void {
    console.log("Phục vụ Burger");
  }
}

class Pasta implements AbstractDish {
  prepare(): void {
    console.log("Chuẩn bị nguyên liệu cho Pasta");
  }
  cook(): void {
    console.log("Nấu Pasta trong nồi");
  }
  serve(): void {
    console.log("Phục vụ Pasta");
  }
}

// Define Creator class (abstract or interface) that declares the factory method
abstract class DishCreator {
  // Factory Method: used to create product object
  abstract createDish(): AbstractDish;

  // Template Method: used to prepare, cook and serve the product
  orderDish(): AbstractDish {
    const dish = this.createDish();
    dish.prepare();
    dish.cook();
    dish.serve();
    return dish;
  }
}

// Define concrete creator classes that implement the creator interface
class PizzaCreator extends DishCreator {
  createDish(): AbstractDish {
    return new Pizza();
  }
}

class BurgerCreator extends DishCreator {
  createDish(): AbstractDish {
    return new Burger();
  }
}

class PastaCreator extends DishCreator {
  createDish(): AbstractDish {
    return new Pasta();
  }
}

// Define client code that uses the factory method to create products
class ClientOrder {
  private creator: DishCreator;

  constructor(creator: DishCreator) {
    this.creator = creator;
  }

  orderDish(): AbstractDish {
    return this.creator.orderDish();
  }
}

// Usage
const pizzaCreator = new PizzaCreator();
const burgerCreator = new BurgerCreator();
const pastaCreator = new PastaCreator();

const client1 = new ClientOrder(pizzaCreator);
client1.orderDish();

const client2 = new ClientOrder(burgerCreator);
client2.orderDish();

const client3 = new ClientOrder(pastaCreator);
client3.orderDish();
