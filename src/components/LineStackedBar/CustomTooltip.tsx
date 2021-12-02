import React from 'react';
import styled, { css } from 'styled-components';
import vars from '../../styles/vars';

interface Props {
  title?: string | number | undefined;
  body?: string | number | undefined;
  posX?: number | undefined;
  posY?: number | undefined;
  caretX?: number | undefined;
  caretY?: number | undefined;
  caretAlign?: string | undefined;
  width?: number | undefined;
}

const ChartTooltip: React.FC<Props> = ({ title, body, width, posX, posY, caretX,
  caretY, caretAlign }) => {

  return (
    <Main>
      <div>
        <Caret caretX={caretX} caretY={caretY} caretAlign={caretAlign} />
      </div>
      <Container width={width} posX={posX} posY={posY}>
        <Title>{title}</Title>
        <span>{body}</span>
      </Container>
    </Main>
  );
};

export default ChartTooltip;

const Main = styled.div`
  z-index: 9;
  visibility: visible;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
`;

const Caret = styled.span<{caretX: number | undefined, caretY: number | undefined,
  caretAlign: string | undefined}>`
  z-index: 9;
  visibility: visible;
  width: 0;
  height: 0;
  position: absolute;
  pointer-events: none;
  display: inline-block;
  border: 7px solid transparent;
  border-${({caretAlign}) => caretAlign ? caretAlign : 'top' }-color: ${vars.colors.grey2};

  ${({caretY}) => (caretY || caretY === 0) && css`
    top: ${caretY}px;
  `}

  ${({caretX}) => (caretX || caretX === 0) && css`
    left: ${caretX}px;
  `}
`;

const Container = styled.div<{width: number | undefined,
  posX: number | undefined, posY: number | undefined }>`
  z-index: 9;
  visibility: visible;
  display: inline-flex;
  position: absolute;
  flex-direction: column;
  background-color: ${vars.colors.grey2};
  box-shadow: 0 0 5px 0 rgba(165,165,165,0.5);
  color: #FFFFFF;
  font-family: 'Nunito', sans-serif;
  font-size: 24px;
  padding: 6px;
  left: 0;
  top: 0;
  pointer-events: none;
  min-width: 69px;

  ${({width}) => width && css`
    width: ${width}px;
  `}

  ${({posY}) => posY && css`
    top: ${posY}px;
  `}

  ${({posX}) => posX && css`
    left: ${posX}px;
  `}

`;

const Title = styled.span`
  font-size: 9px;
  font-weight: 800;
  padding-bottom: 1px;
`;
