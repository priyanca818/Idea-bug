import styled from 'styled-components';

import vars from '../../styles/vars';

export const SecondaryTable__Container = styled.div<{
  height?: string;
  width?: string;
}>`
  padding: 0;
  border-radius: 7px;
  background-color: #ffffff;

  /* box-shadow: 0 1px 6px 0 #dae0e9; */

  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '100%')};
`;

export const SecondaryTable__Header = styled.div`
  margin: 0;
  /* padding: 0; */
  /* height: 44px; */
  /* padding: 10px; */
  padding: 14px 16px 13px 16px;
  display: flex;
  border-bottom: 0.5px solid ${vars.colors.grey4};
  justify-content: space-between;
  box-shadow:0px 1px 6px #dae0e9;
`;

export const SecondaryTable__HeadingWrapper = styled.div`
  margin: 0;
  height: 43px;
  display: flex;
  /* padding: 14px 16px 13px 16px; */
  flex-direction: column;
  justify-content: space-between;
  
`;

export const SecondaryTable__Heading = styled.div`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: Open Sans, sans-serif;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.1px;
`;

export const SecondaryTable__SubHeading = styled.div`
  color: ${vars.colors.grey3};
  /* margin: 10px 0 0 0; */
  padding: 0;
  font-size: 13px;
  font-family: Open Sans, sans-serif;
  line-height: 17px;
  letter-spacing: -0.1px;
`;

export const SecondaryTable__TableWrapper = styled.div`
  /* Table Wrapper */
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  box-shadow:0px 1px 6px #dae0e9;
  &::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
  }

  /* background of the scrollbar except button or resizer */
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }
  /* scrollbar itself */
  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 5px solid #fff;
  }
  /* set button(top and bottom of the scrollbar) */
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    border: 4px solid #f4f4f4;
  }
`;

export const SecondaryTable__Tr = styled.tr`
  /* Table Row */
  margin: 0;
  padding: 0;
  font-family: Open Sans, sans-serif;
  :hover{
    background-color: #eef0f1;
    transition: background-color 200ms ease 0s;
  }
`;

export const SecondaryTable__Td = styled.td`
  /* Table Data */
  margin: 0;
  padding: 5px;
  font-size: 13px;
  font-family: Open Sans, sans-serif;
  line-height: 17px;
  padding-left: 17px;
  border-bottom: 0.5px solid ${vars.colors.grey4};
  letter-spacing: -0.1px;
  &:last-child {
    /* text-align    : right; */
    padding-right: 17px;
  };

  &:first-child {
    /* text-align    : right; */
    padding-left:15px;
    padding-right:10px;
  
  };





  
`;

export const SecondaryTable__Th = styled.th`
  /* Table Heading */
  margin: 0;
  padding: 0;
  font-size: 11px;
  text-align: left;
  font-family: Open Sans, sans-serif;
  font-weight: bold;
  line-height: 15px;
  padding-left: 15px;
  border-bottom: 0.5px solid #dae0e9;
  letter-spacing: -0.1px;

  &:last-child {
    padding-right: 15px;
  }

  &:first-child {
    padding-right: 15px;
    width:70px;
  }
`;

export const SecondaryTable__Table = styled.table`
  width: 100%;
  margin: 0;
  padding: 0;
  box-shadow:0px 1px 6px #dae0e9;
  border-spacing: 0;
  border-collapse: separate;

  thead tr {
    th {
      top: 0;
      position: sticky;
      background-color: #fafbfd;
      z-index: 2;
    }
  }
`;

export const SecondaryTable__THead = styled.thead`
  /* Table Head */
  margin: 0;
  padding: 0;
  ${SecondaryTable__Tr} {
    height: 43px;
    background-color: ${vars.colors.grey6};
  }
`;

export const SecondaryTable__TBody = styled.tbody`
  /* Table Body */
  margin: 0;
  padding: 0;

  ${SecondaryTable__Tr} {
    height: 40px;
  }

  ${/*sc-selector */ SecondaryTable__Tr}:last-child {
    border-bottom: 0;
    ${SecondaryTable__Td} {
      border-bottom: 0;
    }
  }
`;
