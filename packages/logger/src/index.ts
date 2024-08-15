export const error = (...args: unknown[]): void => {
  // eslint-disable-next-line no-console -- Логгер. Logger
  console.error("ERR  ", ...args);
};

export const log = (...args: unknown[]): void => {
  // eslint-disable-next-line no-console -- Логгер. Logger
  console.log("LOG  ", ...args);
};

export const info = (...args: unknown[]): void => {
  // eslint-disable-next-line no-console -- Логгер. Logger
  console.info("INFO ", ...args);
};
