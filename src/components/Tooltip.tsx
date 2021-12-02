import React, { CSSProperties } from 'react';


import styled from 'styled-components';

import styledCUtils from '../utils/styledCUtils';


type custom =
  | 'color'
  | 'title'
  | 'height'
  | 'maxWidth'
  | 'arrowSize'
  | 'buttonValue'
  | 'arrowPositionX'
  | 'arrowPositionY'
  | 'containerPositionX'
  | 'containerPositionY';

const _U = styledCUtils<ITooltipProps, custom>();

export const TooltipContainer = styled.div<ITooltipProps>`
  position: ${(props) => (props.positionUnset ? 'unset' : 'relative')};

  * {
    font-family: 'Open Sans', sans-serif;
  }

  /* variables */
  --width: ${({ width }) => width ?? 'max-content'};
  --maxWidth: ${({ maxWidth }) => maxWidth ?? 'max-content'};
  --arrowSize: ${_U('arrowSize', 8)}px;
  --arrowPosX: ${_U('arrowPositionX', 0)};
  --arrowPosY: ${_U('arrowPositionY', 0)};
  --keepVisible: ${(props) => (props.visible ? 'visible' : 'hidden')};
  --opacity: ${(props) => (props.visible ? 1 : 0)};
  --tooltipColor: ${_U('color', '#4b5461')};
  --containerPosX: ${_U('containerPositionX', 0)};
  --containerPosY: ${_U('containerPositionY', 0)};

  .tooltipText {
    /* width: max-content; */
    /* width: -moz-max-content; */
    width: var(--maxWidth);
    max-width: var(--maxWidth);

    color: #ffffff;
    background-color: var(--tooltipColor);

    z-index: ${({style}) => style?.zIndex ? style?.zIndex : 15};
    display: block;
    padding: 3px 10px;
    position: absolute;
    text-align: center;
    box-sizing: border-box;
    box-shadow: 0 0 5px 0 rgba(165, 165, 165, 0.5);
    border-radius: 5px;

    opacity: var(--opacity);
    visibility: var(--keepVisible);
    transition-property: opacity, visibility;
    transition-duration: 0s, 1s;

    &::after {
      content: '';
      border: var(--arrowSize) solid transparent;
      position: absolute;
    }
  }

  &:hover .tooltipText {
    opacity: 1;
    visibility: visible;

    transition-property: visibility, opacity;
    transition-duration: 0s, 400ms;
    transition-delay: 0s, 250ms;
  }

  [data-arrowdirection='bottom'] {
    left: var(--containerPosX);
    bottom: var(--containerPosY);
  }

  [data-arrowdirection='bottom']::after {
    top: 100%;
    left: var(--arrowPosX);
    border-top-color: var(--tooltipColor);
  }

  [data-arrowdirection='top'] {
    top: var(--containerPosY);
    left: var(--containerPosX);
  }

  [data-arrowdirection='top']::after {
    bottom: 100%;
    left: var(--arrowPosX);
    border-bottom-color: var(--tooltipColor);
  }

  [data-arrowdirection='left'] {
    top: var(--containerPosY);
    left: var(--containerPosX);
  }

  [data-arrowdirection='left']::after {
    top: var(--arrowPosY);
    right: 100%;
    border-right-color: var(--tooltipColor);
  }

  [data-arrowdirection='right'] {
    top: var(--containerPosY);
    right: var(--containerPosX);
  }

  [data-arrowdirection='right']::after {
    top: var(--arrowPosY);
    left: 100%;
    border-left-color: var(--tooltipColor);
  }
`;




export interface ITooltipProps {
  color?: string;
  title?: string;
  height?: number;
  visible?: boolean;
  content?: React.ReactNode;
  contentStyles?: CSSProperties;
  width?: string;
  maxWidth?: string;

  positionUnset?: boolean; // default position : relative

  buttonValue?: string;

  arrowSize?: number;
  arrowDirection: string;
  arrowPositionX?: string;
  arrowPositionY?: string;

  containerPositionX?: string;
  containerPositionY?: string;

  style?: CSSProperties;
}

export const Tooltip: React.FC<ITooltipProps> = (props) => (
  <TooltipContainer {...props}>
    {props.children}
    <div
      className='tooltipText'
      style={props.contentStyles}
      data-arrowdirection={props.arrowDirection}
    >
      {props.content}
    </div>
  </TooltipContainer>
);

export default Tooltip;
