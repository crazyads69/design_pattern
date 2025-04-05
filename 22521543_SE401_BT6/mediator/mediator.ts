class TrafficLight {
  private direction: string;
  private color: string;

  constructor(direction: string, color: string) {
    this.direction = direction;
    this.color = color;
  }

  turnGreen(): void {
    this.color = "green";
  }

  turnRed(): void {
    this.color = "red";
  }

  turnYellow(): void {
    this.color = "yellow";
  }

  getDirection(): string {
    return this.direction;
  }

  getColor(): string {
    return this.color;
  }
}

class TrafficMediator {
  private trafficLights: TrafficLight[] = [];

  registerTrafficLight(trafficLight: TrafficLight): void {
    this.trafficLights.push(trafficLight);
  }

  changeLight(light: TrafficLight, color: string): void {
    if (color === "green") {
      light.turnGreen();

      this.trafficLights.forEach((tl) => {
        if (tl !== light) {
          tl.turnRed();
        }
      });
    } else if (color === "yellow") {
      light.turnYellow();
    } else if (color === "red") {
      light.turnRed();
    }
  }
}

const mediator = new TrafficMediator();

const northLight = new TrafficLight("North", "red");
const southLight = new TrafficLight("South", "red");
const eastLight = new TrafficLight("East", "red");
const westLight = new TrafficLight("West", "red");

mediator.registerTrafficLight(northLight);
mediator.registerTrafficLight(southLight);
mediator.registerTrafficLight(eastLight);
mediator.registerTrafficLight(westLight);

mediator.changeLight(northLight, "green");

console.log(`North light: ${northLight.getColor()}`);
console.log(`South light: ${southLight.getColor()}`);
console.log(`East light: ${eastLight.getColor()}`);
console.log(`West light: ${westLight.getColor()}`);
