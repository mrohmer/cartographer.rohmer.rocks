
export const add = (...args: (number|undefined)[]): number =>
  args.reduce((acc, cur) => acc + (cur ?? 0), 0);
