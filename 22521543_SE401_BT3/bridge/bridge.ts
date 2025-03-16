// Define IrrigationSystem interface
interface IrrigationSystem {
  waterPlants(): void;
  getName(): string;
  adjustWaterFlow(flowRate: number): void;
}

// Define DripIrrigation class implementing IrrigationSystem interface
class DripIrrigation implements IrrigationSystem {
  private flowRate: number = 5; // Đơn vị: lít/phút

  // Define waterPlants method
  waterPlants(): void {
    console.log(
      `Watering plants using drip irrigation with flow rate: ${this.flowRate} L/min`
    );
  }

  getName(): string {
    return "Drip Irrigation";
  }

  adjustWaterFlow(flowRate: number): void {
    this.flowRate = flowRate;
    console.log(`Adjusted drip irrigation flow rate to ${this.flowRate} L/min`);
  }
}

// Define SprinklerIrrigation class implementing IrrigationSystem interface
class SprinklerIrrigation implements IrrigationSystem {
  private flowRate: number = 20; // Đơn vị: lít/phút
  private coverageRadius: number = 5; // Đơn vị: mét

  // Define waterPlants method
  waterPlants(): void {
    console.log(
      `Watering plants using sprinkler irrigation with flow rate: ${this.flowRate} L/min and coverage radius: ${this.coverageRadius}m`
    );
  }

  getName(): string {
    return "Sprinkler Irrigation";
  }

  adjustWaterFlow(flowRate: number): void {
    this.flowRate = flowRate;
    console.log(
      `Adjusted sprinkler irrigation flow rate to ${this.flowRate} L/min`
    );
  }

  setCoverageRadius(radius: number): void {
    this.coverageRadius = radius;
    console.log(`Set sprinkler coverage radius to ${this.coverageRadius}m`);
  }
}

// Define ManualIrrigation class implementing IrrigationSystem interface
class ManualIrrigation implements IrrigationSystem {
  private flowRate: number = 10; // Đơn vị: lít/phút

  // Define waterPlants method
  waterPlants(): void {
    console.log(
      `Watering plants manually with flow rate: ${this.flowRate} L/min`
    );
  }

  getName(): string {
    return "Manual Irrigation";
  }

  adjustWaterFlow(flowRate: number): void {
    this.flowRate = flowRate;
    console.log(
      `Adjusted manual irrigation flow rate to ${this.flowRate} L/min`
    );
  }
}

// Define ControlSystem interface
interface ControlSystem {
  control(irrigationSystem: IrrigationSystem): void;
  getName(): string;
}

// Define ManualControl class implementing ControlSystem interface
class ManualControl implements ControlSystem {
  private operator: string = "Default Operator";

  // Define control method
  control(irrigationSystem: IrrigationSystem): void {
    console.log(
      `Controlling ${irrigationSystem.getName()} manually by ${this.operator}`
    );
    irrigationSystem.waterPlants();
  }

  getName(): string {
    return "Manual Control";
  }

  setOperator(name: string): void {
    this.operator = name;
    console.log(`Set operator to ${this.operator}`);
  }
}

// Define AutomaticControl class implementing ControlSystem interface
class AutomaticControl implements ControlSystem {
  private schedule: string = "Daily at 6:00 AM";
  private duration: number = 30;

  // Define control method
  control(irrigationSystem: IrrigationSystem): void {
    console.log(
      `Controlling ${irrigationSystem.getName()} automatically on schedule: ${
        this.schedule
      } for ${this.duration} minutes`
    );
    irrigationSystem.waterPlants();
  }

  getName(): string {
    return "Automatic Control";
  }

  setSchedule(schedule: string): void {
    this.schedule = schedule;
    console.log(`Set watering schedule to ${this.schedule}`);
  }

  setDuration(minutes: number): void {
    this.duration = minutes;
    console.log(`Set watering duration to ${this.duration} minutes`);
  }
}

// Define Bridge between ControlSystem and IrrigationSystem using abstraction
abstract class IrrigationController {
  protected controlSystem: ControlSystem;
  protected irrigationSystem: IrrigationSystem;

