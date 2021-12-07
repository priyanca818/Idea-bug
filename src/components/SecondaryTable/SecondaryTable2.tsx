import React from 'react';
import styled from 'styled-components';
import Select from '../Select';
/* import vars from '../styles/vars';
import Button, { themes } from './Buttons';
import Spinner from './Spinner'; */


import {
  SecondaryTable2,
  SecondaryTable2Options,
} from './';


export const Type2 = () => {
  const groupTableProps: SecondaryTable2Options = {
    rowIds,
    rows,
    heads,
    width: '100%',
    height: '500px',

    styles: {
      column: {
        productCount: { textAlign: 'right', paddingRight: '5  px' },
      },
    },
  };
  return <SecondaryTable2 {...groupTableProps} />;
};

/* export const type3 = () => {
  const groupTableProps: SecondaryTable3Options = {
    rows: rowIds.map((id) => rows[id]),
    heads,
    width: '538px',
    height: '561px',
    headerButton: {
      text: 'CREATE NEW GROUP',
      onClick: () => {},
      // onClick: () => history.push('/products/product-groups/create-new-group'),
    },
    styles: {
      column: {
        productCount: { textAlign: 'right', paddingRight: '10px' },
      },
    },
  };
  return <SecondaryTable3 {...groupTableProps} />;
};
 */


const Container = styled.div`
  /* height          : 100vh; */
  /* top             : 0; */
  /* left            : 0; */
  /* right           : 0; */
  /* bottom          : 0; */
  height: 100vh;
  width: 100vw;
  display: grid;
  position: absolute;
  place-content: center;
  background-color: #f2f2f2;
  /* border: 1px solid red; */
`;

const heads = [
  { id: 'CreatedOn', titleData: 'Created ON' },
  { id: 'description', titleData: 'Description' },
  { id: 'Type', titleData: 'Type' },
  { id: 'Page', titleData: 'Page' },
  { id: 'submittedBy', titleData: 'Submitted By' },

];
const rows = {
  1: {
    createdOn: '11-11-11',
    description: 'this is it',
    Type: 'IDEA',
    Page: '/blackpink',
    submittedBy: "Priyanka",
    status: {}
  },
  2: {
    CreatedOn: '11-11-11',
    description: 'Campaign detail page > Targeting: Unable to change bids',
    Type: 'BUG',
    Page: '/blackpink',
    submittedBy: "Priyanka",
  },
  3: {
    CreatedOn: '11-11-11',
    description: 'this is it',
    Type: 'BUG',
    Page: '/blackpink',
    submittedBy: "Priyanka",
  },
  4: {
    CreatedOn: '11-11-11',
    description: 'Product dimension should be renamed as Advertised Product as we already have Product Search Term which leads to confusion.',
    Type: 'IDEA',
    Page: '/blackpink',
    submittedBy: "Priyanka",
  },
  5: {
    CreatedOn: '11-11-11',
    description: 'Even save a list to apply to other campaigns or ad groups. That way we can block similar terms that are junk across multiple campaigns.',
    Type: 'IDEA',
    Page: '/blackpink',
    submittedBy: "Priyanka",
  },
  6: {
    CreatedOn: '11-11-11',
    description: 'this is it',
    Type: 'IDEA',
    Page: '/blackpink',
    submittedBy: "Priyanka",
  },
  7: {
    CreatedOn: '11-11-11',
    description: 'this is it',
    Type: 'IDEA',
    Page: '/blackpink',
    submittedBy: "Priyanka",
  },
  8: {
    CreatedOn: '11-11-11',
    description: 'this is it',
    Type: 'IDEA',
    Page: '/blackpink',
    submittedBy: "Priyanka",
  },




};
const rowIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
