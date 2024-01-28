import { Member, MemberSplitResult } from "../src/WarikanMember";
import { PayCrItem } from "../src/PayCrItem";
import { PayDrItem } from "../src/PayDrItem";

const yukiko = new Member("0001", "yukiko");
const takeko = new Member("0002");

test("WarikanMember member-init", () => {
  // initialaizing
  expect(yukiko.id).toBe("0001");
  expect(yukiko.name).toBe("yukiko");
  expect(yukiko.payUtils.getTotalAmount()).toBe(0);
  expect(takeko.id).toBe("0002");
  expect(takeko.name).toBe("");
  expect(takeko.payUtils.getTotalAmount()).toBe(0);
});

test("WarikanMember member-splitResult", () => {
  const testMen = new Member("sample", "sample");
  testMen.payUtils.addPayTrade(PayCrItem.SHUKIN, 200);
  testMen.payUtils.addPayTrade(PayDrItem.TATEKAE, 5000);

  const splitResult = new MemberSplitResult(testMen, -500);
  expect(splitResult.getPayBalance()).toBe(4700);
});

test("WarikanMember member-splitResult", () => {
  const testMen = new Member("sample", "sample");
  testMen.payUtils.addPayTrade(PayCrItem.SHUKIN, 0);
  testMen.payUtils.addPayTrade(PayDrItem.TATEKAE, 5000);

  const splitResult = new MemberSplitResult(testMen, -500);
  expect(splitResult.getPayBalance()).toBe(4500);
});

test("WarikanMember member-splitResult", () => {
  const testMen = new Member("sample", "sample");
  testMen.payUtils.addPayTrade(PayCrItem.SHUKIN, 5000);
  testMen.payUtils.addPayTrade(PayDrItem.TATEKAE, 0);

  const splitResult = new MemberSplitResult(testMen, -500);
  expect(splitResult.getPayBalance()).toBe(4500);
});

test("WarikanMember member-splitResult", () => {
  const testMen = new Member("sample", "sample");
  testMen.payUtils.addPayTrade(PayCrItem.SHUKIN, -2000);
  testMen.payUtils.addPayTrade(PayDrItem.TATEKAE, 5000);

  const splitResult = new MemberSplitResult(testMen, -500);
  expect(splitResult.getPayBalance()).toBe(2500);
});

test("WarikanMember splitResult-init", () => {
  const testMen = new Member("sample", "sample");
  testMen.payUtils.addPayTrade(PayCrItem.SHUKIN, -2000);
  testMen.payUtils.addPayTrade(PayDrItem.TATEKAE, 5000);

  const splitResult = new MemberSplitResult(testMen, -5000);
  expect(splitResult.getPayBalance()).toBe(-2000);
});

test("WarikanMember splitResult-payout/in", () => {
  const testMen = new Member("sample", "sampleName");
  const testNen = new Member("sample2", "sample2Name");
  testMen.payUtils.addPayTrade(PayCrItem.SHUKIN, -2000);
  testMen.payUtils.addPayTrade(PayDrItem.TATEKAE, 5000);

  const splitMenResult = new MemberSplitResult(testMen, -5000);
  const splitNenResult = new MemberSplitResult(testNen, -5000);
  expect(splitMenResult.getPayBalance()).toBe(-2000);
  expect(splitNenResult.getPayBalance()).toBe(-5000);

  splitMenResult.addPayOutToTask(splitNenResult, 2000);
  splitNenResult.addPayInFromTask(splitMenResult, 2000);
  expect(splitMenResult.getPayBalance()).toBe(0);
  expect(splitNenResult.getPayBalance()).toBe(-7000);

  expect(splitMenResult.payTasks[0].amount).toBe(2000);
  expect(splitMenResult.payTasks[0].createAt).toBe("sample");
  expect(splitMenResult.payTasks[0].fromId).toBe("sample");
  expect(splitMenResult.payTasks[0].fromName).toBe("sampleName");
  expect(splitMenResult.payTasks[0].toId).toBe("sample2");
  expect(splitMenResult.payTasks[0].toName).toBe("sample2Name");
  expect(splitMenResult.payTasks[0].isPayInTask).toBe(false);
  expect(splitMenResult.payTasks[0].isPayOutTask).toBe(true);

  expect(splitNenResult.payTasks[0].amount).toBe(2000);
  expect(splitNenResult.payTasks[0].createAt).toBe("sample2");
  expect(splitNenResult.payTasks[0].fromId).toBe("sample");
  expect(splitNenResult.payTasks[0].fromName).toBe("sampleName");
  expect(splitNenResult.payTasks[0].toId).toBe("sample2");
  expect(splitNenResult.payTasks[0].toName).toBe("sample2Name");
  expect(splitNenResult.payTasks[0].isPayInTask).toBe(true);
  expect(splitNenResult.payTasks[0].isPayOutTask).toBe(false);
});
