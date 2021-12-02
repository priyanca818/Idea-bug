import React, { ReactText } from 'react';

import { Chart } from 'chart.js';
import moment from 'moment';
import styled, { css } from 'styled-components';

import vars from '../styles/vars';


export interface IBarChartProps {
  ref?: React.RefObject<HTMLCanvasElement>;
  width: number;
}

interface Grain {
  grain: 'hourly' | 'daily' | 'weekly' | 'monthly';
  key: 'hourly' | 'daily' | 'weekly' | 'monthly';
  unit: string;
}

export interface IBarChartState {
  legend?: [];
  update: boolean;
  grains: Grain[];
  activeGrain: 'hourly' | 'daily' | 'weekly' | 'monthly';
  eligibleGrain: string[];
}

class BarChart extends React.PureComponent<IBarChartProps, IBarChartState> {
  private chartRef = React.createRef<HTMLCanvasElement>();
  chartEle: any;
  state: IBarChartState = {
    legend: [],
    update: false,
    activeGrain: 'daily',
    eligibleGrain: ['daily', 'weekly', 'monthly'],
    grains: [
      {
        grain: 'hourly',
        key: 'hourly',
        unit: 'H',
      },
      {
        grain: 'daily',
        key: 'daily',
        unit: 'D',
      },
      {
        grain: 'weekly',
        key: 'weekly',
        unit: 'W',
      },
      {
        grain: 'monthly',
        key: 'monthly',
        unit: 'M',
      },
    ],
  };
  chartData: number[] = [];
  dataLabels: string[] = [];
  timeLabels: string[] = [
    '2020-04-03',
    '2020-04-04',
    '2020-04-05',
    '2020-04-06',
    '2020-04-07',
    '2020-04-08',
    '2020-04-09',
    '2020-04-10',
    '2020-04-11',
    '2020-04-12',
    '2020-04-13',
    '2020-04-14',
    '2020-04-15',
    '2020-04-16',
    '2020-04-17',
    '2020-04-18',
    '2020-04-19',
    '2020-04-20',
    '2020-04-21',
    '2020-04-22',
    '2020-04-23',
    '2020-04-24',
    '2020-04-25',
    '2020-04-26',
    '2020-04-27',
    '2020-04-28',
    '2020-04-29',
    '2020-04-30',
    '2020-05-1',
    '2020-05-2',
    '2020-05-3',
    '2020-05-4',
    '2020-05-5',
    '2020-05-6',
    '2020-05-7',
    '2020-05-8',
    '2020-05-9',
    '2020-05-10',
    '2020-05-11',
    '2020-05-12',
    '2020-05-13',
    '2020-05-14',
    '2020-05-15',
    '2020-05-16',
    '2020-05-17',
    '2020-05-18',
    '2020-05-19',
    '2020-05-20',
    '2020-05-21',
    '2020-05-22',
    '2020-05-23',
    '2020-05-24',
    '2020-05-25',
    '2020-05-26',
    '2020-05-27',
    '2020-05-28',
    '2020-05-29',
    '2020-05-30',
    '2020-05-31',
    '2020-06-1',
    '2020-06-2',
    '2020-06-3',
    '2020-06-4',
    '2020-06-5',
    '2020-06-6',
    '2020-06-7',
    '2020-06-8',
    '2020-06-9',
    '2020-06-10',
    '2020-06-11',
    '2020-06-12',
    '2020-06-13',
    '2020-06-14',
    '2020-06-15',
    '2020-06-16',
    '2020-06-17',
    '2020-06-18',
    '2020-06-19',
    '2020-06-20',
    '2020-06-21',
    '2020-06-22',
    '2020-06-23',
    '2020-06-24',
    '2020-06-25',
    '2020-06-26',
    '2020-06-27',
    '2020-06-28',
    '2020-06-29',
    '2020-06-30',
    '2020-07-1',
    '2020-07-2',
    '2020-07-3',
    '2020-07-4',
    '2020-07-5',
    '2020-07-6',
  ].slice(0, 62);
  // @ts-ignore
  timeData: number[] = [
    10,
    2,
    8,
    5,
    0,
    19,
    16,
    7,
    8,
    3,
    7,
    17,
    18,
    0,
    12,
    11,
    11,
    7,
    9,
    3,
    18,
    3,
    0,
    15,
    10,
    11,
    6,
    18,
    1,
    5,
    8,
    12,
    0,
    19,
    18,
    11,
    0,
    10,
    16,
    4,
    1,
    17,
    17,
    17,
    17,
    9,
    9,
    14,
    13,
    5,
    6,
    10,
    11,
    10,
    16,
    8,
    11,
    13,
    13,
    5,
    7,
    16,
    6,
    18,
    3,
    10,
    8,
    2,
    12,
    10,
    18,
    6,
    11,
    15,
    7,
    14,
    0,
    3,
    15,
    18,
    14,
    15,
    14,
    14,
    10,
    10,
    2,
    2,
    12,
    18,
    15,
    11,
    16,
    8,
    12,
  ].slice(0, 62);

