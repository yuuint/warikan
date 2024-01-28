import { PayItemUtils } from "../src/PayItemUtils";
import { PayCrItem } from "../src/PayCrItem";
import { PayDrItem } from "../src/PayDrItem";

const payItemUtils = new PayItemUtils();
test("PayItemUtils init", () => {
  expect(payItemUtils.getTotalAmount()).toBe(0);
  expect(payItemUtils.getCrTotalAmount()).toBe(0);
  expect(payItemUtils.getDrTotalAmount()).toBe(0);
});

test("PayItemUtils plus-test", () => {
  payItemUtils.addPlusPayTrade(PayCrItem.SHUKIN, 100);
  payItemUtils.addPlusPayTrade(PayDrItem.TATEKAE, 200);

  expect(payItemUtils.getTotalAmount()).toBe(300);
  expect(payItemUtils.getCrTotalAmount()).toBe(100);
  expect(payItemUtils.getDrTotalAmount()).toBe(200);
});

test("PayItemUtils minus-test", () => {
  payItemUtils.addMinusPayTrade(PayCrItem.SHUKIN, 200);
  payItemUtils.addMinusPayTrade(PayDrItem.TATEKAE, 300);

  expect(payItemUtils.getTotalAmount()).toBe(-200);
  expect(payItemUtils.getCrTotalAmount()).toBe(-100);
  expect(payItemUtils.getDrTotalAmount()).toBe(-100);
});

test("PayItemUtils add-test", () => {
  payItemUtils.addPayTrade(PayCrItem.SHUKIN, 200);
  payItemUtils.addPayTrade(PayDrItem.TATEKAE, 300);

  expect(payItemUtils.getTotalAmount()).toBe(300);
  expect(payItemUtils.getCrTotalAmount()).toBe(100);
  expect(payItemUtils.getDrTotalAmount()).toBe(200);
});

test("PayItemUtils set-test", () => {
  const payCrItem = new PayCrItem();
  const payDrItem = new PayDrItem();
  payCrItem.plusItemAmount(PayCrItem.SHUKIN, 777);
  payDrItem.plusItemAmount(PayDrItem.TATEKAE, 777);
  payItemUtils.setPayCrItemInstance(payCrItem);
  payItemUtils.setPayDrItemInstance(payDrItem);

  expect(payItemUtils.getTotalAmount()).toBe(1554);
  expect(payItemUtils.getCrTotalAmount()).toBe(777);
  expect(payItemUtils.getDrTotalAmount()).toBe(777);
});

test("PayItemUtils set-test", () => {
  const payCrItem = new PayCrItem();
  const payDrItem = new PayDrItem();
  payCrItem.plusItemAmount(PayCrItem.SHUKIN, 100);
  payDrItem.plusItemAmount(PayDrItem.TATEKAE, 200);
  payItemUtils.setPayItemInstace(payCrItem, payDrItem);

  expect(payItemUtils.getTotalAmount()).toBe(300);
  expect(payItemUtils.getCrTotalAmount()).toBe(100);
  expect(payItemUtils.getDrTotalAmount()).toBe(200);
});

test("PayItemUtils clear-test", () => {
  payItemUtils.clearTotalAmount();

  expect(payItemUtils.getTotalAmount()).toBe(0);
  expect(payItemUtils.getCrTotalAmount()).toBe(0);
  expect(payItemUtils.getDrTotalAmount()).toBe(0);
});

test("PayItemUtils amount-error-nonitem", () => {
  expect(() => payItemUtils.addPayTrade("error-key", 200)).toThrow();
});
