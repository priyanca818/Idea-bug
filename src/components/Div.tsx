import styled, { css } from 'styled-components';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

export interface DivProps
  extends GridProps,
  SpaceProps,
  ColorProps,
  LayoutProps,
  BorderProps,
  ShadowProps,
  FlexboxProps,
  PositionProps,
  TypographyProps,
  BackgroundProps { }

export const Div = styled.div<DivProps>(
  {
    boxSizing: 'border-box',
    minWidth: 0,
    minHeight: 0,
  },
  grid,
  space,
  color,
  layout,
  border,
  shadow,
  flexbox,
  position,
  typography,
  background,
);

export const DivMixin = css(
  grid,
  space,
  color,
  layout,
  border,
  shadow,
  flexbox,
  position,
  typography,
  background,
);