  barThickness: number = 16;

  fromDate: string | null = this.timeLabels[0];
  toDate: string | null = this.timeLabels[this.timeLabels.length - 1];

  getPreviousMonths = () => {
    let startDate = moment('2019-04-02', 'YYYY-MM-DD');

    while (!startDate.isSame('2019-07-06')) {
      startDate = startDate.add(1, 'days');
      this.chartData.push(Math.floor(Math.random() * 20));
      this.dataLabels.push(startDate.format('YYYY-MM-D'));
    }

    return this.chartData;
  };

  componentDidMount() {
    if (typeof this.chartEle !== 'undefined') this.chartEle.destroy();
    this.getPreviousMonths();
    this.barThickness = this.getBarThickness(
      this.props.width,
      this.timeLabels.length,
    );
    this.buildChart();
    this.setState({ legend: (this.chartEle as any).legend.legendItems });
  }

  getBarThickness = (width: number, noOfBars: number): number => {
    let thickness: number;

    if (width <= 853) {
      switch (true) {
        case noOfBars >= 51:
          thickness = 10;
          break;
        case noOfBars >= 32:
          thickness = 12;
          break;
        case noOfBars >= 15:
          thickness = 20;
          break;
        case noOfBars >= 7:
          thickness = 40;
          break;
        default:
          thickness = 40;
          break;
      }
    } else {
      switch (true) {
        case noOfBars >= 51:
          thickness = 15;
          break;
        case noOfBars >= 32:
          thickness = 18;
          break;
        case noOfBars >= 15:
          thickness = 30;
          break;
        case noOfBars >= 7:
          thickness = 60;
          break;
        default:
          thickness = 60;
          break;
      }
    }
    return thickness;
  };

