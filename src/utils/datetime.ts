import moment from 'moment';
import { LONG_MONTHS, SHORT_MONTHS } from './calendar';

export const epochFormatToDMYFormat = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const day = ordinal_suffix_of(date.getDate());
  const month = LONG_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export const prevMonth = moment().subtract(2 , 'months').format('MMMM YYYY');

const ordinal_suffix_of = (i: number) => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
};

export const epochAddDay = (seconds: number) => {
  return epochFormatToDMYFormat(seconds + 24 * 60 * 60);
};

export const ISOFormatToDMYFormat = (dateString: string) => {
  const date = new Date(dateString);
  const day = ordinal_suffix_of(date.getDate());
  const month = SHORT_MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

export const today = new Date();
export const APIDateFormat = 'YYYY-MM-DD';

export const dateToday = moment(today).format(APIDateFormat);
export const date7WeeksBack = moment(today)
  .startOf('week')
  .subtract(7, 'weeks')
  .format(APIDateFormat);
export const date14DaysBack = moment(today).startOf('day').subtract(14, 'days');
export const thisWeek = `${moment(today)
  .startOf('week')
  .format('DD MMM YYYY')} - ${moment(today)
    // .endOf('week')
    .format('DD MMM YYYY')}`;
export const thisMonth = `${moment(today)
  .startOf('month')
  .format('DD MMM YYYY')} - ${moment(today)
    // .endOf('month')
    .format('DD MMM YYYY')}`;

export const lastWeek = `${moment(today)
  .subtract(1, 'weeks')
  .startOf('week')
  .format('DD MMM YYYY')} - ${moment(today)
    .subtract(1, 'weeks')
    .endOf('week')
    .format('DD MMM YYYY')}`;
export const lastMonth = `${moment(today)
  .subtract(1, 'month')
  .startOf('month')
  .format('DD MMM YYYY')} - ${moment(today)
    .subtract(1, 'month')
    .endOf('month')
    .format('DD MMM YYYY')}`;

export const previousWeek = `${moment(today)
  .subtract(2, 'weeks')
  .startOf('week')
  .format('DD MMM YYYY')} - ${moment(today)
    .subtract(2, 'weeks')
    .endOf('week')
    .format('DD MMM YYYY')}`;
export const previousMonth = `${moment(today)
  .subtract(2, 'month')
  .startOf('month')
  .format('DD MMM YYYY')} - ${moment(today)
    .subtract(2, 'month')
    .endOf('month')
    .format('DD MMM YYYY')}`;

export const dateRanges = {
  'previousWeek':{
    from: moment(today)
      .subtract(2, 'week')
      .startOf('week')
      .format('YYYY-MM-DD'),
    until: moment(today).subtract(2, 'week').endOf('week').format('YYYY-MM-DD')
  },
  'thisWeek': {
    from: moment(today).startOf('week').format('YYYY-MM-DD'),
    until: dateToday,
  },
  'lastWeek': {
    from: moment(today)
      .subtract(1, 'week')
      .startOf('week')
      .format('YYYY-MM-DD'),
    until: moment(today).subtract(1, 'week').endOf('week').format('YYYY-MM-DD'),
  },
  'last7Days': {
    from: moment(today).subtract(7, 'days').format('YYYY-MM-DD'),
    until: dateToday,
  },
  'last14Days': {
    from: moment(today).subtract(14, 'days').format('YYYY-MM-DD'),
    until: dateToday,
  },
  'last35Days': {
    from: moment(today).subtract(35, 'days').format('YYYY-MM-DD'),
    until: dateToday,
  },
  'lastMonth': {
    from: moment(today)
      .subtract(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DD'),
    until: moment(today)
      .subtract(1, 'month')
      .endOf('month')
      .format('YYYY-MM-DD'),
  },
  'thisMonth': {
    from: moment(today).startOf('month').format('YYYY-MM-DD'),
    until: dateToday,
  },
  'previousMonth':{
    from: moment(today)
      .subtract(2, 'month')
      .startOf('month')
      .format('YYYY-MM-DD'),
    until: moment(today)
      .subtract(2, 'month')
      .endOf('month')
      .format('YYYY-MM-DD'),
  },
};

export const dateOptions = [
  { value: 'last7Days', title: 'Last 7 Days' },
  { value: 'last14Days', title: 'Last 14 Days' },
  { value: 'last35Days', title: 'Last 35 Days' },
  { value: 'thisWeek', title: 'This Week' },
  { value: 'lastWeek', title: 'Last Week' },
  { value: 'previousWeek', title: 'Previous Week' },
  { value: 'thisMonth', title: 'This Month' },
  { value: 'lastMonth', title: 'Last Month' },
  { value: 'previousMonth', title: 'Previous Month' },
];

export const dateMap = {
  last7Days : 'Last 7 Days' ,
  last14Days : 'Last 14 Days' ,
  last35Days : 'Last 35 Days' ,
  thisWeek : 'This Week' ,
  lastWeek : 'Last Week' ,
  previousWeek : 'Previous Week' ,
  thisMonth : 'This Month' ,
  lastMonth : 'Last Month' ,
  previousMonth : prevMonth ,
};