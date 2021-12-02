import Chart, { ChartConfiguration } from 'chart.js';
import moment from 'moment';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import vars from '../../styles/vars';
import {customTooltipGeneratorLSB} from './CustomTooltipGenerator/CustomTooltipGenerator';
import {
  LegendLabel,
  LegendsContainer,
  LegendSquare,
  LegendWrapper,
} from './newCharts.styles';

import {
  CustomLSBTooltipProps,
} from './CustomTooltipGenerator/CustomTooltipGenerator';

export type LineStackedBarChartDataset = {
  data: number[];
  order: number;
  type: 'line' | 'bar';
  color: string;
  title: string;
  setYAxisRight: boolean;
  options?: {};
  lineTension?: number;
  hoverColor?: string;
  description?: string[];
  page?: string[];
  borderDash?: number[];
  borderWidth?:
    | Chart.BorderWidth
    | Chart.BorderWidth[]
    | Chart.Scriptable<Chart.BorderWidth, "">
    | undefined;
};

export interface LineStackedBarProps {
  // use if multiple chart on same page
  chartId?: string;

  showXAxis?: boolean;
  width?: number | string;
  height?: number;

  barThickness?: number;
  labels: string[];
  datasets: LineStackedBarChartDataset[];
  entities?: {};
  stacked?: boolean;
  isIdeabug?: boolean;
  legendarr?: { name: string; color: string }[];
  reRender?: number;
  showLabels?: boolean;
  showLagends?: boolean;
  legendLeft?: boolean;
  hasPortal?: HTMLDivElement | null;

  yLeftLabel: string;
  yLeftLabelPadding?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };

  yLeftType?: string;

  x1Ticks?: (
    value: React.ReactText,
    index?: number,
    values?: string[] | number[],
  ) => string | number | null | undefined;
  x2Ticks?: (
    value: React.ReactText,
    index?: number,
    values?: string[] | number[],
  ) => string | number | null | undefined;
  x3Ticks?: (
    value: React.ReactText,
    index?: number,
    values?: string[] | number[],
  ) => string | number | null | undefined;

  yLeftTicks?: (
    value: React.ReactText,
    index?: number,
    values?: string[] | number[],
  ) => string | number | null | undefined;

  yRightType?: string;
  yRightLabel: string;
  yRightLabelPadding?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
  yRightTicks?: (
    value: React.ReactText,
    index?: number,
    values?: string[] | number[],
  ) => string | number | null | undefined;

  onClick?: (e: MouseEvent, active: any) => void;

  customTooltip?: React.FC<CustomLSBTooltipProps>;

  customTooltipData?: any;
  calculateLineMin?: (max: number) => number;
  calculateBarMax?: (max: number) => number;
  tooltipProps?: any;
  maxTicksLimitYLeft?: number;
  maxTicksLimitYRight?: number;
}

