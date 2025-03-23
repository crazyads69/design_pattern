// Define Component interface for decorator pattern
interface Soldier {
  getItem(): string;
}

// Define ConcreteComponent Class
class BasicSoldier implements Soldier {
  getItem(): string {
    return "Lính cơ bản";
  }
}

// Define Decorator Class
abstract class SoldierDecorator implements Soldier {
  protected soldier: Soldier;

  constructor(soldier: Soldier) {
    this.soldier = soldier;
  }

  getItem(): string {
    return this.soldier.getItem();
  }
}

// Define ConcreteDecorator Class
class RankDecorator extends SoldierDecorator {
  protected rank: string;

  constructor(soldier: Soldier, rank: string) {
    super(soldier);
    this.rank = rank;
  }

  getItem(): string {
    return `${super.getItem()} với quân hàm ${this.rank}`;
  }
}

class WeaponDecorator extends SoldierDecorator {
  protected weapon: string;

  constructor(soldier: Soldier, weapon: string) {
    super(soldier);
    this.weapon = weapon;
  }

  getItem(): string {
    return `${super.getItem()} với vũ khí ${this.weapon}`;
  }
}

class UniformDecorator extends SoldierDecorator {
  protected uniform: string;

  constructor(soldier: Soldier, uniform: string) {
    super(soldier);
    this.uniform = uniform;
  }

  getItem(): string {
    return `${super.getItem()} với quân trang ${this.uniform}`;
  }
}

class SkillDecorator extends SoldierDecorator {
  protected skill: string;

  constructor(soldier: Soldier, skill: string) {
    super(soldier);
    this.skill = skill;
  }

  getItem(): string {
    return `${super.getItem()} với kỹ năng ${this.skill}`;
  }
}

// Usage

let soldier = new BasicSoldier();
console.log(soldier.getItem());

soldier = new RankDecorator(soldier, "Binh nhì");
console.log(soldier.getItem());

soldier = new UniformDecorator(soldier, "Balo, quần áo, nón");
console.log(soldier.getItem());

soldier = new WeaponDecorator(soldier, "Súng");
console.log(soldier.getItem());

soldier = new SkillDecorator(soldier, "Bắn súng");
console.log(soldier.getItem());
