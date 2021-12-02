import React from 'react';
import styled from 'styled-components';

interface Props {
  score: number;
  styles?: {};
}

export const COLORS = {
  RED: '#D61414',
  ORANGE: '#FFA815',
  GREEN: '#00CC55',
};

const ContentScore: React.FC<Props> = ({ score, styles }) => {
  const Color = score > 70 ? COLORS.GREEN : score > 50 ? COLORS.ORANGE : COLORS.RED;
  return (
    <Container Color={Color} style={styles}>
      <div>{score}</div>
    </Container>
  );
};

const Container = styled.div<{ Color: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 33px;
    width: 50px;
    border-radius: 5px;
    background-color: ${({ Color }) => Color};
    color: #ffffff;
    font-family: 'Open Sans';
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.1px;
    line-height: 17px;
    text-align: center;
`;

export default ContentScore;
