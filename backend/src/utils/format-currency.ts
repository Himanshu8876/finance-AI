export function convertToCents(amount: number) {
  // Convert rupees to paise (1 rupee = 100 paise)
  return Math.round(amount * 100);
}

export function convertToDollarUnit(amount: number) {
  return amount / 100;
}

export function formatCurrency(amount: number) {
  // Format amount as INR (₹)
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}
