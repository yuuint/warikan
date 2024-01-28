import { PayCrItem } from "../src/PayCrItem";

test("PayCrItem init", () => {
  const payCrItem = new PayCrItem();
  expect(payCrItem.getTotalAmount()).toBe(0);
});

test("PayCrItem const", () => {
  expect(PayCrItem.SHUKIN).toBe("cr-shukin");
});
