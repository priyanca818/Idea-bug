
import React from 'react';
import styled from 'styled-components';

import horn from '../assets/svg/advertising-637082.svg';
import country from '../assets/svg/country.svg';

import chevron_right from '../assets/svg/old_icons/chevron_right.svg';
import expand_less from '../assets/svg/old_icons/expand_less.svg';
import expand_more from '../assets/svg/old_icons/expand_more.svg';

const icons = {
  horn,
  country,
  arrow_back_has_prev: '/assets/svg/arrow-left-222222.svg',
  arrow_back: '/assets/svg/arrow-left-ACB5C2.svg',
  arrow_forward_has_next: '/assets/svg/arrow-right-222222.svg',
  arrow_forward: '/assets/svg/arrow-right-ACB5C2.svg',
  calendar: '/assets/svg/old_icons/calendar.svg',
  check: '/assets/svg/tick-0295F6.svg',
  chevron_left: '/assets/svg/old_icons/chevron_left.svg',
  chevron_right,
  close: '/assets/svg/old_icons/close.svg',
  expand_less,
  expand_more,
  export: '/assets/svg/old_icons/export.svg',
  filter: '/assets/svg/old_icons/filter.svg',
};

const colors = {
  white: '#ffffff',
  grey: '#acb5c2',
  blue: '#0295F6',
  black: '#232323',
  darkGray: '#222222',
};

export type TIcon =
  | 'horn'
  | 'country'
  | 'arrow_back'
  | 'arrow_forward'
  | 'arrow_forward_has_next'
  | 'arrow_back_has_prev'
  | 'calendar'
  | 'check'
  | 'chevron_left'
  | 'chevron_right'
  | 'close'
  | 'expand_less'
  | 'expand_more'
  | 'export'
  | 'filter';

export type TColor = 'white' | 'grey' | 'blue' | 'black' | 'darkGray';

interface IconProps {
  icon: TIcon;
  color: TColor;
  width?: string;
  height?: string;
  hasPrev?: boolean;
  hasNext?: boolean;
}


const Icon: React.FC<IconProps> = ({
  icon,
  color,
  width = '16px',
  height = '16px',
}) => {
  return (
    <IconImage
      icon={icons[icon]}
      color={colors[color]}
      width={width}
      height={height}
    />
  );
};

export default Icon;

const IconImage = styled.div<{
  icon: string;
  color: string;
  width: string;
  height: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  mask-image: url(${({ icon }) => icon});
  mask-position: center center;
  mask-repeat: no-repeat;
  mask-size: cover;
  background-color: ${({ color }) => color};
`;
