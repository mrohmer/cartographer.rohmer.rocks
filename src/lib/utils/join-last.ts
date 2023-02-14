export const joinLast = (arr: (string|number)[], delimiter = ', ', lastDelimiter = ' & ') => {
  if (!arr) {
    return '';
  }
  if (arr.length <= 2) {
    return arr.join(lastDelimiter);
  }
  const [last, ...items] = [...arr].reverse();

  return [
    items.reverse().join(delimiter),
    last
  ]
    .join(lastDelimiter)
}
