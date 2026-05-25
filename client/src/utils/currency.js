const INR_SYMBOL = '₹';

export function formatINR(amount) {
  const num = Number(amount);
  if (isNaN(num)) return `${INR_SYMBOL}0`;

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(num);
}

export function formatINRDecimal(amount) {
  const num = Number(amount);
  if (isNaN(num)) return `${INR_SYMBOL}0`;

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(num);
}

export { INR_SYMBOL };
