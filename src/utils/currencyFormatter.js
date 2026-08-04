import countries from '../data/countries.json';

export const formatCurrency = (amount, countryCode) => {
  if (!amount || isNaN(amount)) return "N/A";

  // Country code se currency aur locale nikalna
  const countryData = countries.find(c => c.code === countryCode);
  const currencyCode = countryData ? countryData.currency : 'USD';
  
  // Locale set karna (India ke liye en-IN, baaki ke liye en-US basic formatting ke liye)
  const locale = countryCode === 'IN' ? 'en-IN' : 'en-US';

  // Format currency
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0
  });

  return formatter.format(amount);
};