import { PayItem } from "../src/PayItem";

const payItem = new PayItem(["test1", "test2"]);

test("PayItem amount-init", () => {
  // initialaizing
  expect(payItem.getItemAmount("test1")).toBe(0);
  expect(payItem.getItemAmount("test2")).toBe(0);
  expect(payItem.getTotalAmount()).toBe(0);
});

test("PayItem amount-plus", () => {
  payItem.plusItemAmount("test1", 300);
  payItem.plusItemAmount("test2", 400);
  expect(payItem.getItemAmount("test1")).toBe(300);
  expect(payItem.getItemAmount("test2")).toBe(400);
  expect(payItem.getTotalAmount()).toBe(700);

  payItem.plusItemAmount("test1", 200);
  payItem.plusItemAmount("test2", 100);
  expect(payItem.getItemAmount("test1")).toBe(500);
  expect(payItem.getItemAmount("test2")).toBe(500);
  expect(payItem.getTotalAmount()).toBe(1000);
});

test("PayItem amount-minus", () => {
  payItem.minusItemAmount("test1", 300);
  payItem.minusItemAmount("test2", 400);
  expect(payItem.getItemAmount("test1")).toBe(200);
  expect(payItem.getItemAmount("test2")).toBe(100);
  expect(payItem.getTotalAmount()).toBe(300);

  payItem.minusItemAmount("test1", 300);
  payItem.minusItemAmount("test2", 200);
  expect(payItem.getItemAmount("test1")).toBe(-100);
  expect(payItem.getItemAmount("test2")).toBe(-100);
  expect(payItem.getTotalAmount()).toBe(-200);
});

test("PayItem amount-clear-item", () => {
  payItem.clearItemAmount("test1");
  expect(payItem.getItemAmount("test1")).toBe(0);
  expect(payItem.getItemAmount("test2")).toBe(-100);
  expect(payItem.getTotalAmount()).toBe(-100);
});

test("PayItem amount-set", () => {
  payItem.setItemAmount("test1", 123);
  payItem.setItemAmount("test2", 456);

  expect(payItem.getItemAmount("test1")).toBe(123);
  expect(payItem.getItemAmount("test2")).toBe(456);
  expect(payItem.getTotalAmount()).toBe(579);
});

test("PayItem amount-clear-all", () => {
  payItem.setItemAmount("test1", 999);
  payItem.setItemAmount("test2", 999);
  payItem.clearAllItemAmount();
  expect(payItem.getItemAmount("test1")).toBe(0);
  expect(payItem.getItemAmount("test2")).toBe(0);
  expect(payItem.getTotalAmount()).toBe(0);
});

test("PayItem amount-error-nonitem", () => {
  expect(() => payItem.setItemAmount("errorkey", 999)).toThrow();
});

test("PayItem const", () => {
  expect(PayItem.CR_ITEM_PREFIX).toBe("cr-");
  expect(PayItem.DR_ITEM_PREFIX).toBe("dr-");
});
