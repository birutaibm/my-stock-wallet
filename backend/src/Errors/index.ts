export const ShortPositionNotSupported = () => {
  throw new Error("This implementation version do not support registry of short positions yet");
};

export const DayTradeNotSupported = () => {
  throw new Error("This implementation version do not support registry of same stock buy and sell at the same brokerage note");
};
