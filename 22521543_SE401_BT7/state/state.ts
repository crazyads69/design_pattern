// Define the base State interface
interface State {
  getNextStates(): State[];
  getName(): string;
  performAction(lawsuit: Lawsuit): void;
}

class Lawsuit {
  private currentState: State;
  private caseNumber: string;
  private description: string;

  constructor(caseNumber: string, description: string, initialState: State) {
    this.caseNumber = caseNumber;
    this.description = description;
    this.currentState = initialState;
    console.log(
      `Lawsuit #${
        this.caseNumber
      } created in state: ${this.currentState.getName()}`
    );
  }

  setState(state: State): void {
    console.log(
      `Changing state from ${this.currentState.getName()} to ${state.getName()}`
    );
    this.currentState = state;
  }

  nextState(): void {
    const possibleNextStates = this.currentState.getNextStates();

    if (possibleNextStates.length === 0) {
      console.log("No next states available. Lawsuit may be in final state.");
      return;
    }

    this.setState(possibleNextStates[0]);
    this.currentState.performAction(this);
  }

  getCurrentState(): State {
    return this.currentState;
  }

  getCaseNumber(): string {
    return this.caseNumber;
  }

  getDescription(): string {
    return this.description;
  }
}

class FilingState implements State {
  private static instance: FilingState;

  private constructor() {}

  public static getInstance(): FilingState {
    if (!FilingState.instance) {
      FilingState.instance = new FilingState();
    }
    return FilingState.instance;
  }

  getName(): string {
    return "Khởi Kiện";
  }

  getNextStates(): State[] {
    return [TrialState.getInstance()];
  }

  performAction(lawsuit: Lawsuit): void {
    console.log(
      `Processing filing documents for case #${lawsuit.getCaseNumber()}`
    );
  }
}

class TrialState implements State {
  private static instance: TrialState;

  private constructor() {}

  public static getInstance(): TrialState {
    if (!TrialState.instance) {
      TrialState.instance = new TrialState();
    }
    return TrialState.instance;
  }

  getName(): string {
    return "Đang Xét Xử";
  }

  getNextStates(): State[] {
    return [AwaitingJudgmentState.getInstance()];
  }

  performAction(lawsuit: Lawsuit): void {
    console.log(`Trial in progress for case #${lawsuit.getCaseNumber()}`);
  }
}

class AwaitingJudgmentState implements State {
  private static instance: AwaitingJudgmentState;

  private constructor() {}

  public static getInstance(): AwaitingJudgmentState {
    if (!AwaitingJudgmentState.instance) {
      AwaitingJudgmentState.instance = new AwaitingJudgmentState();
    }
    return AwaitingJudgmentState.instance;
  }

  getName(): string {
    return "Chờ Phán Quyết";
  }

  getNextStates(): State[] {
    return [ClosedState.getInstance()];
  }

  performAction(lawsuit: Lawsuit): void {
    console.log(`Awaiting judgment for case #${lawsuit.getCaseNumber()}`);
  }
}

class ClosedState implements State {
  private static instance: ClosedState;

  private constructor() {}

  public static getInstance(): ClosedState {
    if (!ClosedState.instance) {
      ClosedState.instance = new ClosedState();
    }
    return ClosedState.instance;
  }

  getName(): string {
    return "Đã Hoàn Tất";
  }

  getNextStates(): State[] {
    return [];
  }

  performAction(lawsuit: Lawsuit): void {
    console.log(`Case #${lawsuit.getCaseNumber()} has been closed`);
  }
}

// Usage

const lawsuit = new Lawsuit(
  "2025-042",
  "Property dispute case",
  FilingState.getInstance()
);

lawsuit.getCurrentState().performAction(lawsuit);

console.log("\n--- Moving to next state ---");
lawsuit.nextState();

console.log("\n--- Moving to next state ---");
lawsuit.nextState();

console.log("\n--- Moving to next state ---");
lawsuit.nextState();

console.log("\n--- Attempting to move from final state ---");
lawsuit.nextState();
