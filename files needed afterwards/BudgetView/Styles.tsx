import { Link } from 'react-router-dom';
import styled from 'styled-components';

import yay from '@/assets/Graphics/yay.svg';

import { Container } from './advertisingAnalytics.styles';

export const HeatMapContainer = styled.div`
  width: 780px;
  padding: 15px 0 15px 0;
  /* margin: 25px 0 0 0; */
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: 0 1px 6px 0 #dae0e9;

  & > div:first-child {
    padding: 0 15px 0 15px;
  }
`;

export const PieChartContainer = styled.div`
  height: 530px;
  width: 383px;
  /* margin: 25px 0 0 0; */
  padding: 15px;
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: 0 1px 6px 0 #dae0e9;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FrequencyTableContainer = styled.div`
  height: 526px;
  width: 1178px;
  margin: 15px 0 80px 0;
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: 0 1px 6px 0 #dae0e9;

  & > div:first-child {
    padding: 15px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  }
`;
export const PrimaryTableContainer = styled.div`
  /* height: 526px; */
  height: 445px;
  /* width: 1178px; */
  /* padding-bottom: 5px; */
  /* margin: 0 0 0 0; */
  /* border-radius: 7px; */
  /* background-color: #ffffff; */
  /* box-shadow: 0 1px 6px 0 #dae0e9; */
`;

export const SubHeading = styled.div`
  color: #acb5c2;
  font-family: 'Open Sans', sans-serif;
  font-size: 11px;
  letter-spacing: -0.1px;
  line-height: 15px;

  /* codestream test */
`;

export const YeaMsgBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: 'Open Sans', sans-serif;

  div:last-child {
    color: #222222;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    letter-spacing: -0.2px;
    line-height: 27px;
    text-align: center;

    margin: 30px 0 0 0;
  }
`;
export const YayImg = styled.div`
  box-sizing: border-box;
  transition: 400ms;
  background-size: cover;
  background-repeat: no-repeat;

  height: 228px;
  width: 278px;
  background-image: url(${yay});
`;

export const ItemLink = styled(Link)`
  color: #0295f6;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.1px;
  line-height: 17px;

  &:visited {
    color: #0295f6;
  }
`;
export const ChartContainer = styled(Container)`
  width: 90%;
  /* width: 1178px; */
  height: 568px;

  background-color: #ffffff;
`;
