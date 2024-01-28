import { PayDrItem } from "../src/PayDrItem";

test("PayCrItem init", () => {
  const payDrItem = new PayDrItem();
  expect(payDrItem.getTotalAmount()).toBe(0);
});

test("PayCrItem const", () => {
  expect(PayDrItem.TATEKAE).toBe("dr-tatekae");
});