/* const getBarThickness = (width: number, noOfBars: number): number => {
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
}; */

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const LineStackedBar: FC<LineStackedBarProps> = ({
  labels,
  onClick = () => {},

  barThickness,
  chartId = 'id',

  showXAxis = true,
  showLabels = true,
  legendLeft = false,
  yLeftLabel,
  yLeftLabelPadding = { bottom: 15 },

  yRightLabel,
  yRightLabelPadding = { bottom: 15 },

  yLeftType = 'linear',
  yRightType = 'linear',
  yLeftTicks = (value) => value,
  yRightTicks = (value) => value,

  x1Ticks,
  x2Ticks,
  x3Ticks,

  entities = {},

  width = '100%',
  height = 430,

  customTooltipData,
/*   customTooltip = defaultCustomTooltip, */
customTooltip = customTooltipGeneratorLSB,
  datasets: dataS,

  calculateLineMin,
  calculateBarMax,
  hasPortal,
  showLagends = true,
  reRender = 0,
  stacked = false,
  isIdeabug = false,
  legendarr = [],
  tooltipProps,
  maxTicksLimitYLeft,
  maxTicksLimitYRight,
}) => {
  const chart = useRef<Chart>();
  const maxBar = useRef(0);
  const maxLine = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const barThicknessRef = useRef(10);

  const [datasets, setDatasets] = useState<Chart.ChartDataset[]>();
  const [hideLabel, setHideLabel] = useState({});
  const days = useRef('');
  const createDatasets = useCallback(
    (
      datasets: LineStackedBarChartDataset[],
      // barThickness: number
    ) => {
      const ds: Chart.ChartDataset[] = datasets.map(
        ({
          type,
          color,
          data,
          title,
          hoverColor,
          order,
          lineTension = 0.4,
          setYAxisRight,
          description,
          page,
          borderDash,
          borderWidth,
        }) => {
          const maxValue = Math.max(...data);

          const yAxisID = setYAxisRight ? 'yRight' : 'yLeft';

          if (type === 'line') {
            if (maxLine.current < maxValue) maxLine.current = maxValue;

            return {
              data,
              type,

              order,
              label: title,

              borderColor: color,
              backgroundColor: color,
              pointBackgroundColor: color,

              borderCapStyle: 'round',
              fill: false,
              yAxisID,
              borderDash,
              borderWidth,
              pointStyle: 'circle',
              pointRadius: 0,
              lineTension,
              pointHitRadius: 4,
              pointBorderWidth: 0,
              pointHoverRadius: 4,
            };
          }
          if (type === 'bar') {
            if (maxBar.current < maxValue) maxBar.current = maxValue;
            return {
              data,
              type,
              barThickness,
              order,
              label: isIdeabug
                ? `${description?.join('`~`')} ^&% ${page?.join('`~`')}`
                : title, // This is for Idea & Bug bar chart tooltip.
              backgroundColor: color,
              hoverBackgroundColor: hoverColor,
              yAxisID,
              pointStyle: 'circle',
            };
          }

          return {
            data,
            type,
            order,
            label: title,
            backgroundColor: color,
            hoverBackgroundColor: hoverColor,
          };
        },
      );

      return ds;
    },
    [maxLine, maxBar],
  );
  const createConfig = useCallback(() => {
    const config: ChartConfiguration = {
      data: {
        labels,
        datasets: createDatasets(
          dataS,
          // barThicknessRef.current
        ),
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        onClick,
        tooltips: {
          enabled:
            tooltipProps && tooltipProps['enabled']
              ? tooltipProps['enabled']
              : false,

          mode:
            tooltipProps && tooltipProps['mode'] ? tooltipProps['mode'] : 'x',
          intersect:
            tooltipProps && tooltipProps['intersect']
              ? tooltipProps['intersect']
              : false,

          xPadding: 10,
          yPadding: 10,
          bodyFontSize:
            tooltipProps && tooltipProps['bodyFontSize']
              ? tooltipProps['bodyFontSize']
              : 12,
          displayColors:
            tooltipProps && tooltipProps['displayColors']
              ? tooltipProps['displayColors']
              : false,

          backgroundColor: 'rgb(34, 34, 34, 0.8)',
          callbacks:
            tooltipProps && tooltipProps['callbacks']
              ? tooltipProps['callbacks']
              : {},

          custom: isIdeabug
            ? undefined
            : customTooltipGeneratorLSB({
                height,
                labels,
                entities,
                tooltip: customTooltip,
                otherData: customTooltipData,
                id: chartId,
              }),
        },

        hover: {
          mode:
            tooltipProps && tooltipProps['mode'] ? tooltipProps['mode'] : 'x',
          intersect:
            tooltipProps && tooltipProps['intersect']
              ? tooltipProps['intersect']
              : false,
        },

        layout: {
          padding: {
            top: 15,
            left: 0,
            right: 0,
            bottom: 0,
          },
        },

        scales: {
          xAxes: [
            {
              type: showLabels ? 'time' : 'category',
              display: showXAxis,
              offset: true,
              stacked: true,
              distribution: 'series',

              time: showLabels
                ? {
                    unit: 'day',
                    unitStepSize: 1,
                    displayFormats: {
                      day: 'dd',
                    },
                  }
                : {},

              gridLines: {
                display: false,
              },

              ticks: {
                padding: -5,
                fontSize: 9,
                fontColor: vars.colors.grey3,
                // lineHeight: 1.2,
                fontFamily: `'Open Sans', sans-serif`,

                source: 'labels',
                display: true,

                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,

                callback: x1Ticks
                  ? x1Ticks
                  : (value, i) => {
                      if (!showLabels) {
                        const date = moment(value, 'YYYY-MM-DD').toDate();
                        if (i === 0) {
                          days.current = weekDays[date.getDay()];
                        }
                        if (weekDays[date.getDay()] === days.current) {
                          return weekDays[date.getDay()].charAt(0);
                        }
                        return '';
                      }
                      return value.toLocaleString().charAt(0);
                    },
              },
            },
            {
              id: 'xAxis2',
              offset: true,
              display: showXAxis,

              gridLines: {
                display: false,
              },

              ticks: {
                padding: -7,
                fontSize: 9,
                fontColor: vars.colors.grey1,
                fontFamily: `'Open Sans', sans-serif`,

                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                beginAtZero: true,

                callback: x2Ticks
                  ? x2Ticks
                  : (value, i) => {
                      if (!showLabels) {
                        const date = parseInt(
                          moment(value, 'YYYY-MM-DD').format('DD'),
                          10,
                        );
                        const month = parseInt(
                          moment(value, 'YYYY-MM-DD').format('MM'),
                          10,
                        );
                        if (date === 1) {
                          return `${date} ${monthNames[month - 1]}`;
                        }
                        if (
                          date === 8 ||
                          date === 15 ||
                          date === 22 ||
                          date === 29
                        ) {
                          return date;
                        }
                      } else {
                        return moment(value, 'YYYY-MM-DD').format('DD');
                      }
                      return '';
                    },
              },
            },
            {
              id: 'xAxis3',
              type: 'category',
              offset: true,
              display: showXAxis,

              gridLines: {
                display: false,
              },

              ticks: {
                fontSize: 9,
                padding: -7,
                fontStyle: '600',
                fontColor: '#222222',
                fontFamily: `'Open Sans', sans-serif`,

                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                beginAtZero: true,

                callback: x3Ticks
                  ? x3Ticks
                  : (value, index) => {
                      const day = moment(value, 'YYYY-MM-DD').format('dd');
                      const date = moment(value, 'YYYY-MM-DD');
                      if (!dataS[0]?.options) {
                        return '';
                      }
                      const monthYear = date.format(`MMM 'YY`);

                      if (day === 'Su') {
                        return monthYear;
                      }

                      return '';
                    },
              },
            },
          ],
          yAxes: [
            {
              id: 'yLeft',
              stacked,
              position: 'left',
              type: yLeftType,
              ticks: {
                autoSkip: true,
                display: true,
                lineHeight: 1,

                suggestedMax: calculateBarMax?.(maxBar.current),

                beginAtZero: true,
                padding: 10,
                fontSize: 9,
                fontColor: '#222222',
                fontFamily: `'Open Sans', sans-serif`,

                callback: yLeftTicks,

                maxTicksLimit: maxTicksLimitYLeft,
              },

              gridLines: {
                drawTicks: true,
                drawBorder: false,

                color: '#DAE0E9',
                zeroLineColor: '#DAE0E9',
                borderDash: [2, 2],
                // zeroLineColor: '#232323',
                zeroLineWidth: 1,
                borderDashOffset: 0.5,
              },

              scaleLabel: {
                display: true,
                labelString: yLeftLabel,

                fontSize: 11,
                fontStyle: '600',
                fontColor: '#222222',
                fontFamily: `'Open Sans', sans-serif`,

                padding: yLeftLabelPadding,
              },
            },
            {
              id: 'yRight',
              position: 'right',
              type: yRightType,

              display: true,

              gridLines: {
                display: false,
              },

              ticks: {
                display: true,
                beginAtZero: true,
                lineHeight: 1,
                autoSkip: true,
                min: calculateLineMin?.(maxLine.current),

                fontSize: 9,
                fontColor: '#222222',
                fontFamily: `'Open Sans', sans-serif`,
                padding: -5,

                callback: yRightTicks,

                maxTicksLimit: maxTicksLimitYRight,
              },

              scaleLabel: {
                display: true,
                labelString: yRightLabel,

                fontSize: 11,
                fontStyle: '600',
                fontColor: '#222222',
                fontFamily: `'Open Sans', sans-serif`,

                padding: yRightLabelPadding,
              },
            },
          ],
        },
      },
    };

    return config;
  }, [
    dataS,
    labels,
    height,
    onClick,
    entities,
    createDatasets,
    maxBar,
    maxLine,
    // barThicknessRef,

    customTooltip,
    customTooltipData,

    calculateBarMax,
    calculateLineMin,

    yLeftType,
    yRightType,

    yLeftTicks,
    yRightTicks,

    yLeftLabel,
    yRightLabel,
  ]);

  useEffect(() => {
    const cref = canvasRef.current?.getContext('2d');
    // barThicknessRef.current = getBarThickness(width, labels.length);

    if (cref) {
      const config = createConfig();
      const ch = new Chart(cref, config);

      chart.current = ch;

      ch.data.datasets && setDatasets(ch.data.datasets);

      return () => {
        ch.destroy();
      };
    }

    return () => {
      chart.current?.destroy();
    };
  }, []);

  useEffect(() => {
    // barThicknessRef.current = getBarThickness(width, labels.length);

    if (chart.current) {
      chart.current.data = {
        labels,
        datasets: createDatasets(
          dataS,
          // barThicknessRef.current
        ),
      };

      if (chart.current?.options?.scales?.yAxes?.[0]?.scaleLabel?.labelString) {
        chart.current.options.scales.yAxes[0].scaleLabel.labelString =
          yLeftLabel.toString().toUpperCase();
      }

      if (chart.current?.options?.scales?.yAxes?.[1]?.scaleLabel?.labelString) {
        chart.current.options.scales.yAxes[1].scaleLabel.labelString =
          yRightLabel.toString().toUpperCase();
      }

      // Update tooltip data
      if (chart.current.options?.tooltips?.custom) {
        chart.current.options.tooltips.custom = customTooltipGeneratorLSB({
          height,
          labels,
          entities,
          tooltip: customTooltip,
          otherData: customTooltipData,
          id: chartId,
        });
      }

      chart.current.update();
      chart.current.data.datasets && setDatasets(chart.current.data.datasets);
    }
  }, [dataS, labels, entities, yLeftLabel, yRightLabel, width, createDatasets]);

  const legendClickCallback = useCallback(
    (e: React.MouseEvent<HTMLElement>, index: number) => {
      if (chart.current) {
        const ch = Chart.instances[(chart.current as any).id];

        (ch as any).legend.options.onClick.call(
          ch,
          e,
          (ch as any).legend.legendItems[index],
        );
      }
    },
    [chart],
  );

  // This function is being used for Idea & Bug chart legends onclick actions.
  const legendClick = useCallback(
    (
      e: React.MouseEvent<HTMLElement>,
      color: string,
      name: string,
      datasets: any,
    ) => {
      if (chart.current) {
        const ch = Chart.instances[(chart.current as any).id];

        (ch as any).legend.legendItems.map((d: any, i: number) => {
          if (d.fillStyle === color) {
            (ch as any).legend.options.onClick.call(
              ch,
              e,
              (ch as any).legend.legendItems[i],
            );
          }
        });
      }
    },
    [chart],
  );

  const chartLegends = !isIdeabug
    ? datasets?.map((dataset) => {
        return (
          <LegendWrapper
            key={dataset.order!}
            onClick={(e) => {
              setHideLabel((prev) => ({
                ...prev,
                [dataset.order!]: !prev[dataset.order!],
              }));
              legendClickCallback(e, dataset.order!);
            }}
          >
            <LegendSquare color={dataset.backgroundColor?.toString()} />
            <LegendLabel isHidden={hideLabel[dataset.order!]}>
              {dataset.label}
            </LegendLabel>
          </LegendWrapper>
        ); // The below part is being used for Idea & Bug charts legends mapping.
      })
    : legendarr.map((l) => {
        return (
          <LegendWrapper
            key={l.name}
            onClick={(e) => {
              setHideLabel((prev) => ({
                ...prev,
                [l.name]: !prev[l.name],
              }));
              legendClick(e, l.color, l.name, datasets);
            }}
          >
            <LegendSquare color={l.color} />
            <LegendLabel isHidden={hideLabel[l.name!]}>{l.name}</LegendLabel>
          </LegendWrapper>
        );
      });

  return (
    <div
      style={{
        // width,
        height,
      }}
    >
      <div
        id='chartjs-container'
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
        }}
      >
        <canvas
          // height={hasPortal ? height : height - 14}
          // width={width}
          ref={canvasRef}
        />
        <div id={`lineStacked-chart-tooltip-${chartId}`} />
      </div>
      {showLagends &&
        (hasPortal ? (
          createPortal(chartLegends, hasPortal)
        ) : (
          <LegendsContainer position={legendLeft}>
            {chartLegends}
          </LegendsContainer>
        ))}
    </div>
  );
};

export default LineStackedBar;
