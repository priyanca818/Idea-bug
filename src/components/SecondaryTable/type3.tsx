/* eslint-disable react/jsx-pascal-case */
import React, { CSSProperties, ReactText } from 'react';

import Button, { themes } from '../Buttons';

import {
  SecondaryTable__Container,
  SecondaryTable__Header,
  SecondaryTable__Heading,
  SecondaryTable__HeadingWrapper,
  SecondaryTable__SubHeading,
  SecondaryTable__Table,
  SecondaryTable__TableWrapper,
  SecondaryTable__TBody,
  SecondaryTable__Td,
  SecondaryTable__Th,
  SecondaryTable__THead,
  SecondaryTable__Tr,
} from './styles';

export interface SecondaryTable3Options {
  rows: any[];
  heads: {
    id: ReactText;
    css?: React.CSSProperties;
    titleData: React.ReactNode;
    formatData?: (value: any) => string;
  }[];
  width?: string;
  height?: string;
  styles?: {
    // * tr?: { [rowId in ReactText]: React.CSSProperties };
    tr?: object;

    // * column?: { [colId in ReactText]: React.CSSProperties };
    column?: object;

    // * colInRow?: {
    // *   [rowId in ReactText]: {
    // *     [colId in ReactText]: React.CSSProperties;
    // *   };
    // * };
    colInRow?: object;

    table?: React.CSSProperties;
    thead?: React.CSSProperties;
    tbody?: React.CSSProperties;
    headRow?: React.CSSProperties;
  };
  headerButton?: {
    text: string;
    onClick: (event: React.MouseEvent) => void;
  };
  emptyTableMsg?: React.ReactNode;

  heading?: string;
  subheading?: string;
}

export const SecondaryTable3: React.FC<SecondaryTable3Options> = ({
  rows,
  heads,
  height,
  width,
  emptyTableMsg,
  headerButton,
  styles,
  subheading,
  heading,
}) => {
  return (
    <SecondaryTable__Container height={height} width={width}>
      <SecondaryTable__Header>
        <SecondaryTable__HeadingWrapper>
          <SecondaryTable__Heading>{heading}</SecondaryTable__Heading>
          {subheading && (
            <SecondaryTable__SubHeading>
              {subheading}
            </SecondaryTable__SubHeading>
          )}
        </SecondaryTable__HeadingWrapper>
        {headerButton && (
          <Button
            text={headerButton?.text}
            theme={themes.normal}
            styles={{ width: '137px' }}
            onClick={headerButton?.onClick}
          />
        )}
      </SecondaryTable__Header>
      <SecondaryTable__TableWrapper>
        {rows.length ? (
          <SecondaryTable__Table style={styles?.table}>
            <SecondaryTable__THead style={styles?.thead}>
              <SecondaryTable__Tr style={styles?.headRow}>
                {heads.map((head) => {
                  return (
                    <SecondaryTable__Th
                      key={head.id}
                      style={{ ...styles?.column?.[head.id], ...head?.css }}
                    >
                      {head.titleData}
                    </SecondaryTable__Th>
                  );
                })}
              </SecondaryTable__Tr>
            </SecondaryTable__THead>
            <SecondaryTable__TBody style={styles?.tbody}>
              {rows.map((row, rIndex) => {
                const rowStyle: CSSProperties = styles?.tr?.[row];
                return (
                  <SecondaryTable__Tr key={rIndex} style={rowStyle}>
                    {heads.map((head) => {
                      // return <SecondaryTable__Td key={col.key}>{col.data}</SecondaryTable__Td>;
                      const colId = head.id;
                      const tdStyle = {
                        ...head?.css,
                        ...styles?.column?.[colId],
                        ...styles?.colInRow?.[rIndex]?.[colId],
                      };

                      let value = row[colId];

                      if (head.formatData) {
                        value = head.formatData?.(value);
                      }

                      return (
                        <SecondaryTable__Td
                          key={colId}
                          data-row-id={colId}
                          style={tdStyle}
                        >
                          {value}
                        </SecondaryTable__Td>
                      );
                    })}
                  </SecondaryTable__Tr>
                );
              })}
            </SecondaryTable__TBody>
          </SecondaryTable__Table>
        ) : (
          emptyTableMsg || 'Loading...'
        )}
      </SecondaryTable__TableWrapper>
    </SecondaryTable__Container>
  );
};

export default SecondaryTable3;
