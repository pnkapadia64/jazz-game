import _keys from "lodash/keys";
import { MAX_NUM, MIN_NUM, Operator, OPERATORS } from "./constants";

const getRandomNumber = (
  min: number = MIN_NUM,
  max: number = MAX_NUM
): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomOperator = (): Operator => {
  const operators = _keys(OPERATORS),
    operatorIndex = getRandomNumber(0, operators.length - 1);
  return OPERATORS[operators[operatorIndex]];
};

const getRandomResult = (
  [no1, no2]: [no1: number, no2: number],
  operation: Operator
) => {
  const result = operation.operate(no1, no2),
    isRandomResultCorrect = getRandomNumber(0, 1);

  if (isRandomResultCorrect) {
    return result;
  }
  return result + getRandomNumber(-5, +5);
};

export default class Equation {
  operator: Operator;
  nos: [number, number];
  answer: number;

  constructor() {
    this.operator = getRandomOperator();
    this.nos = [getRandomNumber(), getRandomNumber()];
    this.answer = getRandomResult(this.nos, this.operator);
  }

  isCorrect() {
    return this.operator.operate(this.nos[0], this.nos[1]) === this.answer;
  }
}
