export const MAX_NUM = 20;
export const MIN_NUM = 1;
export const TIMER_SEC = 3;
export const TIMER_BASE = 10;
export const TIMER_OFFSET = TIMER_SEC * TIMER_BASE;
export const LEADERBOARD_ID = "co_zJSsJ8TdyxG9kZLajxRDQ6M5zWd";

export const GAME_STATUS = {
  DEFAULT: "default", // not started (menu)
  ONGOING: "ongoing", // ongoing - timer on
  OVER: "over", // game over - lost
};

export const DEFAULT_STATE = {
  game: {
    userHighScore: 0,
    highScoreCreated: false,
    score: 0,
    status: GAME_STATUS.DEFAULT,
  },
  timer: {
    timer: TIMER_OFFSET,
    ongoing: false,
  },
};

export type Operator = {
  symbol: string;
  operate: (a: number, b: number) => number;
};

export const OPERATORS: Record<string, Operator> = {
  ADD: {
    symbol: "+",
    operate(a: number, b: number) {
      return a + b;
    },
  },
  SUBTRACT: {
    symbol: "-",
    operate(a: number, b: number) {
      return a - b;
    },
  },
};
