import styled from 'styled-components';

export const LegendsContainer = styled.div<{ position?: any }>`
  width: 100%;
  height: 14px;
  display: flex;
  justify-content: ${(props) => !props.position ? 'center' : 'flex-start'};
  margin-left: ${(props) => props.position && '8px'};
  align-items: center;
  
  /* height: 14px; */
  /* width: 53px; */
  color: #222222;
  font-family: Nunito, sans-serif;
  font-size: 10px;
  letter-spacing: -0.1px;
  line-height: 14px;
`;

export const LegendWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
`;

export const LegendLabel = styled.span<{ isHidden?: boolean }>`
  text-decoration: ${({ isHidden }) => (isHidden ? 'line-through' : 'none')};
  /* text-transform: capitalize; */
`;

export const LegendSquare = styled.span<{ color?: string }>`
  display: inline-block;
  height: 14px;
  width: 14px;
  margin-right: 7px;
  border-radius: 3px;
  background-color: ${({ color }) => color ?? 'gray'};
`;

export const LegendLine = styled.span<{ color?: string }>`
  display: inline-block;
  height: 2px;
  width: 17px;
  margin-right: 7px;
  border-radius: 0.88px;
  background-color: ${({ color }) => color ?? 'gray'};
`;
