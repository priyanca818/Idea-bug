import React from 'react';
import styled from 'styled-components';

import { kpiEntities, kpiIds } from './chartData';

import LineStackedBar, { LineStackedBarProps } from './LineStackedBar';


export const LineStackedBarSmall = () => {
  const props: LineStackedBarProps = {
    labels: kpiIds,
    width: 853,
    yLeftLabel: '$ VALUE',
    yRightLabel: '# VALUE',
    datasets: [
      {
        order: 3,
        type: 'bar',
        color: '#44BBA4',
        hoverColor: 'green',
        title: 'Sales',
        setYAxisRight: false,
        data: kpiIds.map((id) => {
          return +kpiEntities[id].sales14d;
        }),
      },
      {
        order: 2,
        type: 'bar',
        color: '#AB74F4',
        hoverColor: 'purple',
        title: 'Spends',
        setYAxisRight: false,
        data: kpiIds.map((id) => {
          return +kpiEntities[id].adspend;
        }),
      },
      {
        order: 1,
        type: 'line',
        color: '#F18805',
        title: 'Orders',
        setYAxisRight: true,
        data: kpiIds.map((id) => {
          return +kpiEntities[id].conversions14d;
        }),
      },
      {
        order: 0,
        type: 'line',
        color: '#0295F6',
        title: 'Clicks',
        setYAxisRight: true,
        data: kpiIds.map((id) => {
          return +kpiEntities[id].clicks;
        }),
      },
    ],
  };
  return (
    <Container>
      <LineStackedBar {...props} />
    </Container>
  );
};
export const LineStackedBarLarge = () => {
  const props: LineStackedBarProps = {
    labels: kpiIds,
    width: 1178,
    yLeftLabel: '$ VALUE',
    yRightLabel: '# VALUE',
    datasets: [
      {
        order: 3,
        type: 'bar',
        color: '#44BBA4',
        hoverColor: 'green',
        title: 'Sales',
        setYAxisRight: false,
        data: kpiIds.map((id) => {
          return +kpiEntities[id].sales14d;
        }),
      },
      {
        order: 2,
        type: 'bar',
        color: '#AB74F4',
        hoverColor: 'purple',
        title: 'Spends',
        setYAxisRight: false,
        data: kpiIds.map((id) => {
          return +kpiEntities[id].adspend;
        }),
      },
      {
        order: 1,
        type: 'line',
        color: '#0295F6',
        title: 'Clicks',
        setYAxisRight: true,
        data: kpiIds.map((id) => {
          return +kpiEntities[id].clicks;
        }),
      },
      {
        order: 0,
        type: 'line',
        color: '#F18805',
        title: 'Orders',
        setYAxisRight: true,
        data: kpiIds.map((id) => {
          return +kpiEntities[id].conversions14d;
        }),
      },
    ],
  };
  return (
    <Container>
      <LineStackedBar {...props} />
    </Container>
  );
};

const Container = styled.div`
  /* height: 1178px; */
  /* width: 1178px; */
  /* width: 853px; */
  width: fit-content;
  margin: auto;
`;
