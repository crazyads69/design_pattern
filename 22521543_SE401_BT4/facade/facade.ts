// Define sub-system classes
class KiemTraTonKho {
  checkStock(productId: string, quantity: number): boolean {
    console.log(
      `Checking stock for product ${productId} with quantity ${quantity}`
    );
    // Assume that the stock is enough
    return true;
  }

  reduceStock(productId: string, quantity: number): void {
    console.log(`Reducing stock of product ${productId} by ${quantity}`);
  }
}

class XuLyThanhToan {
  processPayment(amount: number, paymentMethod: string): boolean {
    console.log(`Processing payment of $${amount} using ${paymentMethod}`);
    // Assume that the payment is successful
    return true;
  }
}

class VanChuyen {
  ship(productId: string, quantity: number, address: string): void {
    console.log(
      `Shipping product ${productId} with quantity ${quantity} to ${address}`
    );
  }
}

// Define Facade class
class DonHangFacade {
  private kiemTraTonKho: KiemTraTonKho;
  private xuLyThanhToan: XuLyThanhToan;
  private vanChuyen: VanChuyen;

  constructor(
    kiemTraTonKho: KiemTraTonKho,
    xuLyThanhToan: XuLyThanhToan,
    vanChuyen: VanChuyen
  ) {
    this.kiemTraTonKho = kiemTraTonKho;
    this.xuLyThanhToan = xuLyThanhToan;
    this.vanChuyen = vanChuyen;
  }

  orderProduct(
    productId: string,
    quantity: number,
    address: string,
    paymentMethod: string
  ): void {
    if (this.kiemTraTonKho.checkStock(productId, quantity)) {
      if (this.xuLyThanhToan.processPayment(quantity * 100, paymentMethod)) {
        this.kiemTraTonKho.reduceStock(productId, quantity);
        this.vanChuyen.ship(productId, quantity, address);
      }
    } else {
      console.log("Order failed due to insufficient stock");
    }
  }
}

// Usage
const kiemTraTonKho = new KiemTraTonKho();
const xuLyThanhToan = new XuLyThanhToan();
const vanChuyen = new VanChuyen();

const donHangFacade = new DonHangFacade(
  kiemTraTonKho,
  xuLyThanhToan,
  vanChuyen
);

donHangFacade.orderProduct("ABC123", 10, "123 Street, City", "Credit Card");
