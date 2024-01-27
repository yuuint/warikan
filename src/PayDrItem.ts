import { PayItem } from "./PayItem";

export class PayDrItem extends PayItem {
  public static readonly TATEKAE: string = PayItem.DR_ITEM_PREFIX + "tatekae";

  constructor() {
    super([PayDrItem.TATEKAE]);
  }
}
