import React, { FC, Fragment, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface HeadingProps {
  left?: ReactNode[];
  right?: ReactNode[];

  heading?: React.ReactNode;
  subheading?: React.ReactNode;

  headingFontSize?: number;
  padding?: string;
  styles?: {};
  headingStyles?: React.CSSProperties;
}

export const Heading: FC<HeadingProps> = ({
  left,
  right,
  heading,
  padding,
  subheading,
  headingFontSize = 20,
  styles,
  headingStyles,
}) => {
  return (
    <Container padding={padding} style={styles}>
      <LeftBox fd={!!subheading}>
        {!!heading && <H style={{...headingStyles}} headingFontSize={headingFontSize}>{heading}</H>}
        {!!subheading && <Subheading>{subheading}</Subheading>}
        {left?.map((node, index) => {
          return <Fragment key={index}>{node}</Fragment>;
        })}
      </LeftBox>
      <RightBox>
        {right?.map((node, index) => {
          return <Fragment key={index}>{node}</Fragment>;
        })}
      </RightBox>
    </Container>
  );
};

export default Heading;

Heading.displayName = 'Heading';

const H = styled.div<{ headingFontSize: number }>`
  color: #222222;
  font-size: ${({ headingFontSize }) => `${headingFontSize}px`};
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.2px;
  margin-bottom: 10px;
`;

const Subheading = styled.div`
  color: #acb5c2;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: -0.1px;
  margin-top: 5px;
`;

const LeftBox = styled.div<{ fd: boolean }>`
  display: flex;
  align-items: center;
  ${({ fd }) =>
    fd &&
    css`
      align-items: flex-start;
      flex-direction: column;
      /* justify-content: space-between; */
    `}
`;
const RightBox = styled.div`
  display: flex;
  /* align-items: center; */

  & > * {
    margin-left: 10px;
  }
`;

const Container = styled.div<{ padding?: string }>`
  width: 100%;
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
  display: flex;
  font-family: 'Open Sans', sans-serif;
  /* align-items: center; */
  justify-content: space-between;
`;


export const Heading_Basic = () => {
  const props: HeadingProps = {
    heading: 'Submit Feedback',
    subheading: '',
  };
  return (
    <Container>
      <Heading {...props} />
    </Container>
  );
};