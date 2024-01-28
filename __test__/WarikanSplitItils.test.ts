import { PayCrItem } from "../src/PayCrItem";
import { PayDrItem } from "../src/PayDrItem";
import { Member } from "../src/WarikanMember";
import { WarikanUtils } from "../src/WarikanSplitUtils";

test("WarikanUtils basicSplit-ptn1-all0", () => {
  const members = new Map<string, Member>();
  // CREATE MEMBERs
  const yukiko = new Member("0001", "yukiko");
  const takeko = new Member("0002", "takeko");
  const setsuko = new Member("0003", "setsuko");
  const zawako = new Member("0004", "zawako");

  // SET MAP
  members.set("0001", yukiko);
  members.set("0002", takeko);
  members.set("0003", setsuko);
  members.set("0004", zawako);

  const splitResults = WarikanUtils.basicSplit(members, 0);

  splitResults.forEach((spritResult) => {
    switch (spritResult.id) {
      case "0001":
        expect(spritResult.name).toBe("yukiko");
        expect(spritResult.totalAmount).toBe(0);
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(0);
        break;
      case "0002":
        expect(spritResult.name).toBe("takeko");
        expect(spritResult.totalAmount).toBe(0);
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(0);
        break;
      case "0003":
        expect(spritResult.name).toBe("setsuko");
        expect(spritResult.totalAmount).toBe(0);
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(0);
        break;
      case "0004":
        expect(spritResult.name).toBe("zawako");
        expect(spritResult.totalAmount).toBe(0);
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(0);
        break;
      default:
        break;
    }
  });
});

test("WarikanUtils basicSplit-ptn2-tatekae-only", () => {
  const members = new Map<string, Member>();
  // CREATE MEMBERs
  const yukiko = new Member("0001", "yukiko");
  yukiko.payUtils.addPayTrade(PayDrItem.TATEKAE, 4000);
  const takeko = new Member("0002", "takeko");
  const setsuko = new Member("0003", "setsuko");
  const zawako = new Member("0004", "zawako");

  // SET MAP
  members.set("0001", yukiko);
  members.set("0002", takeko);
  members.set("0003", setsuko);
  members.set("0004", zawako);

  const splitResults = WarikanUtils.basicSplit(members, -1000);

  splitResults.forEach((spritResult) => {
    switch (spritResult.id) {
      case "0001":
        expect(spritResult.name).toBe("yukiko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(3);
        let sum: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(1000);
              break;
            case "0002":
              expect(payTask.amount).toBe(1000);
              break;
            case "0003":
              expect(payTask.amount).toBe(1000);
              break;
            case "0004":
              expect(payTask.amount).toBe(1000);
              break;
            default:
              break;
          }
          sum += payTask.amount;
        });
        expect(sum).toBe(3000);

        break;
      case "0002":
        expect(spritResult.name).toBe("takeko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum2: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.toId) {
            case "0001":
              expect(payTask.amount).toBe(1000);
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
        expect(sum2).toBe(1000);
        break;
      case "0003":
        expect(spritResult.name).toBe("setsuko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum3: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.toId) {
            case "0001":
              expect(payTask.amount).toBe(1000);
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
        expect(sum3).toBe(1000);
        break;
      case "0004":
        expect(spritResult.name).toBe("zawako");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum4: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.toId) {
            case "0001":
              expect(payTask.amount).toBe(1000);
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
        expect(sum4).toBe(1000);
        break;
      default:
        break;
    }
  });
});

test("WarikanUtils basicSplit-ptn3-tatekae-any", () => {
  const members = new Map<string, Member>();
  // CREATE MEMBERs
  const yukiko = new Member("0001", "yukiko");
  yukiko.payUtils.addPayTrade(PayDrItem.TATEKAE, 1000);
  // -1500
  const takeko = new Member("0002", "takeko");
  takeko.payUtils.addPayTrade(PayDrItem.TATEKAE, 2000);
  // -500
  const setsuko = new Member("0003", "setsuko");
  setsuko.payUtils.addPayTrade(PayDrItem.TATEKAE, 3000);
  // 500
  const zawako = new Member("0004", "zawako");
  zawako.payUtils.addPayTrade(PayDrItem.TATEKAE, 4000);
  // 1500

  // SET MAP
  members.set("0001", yukiko);
  members.set("0002", takeko);
  members.set("0003", setsuko);
  members.set("0004", zawako);

  const splitResults = WarikanUtils.basicSplit(members, -2500);

  splitResults.forEach((spritResult) => {
    switch (spritResult.id) {
      case "0001":
        expect(spritResult.name).toBe("yukiko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.toId) {
            case "0001":
              break;
            case "0002":
              break;
            case "0003":
              break;
            case "0004":
              expect(payTask.amount).toBe(1500);
              break;
            default:
              break;
          }
          sum += payTask.amount;
        });
        expect(sum).toBe(1500);

        break;
      case "0002":
        expect(spritResult.name).toBe("takeko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum2: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.toId) {
            case "0001":
              break;
            case "0002":
              break;
            case "0003":
              expect(payTask.amount).toBe(500);
              break;
            case "0004":
              break;
            default:
              break;
          }
          sum2 += payTask.amount;
        });
        expect(sum2).toBe(500);
        break;
      case "0003":
        expect(spritResult.name).toBe("setsuko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum3: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              break;
            case "0002":
              expect(payTask.amount).toBe(500);
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
        expect(sum3).toBe(500);
        break;
      case "0004":
        expect(spritResult.name).toBe("zawako");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum4: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(1500);
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
        expect(sum4).toBe(1500);
        break;
      default:
        break;
    }
  });
});

