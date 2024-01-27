import { PayItem } from "./PayItem";

export class PayCrItem extends PayItem {
  public static readonly SHUKIN: string = PayItem.CR_ITEM_PREFIX + "shukin";

  constructor() {
    super([PayCrItem.SHUKIN]);
  }
}
