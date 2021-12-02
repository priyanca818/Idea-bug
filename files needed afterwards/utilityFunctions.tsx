import moment from 'moment';
import { ReactText } from 'react';

export const Currency = {
  IN: {
    symbol: '₹',
    currency: 'inr',
    locales: 'en-IN',
    separator: 'lakh',
  },
  US: {
    symbol: '$',
    currency: 'usd',
    locales: 'en-us',
    separator: 'thousand',
  },
  DE: {
    symbol: '€',
    currency: 'eur',
    locales: 'de-DE',
    separator: 'thousand',
  },
  FR: {
    symbol: '€',
    currency: 'eur',
    locales: 'fr-FR',
    separator: 'thousand',
  },
  MX: {
    symbol: '$',
    currency: 'mxn',
    locales: 'en-us',
    separator: 'thousand',
  },
  CA: {
    symbol: '$',
    locales: 'en-CA',
    currency: 'cad',
    separator: 'thousand',
  },
  UK: {
    symbol: '£',
    locales: 'en-GB',
    currency: 'gbp',
    separator: 'thousand',
  },
  AE: {
    symbol: 'د.إ',
    locales: 'ar_AE',
    currency: 'AED',
    separator: 'thousand',
  },
  jpy: {
    symbol: '¥',
    locales: 'ja-JP',
    separator: 'thousand',
  },
  sgd: {
    symbol: '$',
    locales: 'zh-SG',
    separator: 'thousand',
  },
  aud: {
    symbol: '$',
    locales: 'en-AU',
    separator: 'thousand',
  },
  default: {
    symbol: '',
    locales: 'en-us',
    currency: 'usd',
    separator: 'thousand',
  },
};

export const enumerateDaysBetweenDates = function (
  startDate: string,
  endDate: string,
) {
  const dates: Date[] = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  while (currDate.add(1, 'days').diff(lastDate) <= 0) {
    dates.push(currDate.clone().toDate());
  }

  return dates;
};

export const formatNumber = (amount: ReactText, locales: string = 'en-us') =>
  new Intl.NumberFormat(locales, {
    // minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(+amount);

export const formatNumberDecimal = (
  amount: ReactText,
  locales: string = 'en-us',
) =>
  new Intl.NumberFormat(locales, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(+amount);

export const formatNumberCompact = (
  amount: ReactText,
  maximumFractionDigits: number = 2,
  locales: string = 'en-us',
) =>
  new Intl.NumberFormat(locales, {
    // @ts-ignore
    notation: 'compact',
    // minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(+amount);

export const formatPercent = (amount: ReactText, locales: string = 'en-us') =>
  new Intl.NumberFormat(locales, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(+amount / 100);

export const formatPercentDecimal = (
  amount: ReactText,
  locales: string = 'en-us',
) =>
  new Intl.NumberFormat(locales, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(+amount / 100);

export const formatPercentCompact = (
  amount: ReactText,
  locales: string = 'en-us',
) =>
  new Intl.NumberFormat(locales, {
    // @ts-ignore
    notation: 'compact',

    style: 'percent',
    // minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(+amount / 100);

type FormatCurrency = {
  decimal?: number;
  country?: string;
  locales?: string;
  currency?: string;
};

export const formatCurrency = (
  amount: ReactText,
  options: FormatCurrency = {},
) => {
  const { country = 'US', decimal = 2, locales = 'en-us' } = options;
  const countryInLocal = localStorage.getItem('country');
  const currencyInLocal =
    Currency[countryInLocal ? countryInLocal : 'US'].currency;

  let currency;
  if (options.country !== undefined && country) {
    currency = Currency[country].currency
      ? Currency[country].currency
      : currencyInLocal;

    localStorage.setItem('symbol', Currency[country].symbol);
  } else {
    currency = currencyInLocal;
    localStorage.setItem(
      'symbol',
      Currency[countryInLocal ? countryInLocal : 'US'].symbol,
    );
  }

  return new Intl.NumberFormat(locales, {
    currency,
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: decimal,
  }).format(+amount);
};

type FormatCurrencyDecimal = {
  country?: string;
  locales?: string;
  currency?: string;
};

export const formatCurrencyDecimal = (
  amount: ReactText,
  options: FormatCurrencyDecimal = {},
) => {
  const { country = 'US', locales = 'en-us' } = options;
  const countryInLocal = localStorage.getItem('country');
  const currencyInLocal =
    Currency[countryInLocal ? countryInLocal : 'US'].currency;

  let currency;
  if (options.country) {
    currency = Currency[country].currency
      ? Currency[country].currency
      : currencyInLocal;
    localStorage.setItem('symbol', Currency[country].symbol);
  } else {
    currency = currencyInLocal;
    localStorage.setItem(
      'symbol',
      Currency[countryInLocal ? countryInLocal : 'US'].symbol,
    );
  }

  return new Intl.NumberFormat(locales, {
    currency,
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(+amount);
};

type FormatCurrencyCompact = {
  country?: string;
  locales?: string;
  currency?: string;
};

export const formatCurrencyCompact = (
  amount: ReactText,
  options: FormatCurrencyCompact = {},
) => {
  const { country = 'US', locales = 'en-us' } = options;
  const countryInLocal = localStorage.getItem('country');
  const currencyInLocal =
    Currency[countryInLocal ? countryInLocal : 'US'].currency;

  let currency;
  if (options.country) {
    currency = Currency[country].currency
      ? Currency[country].currency
      : currencyInLocal;
    localStorage.setItem('symbol', Currency[country].symbol);
  } else {
    currency = currencyInLocal;
    localStorage.setItem(
      'symbol',
      Currency[countryInLocal ? countryInLocal : 'US'].symbol,
    );
  }
  return new Intl.NumberFormat(locales, {
    currency,
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,

    // @ts-ignore
    notation: 'compact',
  }).format(+amount);
};

export const getProductV2Badges = (tag: string, sales_rank: string) => {
  const result = [];
  if (tag.includes("Amazon's Choice ")) {
    let keyword = tag.split("Amazon's Choice ")[1];
    keyword.trim().startsWith('in')
    ? (keyword = keyword.trim().substring(3, keyword.length - 1))
    : (keyword = keyword.trim().substring(5, keyword.length - 2));
    result.push({ keyword, tag: 'amazons_choice' });
  }
  if (tag.includes('#1 Best Seller ')) {
    let keyword = tag.split('#1 Best Seller in ')[1];
    keyword = keyword.trim().substring(0, keyword.length - 1);
    result.push({ keyword, tag: 'best_seller' });
  } else if (sales_rank === '1') {
    result.push({ keyword: undefined, tag: 'best_seller' });
  }
  return result;
};

export const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
};
