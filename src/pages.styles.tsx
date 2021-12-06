import styled, { css } from 'styled-components';

import { DivMixin, DivProps } from './components/Div';

export const ReSizeWidth = (width: number) => css`
  @media screen and (min-width: 1440px) {
    width: ${width}px;
  }
`;

export const PageWindow = styled.div<DivProps>`
  color: #222222;
  width: 100%;
  display: flex;
  margin: 51px 0 0 0;
  position: relative;
  box-sizing: border-box;
  flex-direction: column;
  background-color: #f1f4f8;
  * {
    box-sizing: border-box;
  }
  ${DivMixin}
`;

export const The1280Window = styled.div<DivProps>`
  color: #222222;
  margin: 0 auto;
  max-width: 1280px;
  min-width: 1280px;

  ${DivMixin}
`;

export const The1440Window = styled.div<DivProps>`
  color: #222222;
  max-width: 1280px;
  min-width: 1280px;

  @media screen and (min-width: 1440px) {
    max-width: 1440px;
    min-width: 1440px;
  }

  /* @media screen and (min-width: 1920px) {
    max-width: 1847px;
    min-width: 1847px;
  } */

  ${DivMixin}
`;

The1440Window.defaultProps = {

};

export interface IProdV2ContainerProps {
  margin?: string;
}

export const ProdV2Container = styled.div<IProdV2ContainerProps>`
  margin-left: 20px;
  margin-right: auto;

  @media screen and (min-width: 1280px) {
    max-width: 1280px;
    min-width: 1200px;
    margin-left: 20px;
  }
  @media screen and (min-width: 1440px) {
    max-width: 1440px;
    min-width: 1347px;
    margin-left: 53px;
  }

  @media screen and (min-width: 1500px) {
    max-width: 1440px;
    min-width: 1347px;
    margin-left: 20px;
  }
`;

export const CenterPage = styled.div<DivProps>`
  margin: 25px 20px 50px 72px;

  /* @media screen and (min-width: 1440px) {
    margin: 25px 20px 50px 72px;
  } */

  /* @media screen and (min-width: 1920px) {
    margin: 25px 20px 50px 72px;
  } */

  ${DivMixin}
`;
