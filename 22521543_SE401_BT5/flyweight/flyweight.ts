class Team {
  private name: string;
  private logo: string;
  private color: string;

  constructor(name: string, logo: string, color: string) {
    this.name = name;
    this.logo = logo;
    this.color = color;
  }

  public getInfo(): string {
    return `Team: ${this.name}, Logo: ${this.logo}, Color: ${this.color}`;
  }
}

class Player {
  private name: string;
  private position: string;
  private num_shirts: number;
  private team: Team;

  constructor(name: string, position: string, num_shirts: number, team: Team) {
    this.name = name;
    this.position = position;
    this.num_shirts = num_shirts;
    this.team = team;
  }

  public getInfo(): string {
    return `Player: ${this.name}, Position: ${
      this.position
    }, Number of Shirts: ${this.num_shirts}, Team: ${this.team.getInfo()}`;
  }
}

// Manage and provide Team objects if they are already created then reuse them
class PlayerFactory {
  private static teams: { [key: string]: Team } = {};

  public static getTeam(name: string, logo: string, color: string): Team {
    const key = `${name}-${logo}-${color}`;
    if (!this.teams[key]) {
      this.teams[key] = new Team(name, logo, color);
    }
    return this.teams[key];
  }
}

// Create teams using the factory
const team1 = PlayerFactory.getTeam("Team A", "logoA.png", "Red");
const team2 = PlayerFactory.getTeam("Team B", "logoB.png", "Blue");
const team3 = PlayerFactory.getTeam("Team C", "logoC.png", "Green");
const team4 = PlayerFactory.getTeam("Team D", "logoD.png", "Yellow");
const team5 = PlayerFactory.getTeam("Team E", "logoE.png", "Purple");

// Create players using the factory
const player1 = new Player("Player 1", "Forward", 5, team1);
const player2 = new Player("Player 2", "Midfielder", 3, team2);
const player3 = new Player("Player 3", "Defender", 4, team3);
const player4 = new Player("Player 4", "Goalkeeper", 2, team4);
const player5 = new Player("Player 5", "Striker", 6, team5);
const player6 = new Player("Player 1", "Forward", 5, team1);
const player7 = new Player("Player 2", "Midfielder", 3, team2);
const player8 = new Player("Player 3", "Defender", 4, team3);
const player9 = new Player("Player 4", "Goalkeeper", 2, team4);

// Display player information
console.log(player1.getInfo());
console.log(player2.getInfo());
console.log(player3.getInfo());
console.log(player4.getInfo());
console.log(player5.getInfo());
console.log(player6.getInfo());
console.log(player7.getInfo());
console.log(player8.getInfo());
console.log(player9.getInfo());