test("WarikanUtils basicSplit-ptn4-shukin-only", () => {
  const members = new Map<string, Member>();
  // CREATE MEMBERs
  const yukiko = new Member("0001", "yukiko");
  yukiko.payUtils.addPayTrade(PayCrItem.SHUKIN, -3600);
  const takeko = new Member("0002", "takeko");
  takeko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const setsuko = new Member("0003", "setsuko");
  setsuko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const zawako = new Member("0004", "zawako");
  zawako.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);

  // SET MAP
  members.set("0001", yukiko);
  members.set("0002", takeko);
  members.set("0003", setsuko);
  members.set("0004", zawako);

  const splitResults = WarikanUtils.basicSplit(members, 0);

  splitResults.forEach((spritResult) => {
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
              expect(payTask.amount).toBe(1200);
              break;
            case "0003":
              expect(payTask.amount).toBe(1200);
              break;
            case "0004":
              expect(payTask.amount).toBe(1200);
              break;
            default:
              break;
          }
          sum += payTask.amount;
        });
        expect(sum).toBe(3600);

        break;
      case "0002":
        expect(spritResult.name).toBe("takeko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum2: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(1200);
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
        expect(sum2).toBe(1200);
        break;
      case "0003":
        expect(spritResult.name).toBe("setsuko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum3: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(1200);
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
        expect(sum3).toBe(1200);
        break;
      case "0004":
        expect(spritResult.name).toBe("zawako");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum4: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(1200);
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
        expect(sum4).toBe(1200);
        break;
      default:
        break;
    }
  });
});

test("WarikanUtils basicSplit-ptn4-shukin-only", () => {
  const members = new Map<string, Member>();
  // CREATE MEMBERs
  const yukiko = new Member("0001", "yukiko");
  yukiko.payUtils.addPayTrade(PayCrItem.SHUKIN, -3600);
  const takeko = new Member("0002", "takeko");
  takeko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const setsuko = new Member("0003", "setsuko");
  setsuko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const zawako = new Member("0004", "zawako");
  zawako.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);

  // SET MAP
  members.set("0001", yukiko);
  members.set("0002", takeko);
  members.set("0003", setsuko);
  members.set("0004", zawako);

  const splitResults = WarikanUtils.basicSplit(members, 0);

  splitResults.forEach((spritResult) => {
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
              expect(payTask.amount).toBe(1200);
              break;
            case "0003":
              expect(payTask.amount).toBe(1200);
              break;
            case "0004":
              expect(payTask.amount).toBe(1200);
              break;
            default:
              break;
          }
          sum += payTask.amount;
        });
        expect(sum).toBe(3600);

        break;
      case "0002":
        expect(spritResult.name).toBe("takeko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum2: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(1200);
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
        expect(sum2).toBe(1200);
        break;
      case "0003":
        expect(spritResult.name).toBe("setsuko");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum3: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(1200);
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
        expect(sum3).toBe(1200);
        break;
      case "0004":
        expect(spritResult.name).toBe("zawako");
        expect(spritResult.getPayBalance()).toBe(0);
        expect(spritResult.payTasks).toHaveLength(1);
        let sum4: number = 0;
        spritResult.payTasks.forEach((payTask) => {
          switch (payTask.fromId) {
            case "0001":
              expect(payTask.amount).toBe(1200);
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
        expect(sum4).toBe(1200);
        break;
      default:
        break;
    }
  });
});

test("WarikanUtils basicSplit-ptn4-shukin-tatekae", () => {
  const members = new Map<string, Member>();
  // 事前集塵一人1200円、実際費用1000円の場合

  // CREATE MEMBERs
  const yukiko = new Member("0001", "yukiko");
  yukiko.payUtils.addPayTrade(PayCrItem.SHUKIN, -3600);
  yukiko.payUtils.addPayTrade(PayDrItem.TATEKAE, 4000);
  const takeko = new Member("0002", "takeko");
  takeko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const setsuko = new Member("0003", "setsuko");
  setsuko.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);
  const zawako = new Member("0004", "zawako");
  zawako.payUtils.addPayTrade(PayCrItem.SHUKIN, 1200);

  // SET MAP
  members.set("0001", yukiko);
  members.set("0002", takeko);
  members.set("0003", setsuko);
  members.set("0004", zawako);

  const splitResults = WarikanUtils.basicSplit(members, -1000);

  splitResults.forEach((spritResult) => {
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
