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