  buildChart = () => {
    const chartRef = this.chartRef.current!;
    const chartRefContext = chartRef.getContext('2d')!;

    if (typeof this.chartEle !== 'undefined') this.chartEle.destroy();

    this.chartEle = new Chart(chartRefContext, {
      type: 'bar',
      data: {
        // Bring in data
        labels: this.timeLabels,
        datasets: [
          {
            label: 'Impressions',
            data: this.timeData,
            backgroundColor: vars.colors.primary_blue,
            borderWidth: 0.6,
            pointStyle: 'rect',
            type: 'bar',
            borderColor: '#232323',
            barThickness: this.barThickness,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        tooltips: {
          // @ts-ignore
          yAlign: 'bottom',
        },
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 0,
            right: 15,
            top: 32,
            bottom: 0,
          },
        },
/*         elements: {
          rectangle: {
            borderSkipped: 'top',
          },
        }, */
        scales: {
          xAxes: [
            {
              type: 'time',
              offset: true,
              distribution: 'series',
              time: {
                displayFormats: { day: 'YYYY-MM-DD' },
                tooltipFormat: 'YYYY-MM-DD',
                unit: 'day',
              },
              ticks: {
                source: 'data',
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                display: true,
                fontFamily: `'Open Sans', sans-serif`,
                fontColor: '#222222',
                fontSize: 9,
                padding: -5,
                callback: (value) => {
                  const { width } = this.props;

                  if (width > 854) {
                    return moment(value, 'YYYY-MM-DD').format('D');
                  }
                  if (this.chartData.length > 31) {
                    const day = moment(value, 'YYYY-MM-DD').format('D');
                    if (
                      Number(day) % 7 === 0 ||
                      day === '1' ||
                      this.timeLabels.indexOf(String(value)) === 0
                    ) {
                      return day;
                    }
                    return undefined;
                  }
                  return moment(value, 'YYYY-MM-D').format('D');
                },
              },
              gridLines: {
                display: false,
              },
            },
            {
              id: 'xAxis2',
              type: 'category',
              offset: true,
              gridLines: {
                display: false,
              },
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                beginAtZero: true,
                fontSize: 9,
                padding: -7,
                fontFamily: `'Open Sans', sans-serif`,
                fontColor: vars.colors.grey3,
                callback: (value) => {
                  const { width } = this.props;

                  if (width > 854) {
                    return moment(value, 'YYYY-MM-DD')
                      .format('dd')
                      .charAt(0);
                  }
                  if (this.chartData.length > 31) {
                    const day = moment(value, 'YYYY-MM-DD').format('D');
                    if (
                      Number(day) % 7 === 0 ||
                      day === '1' ||
                      this.timeLabels.indexOf(String(value)) === 0
                    ) {
                      return moment(value, 'YYYY-MM-DD')
                        .format('dd')
                        .charAt(0);
                    }
                    return undefined;
                  }
                  return moment(value, 'YYYY-MM-DD')
                    .format('dd')
                    .charAt(0);
                },
              },
            },
            {
              id: 'xAxis3',
              type: 'category',
              offset: true,
              gridLines: {
                display: false,
              },
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                beginAtZero: true,
                minRotation: 0,
                fontSize: 9,
                padding: -7,
                fontFamily: `'Open Sans', sans-serif`,
                fontStyle: '600',
                fontColor: '#222222',
                callback: (value) => {
                  const day = moment(value, 'YYYY-MM-DD').format('D');
                  if (
                    day === '1' ||
                    this.timeLabels.indexOf(String(value)) === 0
                  ) {
                    return moment(value, 'YYYY-MM-DDY').format(`MMM 'YY`);
                  }
                  return undefined;
                },
              },
            },
          ],
          yAxes: [
            {
              id: 'y-axis-1',
              position: 'left',
              ticks: {
                display: true,
                beginAtZero: true,
                fontSize: 9,
                padding: 5,
                fontFamily: `'Open Sans', sans-serif`,
                fontColor: '#222222',
                callback: (value, index, values) => {
                  if (value === 0) return value;
                  return `${value}k`;
                },
              },
              gridLines: {
                zeroLineColor: '#232323',
                zeroLineWidth: 1,
                display: true,
                borderDash: [2, 2],
                borderDashOffset: 0.5,
                drawBorder: false,
                drawTicks: true,
              },
              scaleLabel: {
                display: true,
                labelString: '$ VALUE',
                fontFamily: `'Open Sans', sans-serif`,
                fontSize: 11,
                fontStyle: '600',
                padding: {
                  left: 0,
                  right: 0,
                  top: 15,
                  bottom: 15,
                },
                fontColor: '#222222',
              },
            },
          ],
        },
      },
    });
  };

  legendClickCallback = (e: React.MouseEvent<HTMLElement>, index: number) => {
    const ch = Chart.instances[this.chartEle.id];
    (ch as any).legend.options.onClick.call(
      ch,
      e,
      (ch as any).legend.legendItems[index],
    );
  };

  onDateChange = (
    from: string | null,
    to: string | null,
    mode: string | null,
  ) => {
    let activeGrain = this.state.activeGrain;
    const newEligibleGrains: Set<string> = new Set();

    const fromDate = moment(to as ReactText);
    const toDate = moment(from as ReactText);

    const noOfDays = fromDate.diff(toDate, 'days') + 1;
    if (noOfDays < 2) return;

    this.toDate = to;
    this.fromDate = from;

    if (mode === 'day') {
      newEligibleGrains.add('hourly');
      activeGrain = 'hourly';
    }

    if (mode === 'week') {
      newEligibleGrains.add('daily');
      activeGrain = 'daily';
    }

    if (mode === 'month') {
      newEligibleGrains.add('daily');
      newEligibleGrains.add('weekly');
      activeGrain = 'daily';
    }

    if (mode === 'custom') {
      // daily: 7<= # of Days <= 62
      // weekly: 28 <= # of Days <= 366
      // monthly: 89 <= # of Days <= 1827
      if (noOfDays >= 7) {
        newEligibleGrains.add('daily');
      }
      if (noOfDays >= 28) {
        newEligibleGrains.add('weekly');
      }
      if (noOfDays >= 89) {
        newEligibleGrains.add('monthly');
      }
      activeGrain = 'daily';
    }

    this.onGrainChange(activeGrain, from, to);

    this.setState((state) => ({
      ...state,
      eligibleGrain: Array.from(newEligibleGrains),
    }));
  };

  updateChartView = (
    grain: 'hourly' | 'daily' | 'weekly' | 'monthly',
    from: string,
    to: string,
  ) => {
    const groupByWeek = {};
    const groupByDay = {};
    const groupByMonth = {};
    let newLabels: string[] = this.timeLabels;
    let newDataPoints: number[] = this.timeData;

    function getWeekOfMonth(dateObj: string) {
      const date = moment(dateObj);
      const weekInYear = date.isoWeek();
      const result = weekInYear - date.startOf('month').isoWeek();
      const weekNo = result < 0 ? weekInYear : result;
      return weekNo;
    }

    if (grain === 'daily') {
      newLabels = [];
      newDataPoints = [];
      this.timeLabels.forEach((d: string, i: number) => {
        if (!moment(d).isBetween(from, to, undefined, '[]')) return;

        const v = this.timeData[i];
        if (groupByDay.hasOwnProperty(d)) {
          groupByDay[d] = groupByDay[d] + v;
        } else {
          groupByDay[d] = v;
          newLabels.push(d);
        }
      });
      newLabels.map((date) => newDataPoints.push(groupByDay[date]));
    }

    if (grain === 'weekly') {
      newLabels = [];
      newDataPoints = [];
      this.timeLabels.forEach((d: string, i: number) => {
        if (!moment(d).isBetween(from, to, undefined, '[]')) return;

        const v = this.timeData[i];
        const weekInMonth = `${d.slice(0, 7)}-${getWeekOfMonth(d) * 7 + 1}`;
        if (groupByWeek.hasOwnProperty(weekInMonth)) {
          groupByWeek[weekInMonth] = groupByWeek[weekInMonth] + v;
        } else {
          groupByWeek[weekInMonth] = v;
          newLabels.push(weekInMonth);
        }
      });
      newLabels.map((date) => newDataPoints.push(groupByWeek[date]));
    }

    if (grain === 'monthly') {
      newLabels = [];
      newDataPoints = [];
      this.timeLabels.forEach((d: string, i: number) => {
        if (!moment(d).isBetween(from, to, undefined, '[]')) return;
        const v = this.timeData[i];
        const monthInYear = `${moment(d).format('YYYY-MM')}`;
        if (groupByMonth.hasOwnProperty(monthInYear)) {
          groupByMonth[monthInYear] = groupByMonth[monthInYear] + v;
        } else {
          groupByMonth[monthInYear] = v;
          newLabels.push(monthInYear);
        }
      });
      newLabels.map((date) => newDataPoints.push(groupByMonth[date]));
    }

    this.chartEle.data.labels = newLabels;
    this.chartEle.data.datasets[0].data = newDataPoints;
    this.barThickness = this.getBarThickness(
      this.props.width,
      newLabels.length,
    );
    this.chartEle.data.datasets[0].barThickness = this.barThickness;

    this.chartEle.update();
  };

  onGrainChange = (
    grain: 'hourly' | 'daily' | 'weekly' | 'monthly',
    from: string | null,
    to: string | null,
  ) => {
    const { eligibleGrain } = this.state;

    if (!(eligibleGrain.indexOf(grain) > -1) || !from || !to) return;

    this.updateChartView(grain, from, to);

    this.setState({
      activeGrain: grain,
    });
  };

  render() {
    const { grains, activeGrain, eligibleGrain, legend } = this.state;

    const { width } = this.props;

    return (
      <ChartContainer width={width}>
        <h1>onDateChange={this.onDateChange}</h1> 
        <ChartLegend>
          <div style={{ display: 'flex' }}>
            {legend!.length &&
              legend!.map((item) => {
                return (
                  <LegendLi
                    key={(item as any).datasetIndex}
                    onClick={(e) =>
                      this.legendClickCallback(e, (item as any).datasetIndex)
                    }
                  >
                    <LegendItem color={(item as any).fillStyle} />
                    {(item as any).text}
                  </LegendLi>
                );
              })}
          </div>
          <GrainContainer>
            {grains.map((grain, key) => {
              return (
                <TimeGrain
                  key={key}
                  eligible={eligibleGrain.indexOf(grain.key) > -1}
                  active={grain.key === activeGrain}
                  onClick={() =>
                    this.onGrainChange(grain.key, this.fromDate, this.toDate)
                  }
                >
                  {grain.unit}
                </TimeGrain>
              );
            })}
          </GrainContainer>
        </ChartLegend>

        <div>
          <canvas
            style={{
              height: '430px',
              width: width ? width : '1178px',
            }}
            id='myChart'
            ref={this.chartRef}
          />
        </div>
      </ChartContainer>
    );
  }
}

