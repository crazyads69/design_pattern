// Define DietPlan interface
interface DietPlan {
  proteins: string[];
  carbohydrates: string[];
  vegetables: string[];
  drinks: string[];
}

// Define DietPlanBuilder interface
interface DietPlanBuilder {
  reset(): void;
  addProtein(protein: string): this;
  addCarbohydrate(carbohydrate: string): this;
  addVegetable(vegetable: string): this;
  addDrink(drink: string): this;
  build(): DietPlan;
}

// Define MealPlanBuilder class implementing DietPlanBuilder interface
class MealPlanBuilder implements DietPlanBuilder {
  // Define private properties
  private dietPlan!: DietPlan;

  // Define constructor
  constructor() {
    this.reset();
  }

  // Define reset method to reset the diet plan
  public reset(): void {
    this.dietPlan = {
      proteins: [],
      carbohydrates: [],
      vegetables: [],
      drinks: [],
    };
  }

  // Define addProtein method to add protein
  public addProtein(protein: string): this {
    this.dietPlan.proteins.push(protein);
    return this;
  }

  // Define addCarbohydrate method to add carbohydrate
  public addCarbohydrate(carbohydrate: string): this {
    this.dietPlan.carbohydrates.push(carbohydrate);
    return this;
  }

  // Define addVegetable method to add vegetable
  public addVegetable(vegetable: string): this {
    this.dietPlan.vegetables.push(vegetable);
    return this;
  }

  // Define addDrink method to add drink
  public addDrink(drink: string): this {
    this.dietPlan.drinks.push(drink);
    return this;
  }

  // Define build method to build the diet plan
  public build(): DietPlan {
    if (
      this.dietPlan.proteins.length === 0 ||
      this.dietPlan.carbohydrates.length === 0 ||
      this.dietPlan.vegetables.length === 0
    ) {
      throw new Error(
        "Chế độ ăn phải có ít nhất một nguồn Protein, một nguồn Carbohydrate và một loại Rau củ quả."
      );
    }
    const result = this.dietPlan;
    this.reset();
    return result;
  }
}

// Define DietPlanDirector class that constructs the DietPlan object using DietPlanBuilder
class DietPlanDirector {
  // Define private property
  private dietPlanBuilder!: DietPlanBuilder;

  // Define constructor
  constructor(dietPlanBuilder: DietPlanBuilder) {
    this.dietPlanBuilder = dietPlanBuilder;
  }

  // Define createMediterraneanDiet method to create Mediterranean diet
  public createMediterraneanDiet(): DietPlan {
    return this.dietPlanBuilder
      .addProtein("Thịt cá")
      .addCarbohydrate("Bánh mì nguyên cám")
      .addVegetable("Rau quả tươi")
      .addDrink("Rượu vang đỏ")
      .build();
  }

  // Define createDASHDiet method to create DASH diet
  public createDASHDiet(): DietPlan {
    return this.dietPlanBuilder
      .addProtein("Thịt gà")
      .addCarbohydrate("Gạo lứt")
      .addVegetable("Rau xanh")
      .addDrink("Nước ép trái cây")
      .build();
  }

  // Define createVegetarianDiet method to create Vegetarian diet
  public createVegetarianDiet(): DietPlan {
    return this.dietPlanBuilder
      .addProtein("Đậu hũ")
      .addCarbohydrate("Khoai tây")
      .addVegetable("Rau củ hỗn hợp")
      .addDrink("Nước lọc")
      .build();
  }
}

// Usage

// Create MealPlanBuilder instance
const mealPlanBuilder = new MealPlanBuilder();

// Create DietPlanDirector instance
const dietPlanDirector = new DietPlanDirector(mealPlanBuilder);

// Create Mediterranean diet
const mediterraneanDiet = dietPlanDirector.createMediterraneanDiet();
console.log("Mediterranean Diet:");
console.log(mediterraneanDiet);

// Create DASH diet
const dashDiet = dietPlanDirector.createDASHDiet();
console.log("DASH Diet:");
console.log(dashDiet);

// Create Vegetarian diet
const vegetarianDiet = dietPlanDirector.createVegetarianDiet();
console.log("Vegetarian Diet:");
console.log(vegetarianDiet);
