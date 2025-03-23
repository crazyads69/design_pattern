// Define Component interface for composite pattern
interface MedicalService {
  getDescription(): string;
  getCost(): number;
}

// Define Leaf class for composite pattern
class Consultation implements MedicalService {
  getDescription(): string {
    return "Consultation";
  }

  getCost(): number {
    return 100;
  }
}

class XRay implements MedicalService {
  getDescription(): string {
    return "X-Ray";
  }

  getCost(): number {
    return 150;
  }
}

class Surgery implements MedicalService {
  getDescription(): string {
    return "Surgery";
  }

  getCost(): number {
    return 500;
  }
}

// Define Composite class for composite pattern
class CompositeMedicalService implements MedicalService {
  private services: MedicalService[] = [];

  addService(service: MedicalService) {
    this.services.push(service);
  }

  removeService(service: MedicalService) {
    const index = this.services.indexOf(service);
    if (index > -1) {
      this.services.splice(index, 1);
    }
  }

  getDescription(): string {
    return this.services.map((service) => service.getDescription()).join(", ");
  }

  getCost(): number {
    return this.services.reduce((acc, service) => acc + service.getCost(), 0);
  }
}

// Usage
const consultation = new Consultation();
const xRay = new XRay();
const surgery = new Surgery();

const compositeService = new CompositeMedicalService();
compositeService.addService(consultation);
compositeService.addService(xRay);
compositeService.addService(surgery);

// Output
console.log(compositeService.getDescription()); // Consultation, X-Ray, Surgery
console.log(compositeService.getCost()); // 750
