import { createWatchCompilerHost } from "typescript";
import { PayCrItem } from "./PayCrItem";
import { PayDrItem } from "./PayDrItem";
import { PayItemUtils } from "./PayItemUtils";

/**
 * WarikanMember
 * @export
 * @class Member
 */
export class Member {
  /**
   * MemberId (unique)
   * @type {string}
   * @memberof Member
   */
  id: string;

  /**
   * MemberName
   * @type {string}
   * @memberof Member
   */
  name: string;
  /**
   * 収支管理Utils
   * @type {PayItemUtils}
   * @memberof Member
   */
  payUtils: PayItemUtils;

  /**
   *
   * @param id MemberId (unique)
   * @param name MemberName
   */
  constructor(id: string, name: string = "") {
    this.id = id;
    this.name = name;
    this.payUtils = new PayItemUtils();
  }
}

/**
 * MemberSplitResult
 * @export
 * @class Member
 */
export class MemberSplitResult {
  /**
   * MemberId (unique)
   * @type {string}
   * @memberof Member
   */
  id: string;

  /**
   * MemberName
   * @type {string}
   * @memberof Member
   */
  name: string;

  totalCr: number = 0;
  totalDr: number = 0;
  totalAmount: number = 0;
  private balance: number = 0;
  private balanceInit: number = 0;
  private payAt: number = 0;
  payTasks: Array<MemberPayTask> = new Array<MemberPayTask>();

  public getPayBalance() {
    return this.balance;
  }

  public addPayOutToTask(toMember: MemberSplitResult, amount: number) {
    const payTask: MemberPayTask = new MemberPayTask(
      this.id,
      toMember.id,
      this.name,
      toMember.name,
      amount,
      this.id
    );
    this.payTasks.push(payTask);
    this.balance += amount;
  }

  public addPayInFromTask(fromMember: MemberSplitResult, amount: number) {
    const payTask: MemberPayTask = new MemberPayTask(
      fromMember.id,
      this.id,
      fromMember.name,
      this.name,
      amount,
      this.id
    );
    this.payTasks.push(payTask);
    this.balance -= amount;
  }

  constructor(member: Member, payAt: number) {
    this.id = member.id;
    this.name = member.name;
    this.totalCr = member.payUtils.getCrTotalAmount();
    this.totalDr = member.payUtils.getDrTotalAmount();
    this.totalAmount = member.payUtils.getTotalAmount();
    this.balance = this.totalAmount + payAt;
    this.balanceInit = this.balance;
    this.payAt = payAt;
  }
}

export class MemberPayTask {
  /**
   * MemberId (unique)
   * @type {string}
   * @memberof Member
   */
  fromId: string;

  /**
   * MemberName
   * @type {string}
   * @memberof Member
   */
  fromName: string;

  /**
   * MemberId (unique)
   * @type {string}
   * @memberof Member
   */
  toId: string;

  /**
   * MemberName
   * @type {string}
   * @memberof Member
   */
  toName: string;
  createAt: string;

  amount: number;
  isPayOutTask: boolean;
  isPayInTask: boolean;

  constructor(
    fromId: string,
    toId: string,
    fromName: string,
    toName: string,
    amount: number,
    createAt: string
  ) {
    this.fromId = fromId;
    this.fromName = fromName;
    this.toId = toId;
    this.toName = toName;
    this.amount = amount;
    this.createAt = createAt;
    this.isPayOutTask = this.createAt === this.fromId;
    this.isPayInTask = this.createAt === this.toId;
  }
}
