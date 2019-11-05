export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatCurrency = (amount) => {
  let numResult = '';
  let count = 0;
  for (let index = amount.length - 3; index > 0; index -= 3) {
    count += 1;
    const separate = count % 2 === 0 ? "'" : '.';
    numResult = `${separate}${amount.substr(index, 3)}${numResult}`;
  }
  numResult = amount.length % 3 === 0 ? `${amount.substr(0, 3)}${numResult}` : `${amount.substr(0, amount.length % 3)}${numResult}`;
  return `$${numResult}`;
};
