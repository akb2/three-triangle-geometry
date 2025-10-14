import { ArgType } from "./models";

const toString = (value: ArgType, quotes = true): string => {
  if (value === undefined) {
    return "\x1b[30mundefined\x1b[37m";
  } else if (value === null) {
    return "\x1b[33mnull\x1b[37m";
  } else if (Array.isArray(value)) {
    return `[${value.map(v => toString(v, quotes)).join(", ")}]`;
  } else if (typeof value === "string" && quotes) {
    return `"${value}"`;
  }

  return value.toString();
};

const argString = (value: ArgType) => `\x1b[35m${toString(value)}\x1b[37m`;

export const argsString = <T extends ArgType[]>(...args: T) => args
  .filter(arg => arg !== undefined)
  .map(argString)
  .join(", ");