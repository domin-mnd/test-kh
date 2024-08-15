import { log } from "..";

jest.spyOn(global.console, "log");

describe("@repo/logger", () => {
  it("logs a message", () => {
    log("hello");
    // eslint-disable-next-line no-console -- Тестирование логгера. Testing the logger
    expect(console.log).toHaveBeenCalledWith("LOG  ", "hello");
  });
});
