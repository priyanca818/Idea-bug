import styled from 'styled-components';

import { DivMixin, DivProps } from '../components/Div';

export const Container = styled.div`
  margin: 25px 0 0 0;
  padding: 15px;
width:88%;
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow:0 3px 10px rgb(0 0 0 / 0.2);
margin-left:5%;
margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  /* justify-content: start; */
`;
export const AdAnalyticsHeading = styled.div`
  /* height: 22px;
  width: 188px; */
  color: ${({ theme }) => theme.colors.grey1};
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.2px;
  line-height: 22px;
`;

export const HDBWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
`;

export const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ChartBox = styled(Box)<DivProps>`
  height: calc(100% - 90px);
  ${DivMixin}
`;
