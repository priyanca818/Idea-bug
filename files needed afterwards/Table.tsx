import React from 'react';


import SecondaryTable from './SecondaryTable';


//with title

 
///////////////////////////// Plain table /////////////////////////////////////////

const plainHeaderData = [
  {
    header: 'Placement',
    key: 'placement',
    align: 'left',
  },
  {
    header: 'Impressions',
    key: 'impressions',
    align: 'right',
  },
  {
    header: 'Clicks',
    key: 'clicks',
    align: 'right',
  },
  {
    header: 'Conversion',
    key: 'conversion',
    align: 'right',
  },
  {
    header: 'ACOS 14d',
    key: 'acos14d',
    align: 'right',
  },
  {
    header: 'Spend 14d',
    key: 'spend14d',
    align: 'right',
  },
  {
    header: 'Sales 14d',
    key: 'sales14d',
    align: 'right',
  },
];

const plainRowData = [
  {
    id: '1',
    placement: 'Top of search(First Page)',
    impressions: '3,401,203',
    clicks: '3,405',
    conversion: '31.23%',
    acos14d: '23.91%',
    spend14d: '3,104,131',
    sales14d: '1.02',
  },
  {
    id: '2',
    placement: 'Product Page',
    impressions: '3,401,203',
    clicks: '3,405',
    conversion: '31.23%',
    acos14d: '23.91%',
    spend14d: '3,104,131',
    sales14d: '1.02',
  },
  {
    id: '3',
    placement: 'Rest of Search',
    impressions: '3,401,203',
    clicks: '3,405',
    conversion: '31.23%',
    acos14d: '23.91%',
    spend14d: '3,104,131',
    sales14d: '100.2',
  },
];

////////////////////////// End of Plain table //////////////////////////////////////////

/////////////////////////// Title table ////////////////////////////////////////////////

const paymentHeaderData = [
  {
    header: 'Date',
    key: 'date',
    align: 'left',
  },
  {
    header: 'Plan',
    key: 'plan',
    align: 'left',
  },
  {
    header: 'Paid By',
    key: 'paidby',
    align: 'left',
  },
  {
    header: 'Paid With',
    key: 'paidwith',
    align: 'left',
  },
  {
    header: 'Bill Cycle',
    key: 'billcycle',
    align: 'left',
  },
  {
    header: 'Total Paid',
    key: 'totalpaid',
    align: 'right',
  },
  {
    header: '',
    key: 'PDF',
    align: 'left',
    clickableWithLink: true,

  },
];

const paymentRowData = [
  {
    id: 1,
    date: '30th June 2018',
    plan: 'PRO',
    paidby: 'sarang@demandhelm.com',
    paidwith: 'ending 9999',
    billcycle: 'Annually',
    totalpaid: '$4788',
    PDF: 'PDF',
  },
  {
    id: 2,
    date: '1st September 2018',
    plan: 'BASIC',
    paidby: 'sarang@demandhelm.com',
    paidwith: 'ending 9999',
    billcycle: 'Annually',
    totalpaid: '$1188',
    PDF: 'PDF',
  },
  {
    id: 3,
    date: '1st July 2018',
    plan: 'BASIC',
    paidby: 'sarang@demandhelm.com',
    paidwith: 'ending 9999',
    billcycle: 'Monthly',
    totalpaid: '$99',
    PDF: 'PDF',
  },
  {
    id: 4,
    date: '1st June 2018',
    plan: 'BASIC',
    paidby: 'sarang@demandhelm.com',
    paidwith: 'ending 9999',
    billcycle: 'Monthly',
    totalpaid: '$99',
    PDF: 'PDF',
  },
];

////////////////////////// End of Title table ///////////////////////////////////////////////

/////////////////////////// Title & Subtitle table //////////////////////////////////////////

const productGroupsHeaderData = [
  {
    header: 'List Name',
    key: 'listname',
    align: 'left',

    clickable: true,
  },
  {
    header: 'Date Created',
    key: 'datecreated',
    align: 'left',
  },
  {
    header: 'No of Products',
    key: 'noofproducts',
    align: 'right',
  },
];

const productGroupsRowData = [
  {
    id: 1,
    listname: 'Christmas Special',
    datecreated: '30th June 2018',
    noofproducts: '48',
  },
  {
    id: 2,
    listname: 'Black Friday Special',
    datecreated: '30th November 2018',
    noofproducts: '29',
  },
  {
    id: 3,
    listname: 'Discount Coupons',
    datecreated: '30th June 2018',
    noofproducts: '48',
  },
  {
    id: 4,
    listname: 'Octobers Special',
    datecreated: '30th November 2018',
    noofproducts: '29',
  },
  {
    id: 5,
    listname: 'Discount Coupons',
    datecreated: '30th June 2018',
    noofproducts: '48',
  },
  {
    id: 6,
    listname: 'Black Friday Special',
    datecreated: '30th November 2018',
    noofproducts: '29',
  },
  {
    id: 7,
    listname: 'Christmas Special',
    datecreated: '30th June 2018',
    noofproducts: '48',
  },
  {
    id: 8,
    listname: 'Octobers Special',
    datecreated: '30th November 2018',
    noofproducts: '29',
  },
  {
    id: 9,
    listname: 'Discount Coupons',
    datecreated: '30th June 2018',
    noofproducts: '48',
  },
  {
    id: 10,
    listname: 'Novembers Special',
    datecreated: '30th November 2018',
    noofproducts: '29',
  },
];

const count = `${Object.keys(productGroupsRowData).length} lists`;

//////////////////////////////////// End of Title  & Subtitle table //////////////////////

/////////////////////////////////// Button table ////////////////////////////////////////
const adAnalyticsHeaderData = [
  {
    header: 'Name',
    key: 'name',
    align: 'left',
  },
  {
    header: 'Type',
    key: 'type',
    align: 'left',
  },
  {
    header: 'API',
    key: 'api',
    align: 'left',
  },
  {
    header: 'Email',
    key: 'email',
    align: 'left',
  },
  {
    header: 'Country Code',
    key: 'countrycode',
    align: 'left',
  },
  {
    header: '',
    key: 'editaccount',
    align: 'left',
    isLinkRed: true,
  },
];

const adAnalyticsRowData = [
  {
    id: 1,
    name: 'Pilot Account',
    type: 'Vendor',
    api: 'AMS',
    email: 'sarang@demandhelm.com',
    countrycode: 'US',
    editaccount: 'editaccount',
  },
  {
    id: 2,
    name: 'Second Account',
    type: 'Vendor',
    api: 'AMS',
    email: 'sarang@amazon.com',
    countrycode: 'US',
    editaccount: 'editaccount',
  },
  {
    id: 3,
    name: 'Holiday Specials',
    type: 'Seller',
    api: 'AMS',
    email: 'holiday@demandhelm.com',
    countrycode: 'US',
    editaccount: 'editaccount',
  },
  {
    id: 4,
    name: 'Misc.Account',
    type: 'Seller',
    api: 'AMS',
    email: 'misc@demandhelm.com',
    countrycode: 'US',
    editaccount: 'editaccount',
  },
];



<SecondaryTable
headerData={paymentHeaderData}
rowData={paymentRowData}
tableType='title'
title='Payment History'
wrapperStyles={{ width: '792px', height: '300px' }}
/>
///////////////////////////////// End of Button table ///////////////////////////////////////////
