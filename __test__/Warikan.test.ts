import { PayCrItem } from "../src/PayCrItem";
import { PayDrItem } from "../src/PayDrItem";
import { Warikan } from "../src/Warikan";
import { Member } from "../src/WarikanMember";
const warikan = new Warikan();

test("Warikan init", () => {
  expect(warikan.getMemberCount()).toBe(0);
  expect(warikan.getMembersCrAt()).toBe(0);
  expect(warikan.getMembersDrAt()).toBe(0);
  expect(warikan.getMembersTotalAmount()).toBe(0);
  expect(warikan.getMembersTotalCrAmount()).toBe(0);
  expect(warikan.getMembersTotalDrAmount()).toBe(0);
});

test("Warikan members", () => {
  // CREATE MEMBERs
  const yukiko = new Member("0001", "yukiko");
  yukiko.payUtils.addPayTrade(PayCrItem.SHUKIN, -3600);
  const takeko = new Member("0002", "takeko");
  takeko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const setsuko = new Member("0003", "setsuko");
  setsuko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const zawako = new Member("0004", "zawako");
  zawako.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const yoshiko = new Member("0005", "yoshiko");
  yoshiko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const michiko = new Member("0006", "michiko");
  michiko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);

  warikan.addMembers([yukiko, takeko, setsuko, zawako, yoshiko]);
  warikan.addPayTradeByMemberId("0001", PayDrItem.TATEKAE, 4000);
  warikan.addMinusPayTradeByMemberId("0001", PayDrItem.TATEKAE, 4000);
  warikan.addPlusPayTradeByMemberId("0001", PayDrItem.TATEKAE, 4000);

  warikan.removeMember(michiko);
  warikan.removeMemberById("0005");

  expect(warikan.getMembersByMap().get("0001")?.name).toBe("yukiko");
  expect(warikan.getMembersByArray()).toHaveLength(4);

  expect(warikan.getMemberCount()).toBe(4);
  expect(warikan.getMembersCrAt()).toBe(0);
  expect(warikan.getMembersDrAt()).toBe(1000);
  expect(warikan.getMembersTotalAmount()).toBe(4000);
  expect(warikan.getMembersTotalCrAmount()).toBe(0);
  expect(warikan.getMembersTotalDrAmount()).toBe(4000);
});

test("Warikan resultsMap", () => {
  // CREATE MEMBERs
  const warikan2 = new Warikan();
  const yukiko = new Member("0001", "yukiko");
  yukiko.payUtils.addPayTrade(PayCrItem.SHUKIN, -3600);
  yukiko.payUtils.addPayTrade(PayDrItem.TATEKAE, 4000);
  const takeko = new Member("0002", "takeko");
  takeko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const setsuko = new Member("0003", "setsuko");
  setsuko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const zawako = new Member("0004", "zawako");
  zawako.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);

  warikan2.addMembers([yukiko, takeko, setsuko, zawako]);
  const result = warikan2.getSplitResultsByMap();

  result.forEach((spritResult, key) => {
    switch (spritResult.id) {
      case "0001":
        expect(spritResult.name).toBe("yukiko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(3);
        let sum: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.toId) {
            case "0001":
              // expect(payTask.amount).toBe(1000);
              break;
            case "0002":
              expect(payTask.amount).toBe(200);
              break;
            case "0003":
              expect(payTask.amount).toBe(200);
              break;
            case "0004":
              expect(payTask.amount).toBe(200);
              break;
            default:
              break;
          }
          sum += payTask.amount;
        });
        expect(sum).toBe(600);

        break;
      case "0002":
        expect(spritResult.name).toBe("takeko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum2: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(200);
              break;
            case "0002":
              break;
            case "0003":
              break;
            case "0004":
              break;
            default:
              break;
          }
          sum2 += payTask.amount;
        });
        expect(sum2).toBe(200);
        break;
      case "0003":
        expect(spritResult.name).toBe("setsuko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum3: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(200);
              break;
            case "0002":
              break;
            case "0003":
              break;
            case "0004":
              break;
            default:
              break;
          }
          sum3 += payTask.amount;
        });
        expect(sum3).toBe(200);
        break;
      case "0004":
        expect(spritResult.name).toBe("zawako");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum4: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(200);
              break;
            case "0002":
              break;
            case "0003":
              break;
            case "0004":
              break;
            default:
              break;
          }
          sum4 += payTask.amount;
        });
        expect(sum4).toBe(200);
        break;
      default:
        break;
    }
  });
});

test("Warikan resultsArray", () => {
  // CREATE MEMBERs
  const warikan2 = new Warikan();
  const yukiko = new Member("0001", "yukiko");
  yukiko.payUtils.addPayTrade(PayCrItem.SHUKIN, -3600);
  yukiko.payUtils.addPayTrade(PayDrItem.TATEKAE, 4000);
  const takeko = new Member("0002", "takeko");
  takeko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const setsuko = new Member("0003", "setsuko");
  setsuko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const zawako = new Member("0004", "zawako");
  zawako.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);

  warikan2.addMembers([yukiko, takeko, setsuko, zawako]);
  const result = warikan2.getSplitResultsByArray();

  result.forEach((spritResult) => {
    switch (spritResult.id) {
      case "0001":
        expect(spritResult.name).toBe("yukiko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(3);
        let sum: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.toId) {
            case "0001":
              // expect(payTask.amount).toBe(1000);
              break;
            case "0002":
              expect(payTask.amount).toBe(200);
              break;
            case "0003":
              expect(payTask.amount).toBe(200);
              break;
            case "0004":
              expect(payTask.amount).toBe(200);
              break;
            default:
              break;
          }
          sum += payTask.amount;
        });
        expect(sum).toBe(600);

        break;
      case "0002":
        expect(spritResult.name).toBe("takeko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum2: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(200);
              break;
            case "0002":
              break;
            case "0003":
              break;
            case "0004":
              break;
            default:
              break;
          }
          sum2 += payTask.amount;
        });
        expect(sum2).toBe(200);
        break;
      case "0003":
        expect(spritResult.name).toBe("setsuko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum3: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(200);
              break;
            case "0002":
              break;
            case "0003":
              break;
            case "0004":
              break;
            default:
              break;
          }
          sum3 += payTask.amount;
        });
        expect(sum3).toBe(200);
        break;
      case "0004":
        expect(spritResult.name).toBe("zawako");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum4: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(200);
              break;
            case "0002":
              break;
            case "0003":
              break;
            case "0004":
              break;
            default:
              break;
          }
          sum4 += payTask.amount;
        });
        expect(sum4).toBe(200);
        break;
      default:
        break;
    }
  });
});

test("Warikan error", () => {
  expect(() =>
    warikan.addPayTradeByMemberId("error-key", "error-key", 200)
  ).toThrow();
  expect(() =>
    warikan.addPlusPayTradeByMemberId("error-key", "error-key", 200)
  ).toThrow();
  expect(() =>
    warikan.addMinusPayTradeByMemberId("error-key", "error-key", 200)
  ).toThrow();
});
