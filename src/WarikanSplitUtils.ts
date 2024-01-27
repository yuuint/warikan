import { Member, MemberSplitResult } from "./WarikanMember";

export class WarikanUtils {
  private static toSplitResultMap(
    membersMap: Map<string, Member>,
    payAt: number
  ): Map<string, MemberSplitResult> {
    let splitMap: Map<string, MemberSplitResult> = new Map<
      string,
      MemberSplitResult
    >();

    membersMap.forEach((member: Member) => {
      let splitResults: MemberSplitResult = new MemberSplitResult(
        member,
        payAt
      );
      splitMap.set(member.id, splitResults);
    });
    return splitMap;
  }

  private static toSplitResultArray(
    splitResutMap: Map<string, MemberSplitResult>
  ): Array<MemberSplitResult> {
    let memberSplitResultArray = new Array<MemberSplitResult>();

    splitResutMap.forEach((splitResult: MemberSplitResult) => {
      memberSplitResultArray.push(splitResult);
    });
    return memberSplitResultArray;
  }

  public static basicSplit(
    membersMap: Map<string, Member>,
    payAt: number
  ): Array<MemberSplitResult> {
    let splitResutMap: Map<string, MemberSplitResult> = this.toSplitResultMap(
      membersMap,
      payAt
    );

    // STEP1: 同額割り勘
    splitResutMap.forEach((splitFrom: MemberSplitResult) => {
      if (splitFrom.getPayBalance() <= 0) {
        // 支払い金額がない場合
        return;
      }
      splitResutMap.forEach((splitTo: MemberSplitResult) => {
        if (
          splitFrom.id !== splitTo.id &&
          splitFrom.getPayBalance() > 0 &&
          splitTo.getPayBalance() < 0
        ) {
          //自分のIDと異なる場合 + 支払いをしなければならない場合
          const tradeAt = splitFrom.getPayBalance();
          if (splitFrom.getPayBalance() + splitTo.getPayBalance() === 0) {
            // 同じ金額の場合相殺する
            splitFrom.addPayOutToTask(splitTo, tradeAt);
            splitTo.addPayInFromTask(splitFrom, tradeAt);
          }
        }
      });
    });

    // STEP2: 同額割り勘
    splitResutMap.forEach((splitFrom: MemberSplitResult) => {
      if (splitFrom.getPayBalance() <= 0) {
        // 支払い金額がない場合
        return;
      }
      splitResutMap.forEach((splitTo: MemberSplitResult) => {
        if (
          splitFrom.id !== splitTo.id &&
          splitFrom.getPayBalance() > 0 &&
          splitTo.getPayBalance() < 0
        ) {
          //自分のIDと異なる場合 + 支払いをしなければならない場合
          let tradeAt = 0;
          if (splitFrom.getPayBalance() + splitTo.getPayBalance() >= 0) {
            tradeAt = splitTo.getPayBalance() * -1;
          } else {
            tradeAt = splitFrom.getPayBalance();
          }
          splitFrom.addPayOutToTask(splitTo, tradeAt);
          splitTo.addPayInFromTask(splitFrom, tradeAt);
        }
      });
    });

    return this.toSplitResultArray(splitResutMap);
  }
}