export default BarChart;

const ChartContainer = styled.div<IBarChartProps>`
  border: 1px solid #ececec;
  padding-bottom: 15px;
  width: ${(props) => (props.width ? props.width : 1178)}px;
`;

const ChartLegend = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 10px;
  color: #222222;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
  margin-left: 25px;
`;

const LegendLi = styled.li`
  color: #333;
  list-style: none;
  display: flex;
`;

const LegendItem = styled.div<{ color: string }>`
  width: 14px;
  height: 14px;
  background-color: ${({ color }) => color};
  margin-right: 8px;
  border-radius: 3px;
`;

const GrainContainer = styled.div`
  display: flex;
  border-radius: 3px;
  height: 20px;
`;

const TimeGrain = styled.span<{ eligible: boolean; active: boolean }>`
  display: flex;
  width: 25px;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #ececec;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  color: #acb5c2;
  background-color: white;

  &:hover {
    cursor: pointer;
  }

  ${({ active }) =>
    active &&
    css`
      color: #ffffff;
      background-color: ${vars.colors.primary_blue};
    `}

  ${({ eligible }) =>
    !eligible &&
    css`
      color: ${vars.colors.grey3};
      background-color: ${vars.colors.grey4};
      &:hover {
        cursor: not-allowed;
      }
    `}

  :first-child {
    border-right: 1px solid #ececec;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  :last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;