  constructor(
    controlSystem: ControlSystem,
    irrigationSystem: IrrigationSystem
  ) {
    this.controlSystem = controlSystem;
    this.irrigationSystem = irrigationSystem;
  }

  // Define setter to change irrigation system
  setIrrigationSystem(irrigationSystem: IrrigationSystem): void {
    this.irrigationSystem = irrigationSystem;
    console.log(`Changed irrigation system to ${irrigationSystem.getName()}`);
  }

  // Define setter to change control system
  setControlSystem(controlSystem: ControlSystem): void {
    this.controlSystem = controlSystem;
    console.log(`Changed control system to ${controlSystem.getName()}`);
  }

  abstract operate(): void;
}

// Define concrete class implementing IrrigationController
class FarmIrrigationController extends IrrigationController {
  private farmName: string;
  private farmSize: number; // Đơn vị: hecta

  constructor(
    farmName: string,
    farmSize: number,
    irrigationSystem: IrrigationSystem,
    controlSystem: ControlSystem
  ) {
    super(controlSystem, irrigationSystem);
    this.farmName = farmName;
    this.farmSize = farmSize;
  }

  operate(): void {
    console.log(
      `Starting irrigation at ${this.farmName} farm (${this.farmSize} hectares):`
    );
    this.controlSystem.control(this.irrigationSystem);
  }

  getFarmInfo(): string {
    return `Farm: ${this.farmName}, Size: ${
      this.farmSize
    } hectares, Irrigation: ${this.irrigationSystem.getName()}, Control: ${this.controlSystem.getName()}`;
  }
}

// Usage
class Client {
  useIrrigationController(irrigationController: IrrigationController): void {
    irrigationController.operate();
    console.log("\n");
  }

  main(): void {
    // Initialize different irrigation systems
    const dripIrrigation = new DripIrrigation();
    const sprinklerIrrigation = new SprinklerIrrigation();
    const manualIrrigation = new ManualIrrigation();

    // Initialize different control systems
    const manualControl = new ManualControl();
    const automaticControl = new AutomaticControl();

    // Set up control system configurations
    sprinklerIrrigation.setCoverageRadius(8);
    automaticControl.setSchedule("Twice daily at 6:00 AM and 6:00 PM");
    automaticControl.setDuration(45);
    manualControl.setOperator("John Doe");

    // Initialize different farm configurations
    const smallFarm = new FarmIrrigationController(
      "Vegetable Garden",
      2.5,
      dripIrrigation,
      manualControl
    );

    const mediumFarm = new FarmIrrigationController(
      "Fruit Orchard",
      10.0,
      sprinklerIrrigation,
      automaticControl
    );

    const largeFarm = new FarmIrrigationController(
      "Rice Field",
      50.0,
      manualIrrigation,
      automaticControl
    );

    // Test different farm irrigation configurations
    console.log("=== Testing Different Farm Irrigation Configurations ===\n");

    console.log("1. Small farm with drip irrigation and manual control:");
    this.useIrrigationController(smallFarm);

    console.log(
      "2. Medium farm with sprinkler irrigation and automatic control:"
    );
    this.useIrrigationController(mediumFarm);

    console.log("3. Large farm with manual irrigation and automatic control:");
    this.useIrrigationController(largeFarm);

    // Test dynamic system change
    console.log("=== Testing Dynamic System Change ===\n");

    console.log("Changing small farm's irrigation system to sprinkler:");
    smallFarm.setIrrigationSystem(sprinklerIrrigation);
    this.useIrrigationController(smallFarm);

    console.log("Changing medium farm's control system to manual:");
    mediumFarm.setControlSystem(manualControl);
    this.useIrrigationController(mediumFarm);

    console.log("=== Farm Information ===");
    console.log(smallFarm.getFarmInfo());
    console.log(mediumFarm.getFarmInfo());
    console.log(largeFarm.getFarmInfo());
  }
}

// Run
const client = new Client();
client.main();
