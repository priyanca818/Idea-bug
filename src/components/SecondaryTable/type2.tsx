/* eslint-disable react/jsx-pascal-case */
import React, { CSSProperties, FC, ReactNode, ReactText, useState } from 'react';
import { Heading } from '../Heading'
import SelectForTable from '../SelectForTable'
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

export interface SecondaryTable2Options {
  rows: object;
  heads: {
    id: ReactText;
    css?: CSSProperties;
    titleData: ReactNode;
    formatData?: (value: any, row?: any) => ReactNode;
  }[];
  rowIds: ReactText[];
  width?: string;
  height?: string;
  styles?: {
    tr?: object;
    column?: object;
    colInRow?: object;
    table?: CSSProperties;
    thead?: CSSProperties;
    tbody?: CSSProperties;
    headRow?: CSSProperties;
  };
  headerButton?: {
    text: string;
    onClick: (event: React.MouseEvent) => void;
  };
  emptyTableMsg?: ReactNode;

  heading?: string;
  subheading?: string;
}

export const SecondaryTable2: FC<SecondaryTable2Options> = ({
  rowIds,
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
        <Heading
          heading='Ideas and Bugs'
          subheading="Check out your submitted Ideas and Bugs" />
      </SecondaryTable__Header>
      <SecondaryTable__TableWrapper>
        {rowIds.length ? (
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
              {rowIds.map((rowId) => {
                const rowStyle: CSSProperties = styles?.tr?.[rowId];
                return (
                  <SecondaryTable__Tr key={rowId} style={rowStyle}>
                    {heads.map((head) => {
                      const colId = head.id;
                      const tdStyle = {
                        ...head?.css,
                        ...styles?.colInRow?.[rowId]?.[colId],
                        ...styles?.column?.[colId],
                      };

                      let value = rows?.[rowId]?.[colId];

                      if (head.formatData) {
                        value = head.formatData?.(value, rows?.[rowId]);
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

export default SecondaryTable2;
