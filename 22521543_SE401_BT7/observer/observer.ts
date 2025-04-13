class Order {
  private status: string;
  private customers: Customer[] = [];
  constructor() {
    this.status = "pending";
    this.customers = [];
  }

  public registerCustomer(customer: Customer) {
    this.customers.push(customer);
  }

  public removeCustomer(customer: Customer) {
    this.customers = this.customers.filter((c) => c !== customer);
  }

  public notifyCustomers() {
    this.customers.forEach((customer) => {
      customer.update(this.status);
    });
  }

  public updateStatus(newStatus: string) {
    this.status = newStatus;
    this.notifyCustomers();
  }
}

class Customer {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  public update(status: string) {
    console.log(`Customer ${this.name} notified of order status: ${status}`);
  }

  public displayStatus() {
    console.log(`Customer ${this.name} is notified of order status.`);
  }
}

// Usage
const order = new Order();
const customer1 = new Customer("Alice");
const customer2 = new Customer("Bob");
order.registerCustomer(customer1);
order.registerCustomer(customer2);
order.updateStatus("prepared");
order.updateStatus("pending");
order.removeCustomer(customer1);
order.updateStatus("delivering");
order.updateStatus("completed");
