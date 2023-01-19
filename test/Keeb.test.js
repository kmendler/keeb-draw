import { expect, test } from "vitest";
import { QwertyKeeb } from "../src/assets/js/Keeb.js";

const qwertyKeeb = new QwertyKeeb();

test('Co-ordinates of top left-most key on QwertyKeeb', () => {
  const topLeftKeyPoint = qwertyKeeb.getKeyPoint("1");
  expect(topLeftKeyPoint.x).toBeCloseTo(19.16, 1);
  expect(topLeftKeyPoint.y).toBeCloseTo(0);
});

test('Co-ordinates of bottom right-most key on QwertyKeeb', () => {
  const bottomRightKeyPoint = qwertyKeeb.getKeyPoint("m");
  expect(bottomRightKeyPoint.x).toBeCloseTo(158, 1);
  expect(bottomRightKeyPoint.y).toBeCloseTo(57.5, 1);
});

test('Non-alphanum characters have undefined co-ordinates', () => {
  const undefinedKeyPoint = qwertyKeeb.getKeyPoint(";");
  expect(undefinedKeyPoint).toBeUndefined();
});