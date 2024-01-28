import { PayCrItem } from "./PayCrItem";
import { PayDrItem } from "./PayDrItem";
import { PayItem } from "./PayItem";

export class PayItemUtils {
  private payCrItem: PayCrItem;
  private payDrItem: PayDrItem;

  constructor() {
    this.payCrItem = new PayCrItem();
    this.payDrItem = new PayDrItem();
  }

  setPayCrItemInstance(payCrItem: PayCrItem) {
    this.payCrItem = payCrItem;
  }

  setPayDrItemInstance(payDrItem: PayDrItem) {
    this.payDrItem = payDrItem;
  }

  setPayItemInstace(payCrItem: PayCrItem, payDrItem: PayDrItem) {
    this.payCrItem = payCrItem;
    this.payDrItem = payDrItem;
  }

  clearTotalAmount() {
    this.payCrItem.clearAllItemAmount();
    this.payDrItem.clearAllItemAmount();
  }

  getCrTotalAmount(): number {
    return this.payCrItem.getTotalAmount();
  }

  getDrTotalAmount(): number {
    return this.payDrItem.getTotalAmount();
  }

  getTotalAmount(): number {
    return this.getCrTotalAmount() + this.getDrTotalAmount();
  }

  addPayTrade(itemTile: string, amount: number) {
    this.addPlusPayTrade(itemTile, amount);
  }

  addPlusPayTrade(itemTitle: string, amount: number) {
    const payItemInstance: PayItem =
      this.getPayItemInstanceByItemTitle(itemTitle);
    payItemInstance.plusItemAmount(itemTitle, amount);
  }

  addMinusPayTrade(itemTitle: string, amount: number) {
    const payItemInstance: PayItem =
      this.getPayItemInstanceByItemTitle(itemTitle);
    payItemInstance.minusItemAmount(itemTitle, amount);
  }

  private getPayItemInstanceByItemTitle(itemTitle: String): PayItem {
    switch (itemTitle.substring(0, 3)) {
      case PayItem.CR_ITEM_PREFIX:
        return this.payCrItem;
      case PayItem.DR_ITEM_PREFIX:
        return this.payDrItem;
      default:
        throw new Error(
          "ItemTitle must be defined using the PREFIX defined for PayItem."
        );
    }
  }
}
