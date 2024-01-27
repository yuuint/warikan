import { PayItem } from "./PayItem";
import { Member, MemberSplitResult } from "./WarikanMember";
import { WarikanUtils } from "./WarikanSplitUtils";

export class Warikan {
  private membersMap: Map<string, Member>;

  constructor() {
    this.membersMap = new Map<string, Member>();
  }

  /**
   * @description ここで追加したメンバーは割り勘の対象になります
   * @param warikanMember
   */
  addMember(warikanMember: Member) {
    this.membersMap.set(warikanMember.id, warikanMember);
  }

  addMembers(warikanMembers: Member[]) {
    warikanMembers.forEach((member) => {
      this.addMember(member);
    });
  }

  addPayTradeByMemberId(id: string, itemTile: string, amount: number) {
    const member = this.getMember(id);
    if (!!member) {
      member.payUtils.addPayTrade(itemTile, amount);
    } else {
      throw new Error("Members must be added in advance.");
    }
  }

  addPlusPayTradeByMemberId(id: string, itemTile: string, amount: number) {
    const member = this.getMember(id);
    if (!!member) {
      member.payUtils.addPlusPayTrade(itemTile, amount);
    } else {
      throw new Error("Members must be added in advance.");
    }
  }

  addMinusPayTradeByMemberId(id: string, itemTile: string, amount: number) {
    const member = this.getMember(id);
    if (!!member) {
      member.payUtils.addMinusPayTrade(itemTile, amount);
    } else {
      throw new Error("Members must be added in advance.");
    }
  }

  removeMemberById(id: string) {
    if (this.membersMap.has(id)) {
      this.membersMap.delete(id);
    }
  }
  removeMember(warikanMember: Member) {
    this.removeMemberById(warikanMember.id);
  }

  getMembersTotalAmount() {
    let totalAmount: number = 0;
    this.membersMap.forEach((member: Member) => {
      totalAmount += member.payUtils.getTotalAmount();
    });
    return totalAmount;
  }

  getMembersTotalCrAmount() {
    let totalAmount: number = 0;
    this.membersMap.forEach((member: Member) => {
      totalAmount += member.payUtils.getCrTotalAmount();
    });
    return totalAmount;
  }

  getMemberCount(): number {
    return this.membersMap.size;
  }

  getMembersDrAt(): number {
    return this.getMembersTotalDrAmount() / this.getMemberCount();
  }

  getMembersCrAt(): number {
    return this.getMembersTotalCrAmount() / this.getMemberCount();
  }

  getMembersTotalDrAmount() {
    let totalAmount: number = 0;
    this.membersMap.forEach((member: Member) => {
      totalAmount += member.payUtils.getDrTotalAmount();
    });
    return totalAmount;
  }

  getMember(id: string): Member | undefined {
    return this.membersMap.get(id);
  }

  getMembersByMap(): Map<string, Member> {
    return this.membersMap;
  }

  getMembersByArray(): Member[] {
    let resMembers: Member[] = [];
    this.membersMap.forEach((member) => {
      resMembers.push(member);
    });
    return resMembers;
  }

  getMembersByStringArray(): string[] {
    let resMembers: string[] = [];
    this.membersMap.forEach((member) => {
      resMembers.push(member.id);
    });
    return resMembers;
  }

  /**
   * 割り勘方法（通常）：１円未満は振替なし
   * @returns
   */
  getSplitResultsByArray(): Array<MemberSplitResult> {
    return WarikanUtils.basicSplit(this.membersMap, this.getMembersCrAt() * -1);
  }

  /**
   * 割り勘方法（通常）：１円未満は振替なし
   * @returns
   */
  getSplitResultsByMap(): Map<string, MemberSplitResult> {
    let resResultsMap: Map<string, MemberSplitResult> = new Map<
      string,
      MemberSplitResult
    >();
    const splitResults = WarikanUtils.basicSplit(
      this.membersMap,
      this.getMembersCrAt() * -1
    );
    splitResults.forEach((spritResult: MemberSplitResult) => {
      resResultsMap.set(spritResult.id, spritResult);
    });
    return resResultsMap;
  }
}
