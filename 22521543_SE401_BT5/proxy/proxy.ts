class ClothingImage {
  private name: string;
  private size: string;

  constructor(name: string, size: string) {
    this.name = name;
    this.size = size;
  }

  public displayImage(): void {
    console.log(`Displaying image: ${this.name} of size: ${this.size}`);
  }
}

class ProxyClothingImage {
  private realImage: ClothingImage | null = null;
  private name: string;
  private size: string;
  private imageList: ClothingImage[] = [];

  constructor(name: string, size: string) {
    this.name = name;
    this.size = size;
  }

  public displayImage(): void {
    // Delay the creation of the real image until it's needed
    if (this.realImage === null) {
      this.realImage = new ClothingImage(this.name, this.size);
    }
    this.realImage.displayImage();
  }
}

class ClothingItem {
  private name: string;
  private price: number;
  private image: ProxyClothingImage;

  constructor(name: string, price: number, image: ProxyClothingImage) {
    this.name = name;
    this.price = price;
    this.image = image;
  }

  public displayItem(): void {
    console.log(`Item: ${this.name}, Price: ${this.price}`);
    this.image.displayImage();
  }
}

// Create a list of clothing items
const clothingItems: ClothingItem[] = [];

// Create proxy images
const proxyImage1 = new ProxyClothingImage("shirt.jpg", "M");
const proxyImage2 = new ProxyClothingImage("pants.jpg", "L");
const proxyImage3 = new ProxyClothingImage("shoes.jpg", "10");
const proxyImage4 = new ProxyClothingImage("hat.jpg", "S");
const proxyImage5 = new ProxyClothingImage("jacket.jpg", "XL");
const proxyImage6 = new ProxyClothingImage("socks.jpg", "M");
const proxyImage7 = new ProxyClothingImage("scarf.jpg", "L");
const proxyImage8 = new ProxyClothingImage("gloves.jpg", "M");
const proxyImage9 = new ProxyClothingImage("belt.jpg", "M");
const proxyImage10 = new ProxyClothingImage("sweater.jpg", "L");

// Create clothing items with proxy images
const item1 = new ClothingItem("Shirt", 20, proxyImage1);
const item2 = new ClothingItem("Pants", 30, proxyImage2);
const item3 = new ClothingItem("Shoes", 50, proxyImage3);
const item4 = new ClothingItem("Hat", 15, proxyImage4);
const item5 = new ClothingItem("Jacket", 80, proxyImage5);
const item6 = new ClothingItem("Socks", 5, proxyImage6);
const item7 = new ClothingItem("Scarf", 10, proxyImage7);
const item8 = new ClothingItem("Gloves", 12, proxyImage8);
const item9 = new ClothingItem("Belt", 25, proxyImage9);
const item10 = new ClothingItem("Sweater", 40, proxyImage10);

// Add clothing items to the list
clothingItems.push(item1);
clothingItems.push(item2);
clothingItems.push(item3);
clothingItems.push(item4);
clothingItems.push(item5);
clothingItems.push(item6);
clothingItems.push(item7);
clothingItems.push(item8);
clothingItems.push(item9);
clothingItems.push(item10);

// Display all clothing items
clothingItems.forEach((item) => {
  item.displayItem();
});
