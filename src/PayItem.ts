export class PayItem {
  private payItemMap: Map<string, number> = new Map<string, number>();
  public static readonly CR_ITEM_PREFIX: string = "cr-";
  public static readonly DR_ITEM_PREFIX: string = "dr-";

  constructor(payItemTitles: string[]) {
    payItemTitles.forEach((payItemTitle) => {
      this.payItemMap.set(payItemTitle, 0);
    });
  }

  getItemAmount(itemTitle: string): number {
    this.hasItemTitle(itemTitle);
    return this.payItemMap.get(itemTitle) ?? 0;
  }

  getTotalAmount(): number {
    let sumAmount: number = 0;
    this.payItemMap.forEach((val, key) => {
      sumAmount += val ?? 0;
    });
    return sumAmount;
  }

  setItemAmount(itemTitle: string, amount: number) {
    this.hasItemTitle(itemTitle);
    this.payItemMap.set(itemTitle, amount);
  }

  plusItemAmount(itemTitle: string, amount: number) {
    this.hasItemTitle(itemTitle);
    let bfAmount: number = this.payItemMap.get(itemTitle) ?? 0;
    this.payItemMap.set(itemTitle, bfAmount + amount);
  }

  minusItemAmount(itemTitle: string, amount: number) {
    this.hasItemTitle(itemTitle);
    let bfAmount: number = this.payItemMap.get(itemTitle) ?? 0;
    this.payItemMap.set(itemTitle, bfAmount - amount);
  }

  clearItemAmount(itemTitle: string) {
    this.hasItemTitle(itemTitle);
    this.payItemMap.set(itemTitle, 0);
  }

  clearAllItemAmount() {
    this.payItemMap.forEach((val, key) => {
      this.payItemMap.set(key, 0);
    });
  }

  private hasItemTitle(itemTitle: string): boolean {
    if (!this.payItemMap.has(itemTitle)) {
      throw new Error("Items must always be defined at initialization time.");
    }
    return true;
  }
}
