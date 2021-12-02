import React from 'react';
import ReactDOM from 'react-dom';

export type CustomLSBTooltipProps = {
  left: string;
  top: string;
  height: number;
  options?: {};
  date?: any;
  index?: number;
  labels: string[];
  entities: {};

  leftLabel?: string;
  rightLabel?: string;

  otherData?: any;
};

export type CustomTooltipGeneratorLSB = {
  tooltip: React.FC<CustomLSBTooltipProps>;
  height: number;
  labels: string[];
  entities: {};
  otherData?: any;
  id: string;
};

export const customTooltipGeneratorLSB = ({
  height,
  labels,
  entities,
  otherData,
  tooltip: Tooltip,
  id,
}: CustomTooltipGeneratorLSB) => {
  const customTooltip = function (
    this: Chart,
    tooltipModel: Chart.ChartTooltipModel,
  ) {
    // Tooltip Element
    let tooltipEl = document.getElementById(`lineStacked-chart-tooltip-${id}`);

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = `lineStacked-chart-tooltip-${id}`;
      // document.getElementById('root')?.appendChild(tooltipEl);
      document.body.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }

    // const chart = (this as any)._chart;
    // const canvas = (this as any)._chart.canvas;

    // const canvasContainer = document.getElementById('chartjs-container');
    // const position = (this as any)._chart.canvas.getBoundingClientRect();

    const top = `${15}`;
    const left = `${tooltipModel.caretX}`;
    // const left = `${position.left + window.pageXOffset + tooltipModel.caretX}`;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = '1';

    tooltipEl.style.position = 'absolute';

    tooltipEl.style.top = `${0}px`;
    tooltipEl.style.left = `${tooltipModel.caretX}px`;

    tooltipEl.style.transitionDelay = '0s';
    tooltipEl.style.transitionProperty = 'all';
    tooltipEl.style.transitionDuration = '0.3s';
    tooltipEl.style.transitionTimingFunction = 'ease';

    tooltipEl.style.padding = '0';

    tooltipEl.style.fontSize = `${tooltipModel.bodyFontSize}px`;
    tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
    tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;

    tooltipEl.style.pointerEvents = 'none';

    const tooltipProps = {
      top,
      left,
      height,
      labels,
      entities,
      date: tooltipModel.title?.[0],
      index: tooltipModel.dataPoints?.[0].index,
      otherData,
      leftLabel: (this as any)._chart?.options?.scales?.yAxes?.[0]?.scaleLabel
        ?.labelString,
      rightLabel: (this as any)._chart?.options?.scales?.yAxes?.[1]?.scaleLabel
        ?.labelString,
    };

    // console.log(tooltipModel);
    // console.log(this?.options?.scales?.yAxes?.[1]?.scaleLabel?.labelString);

    // TODO: Find a better way to render

    ReactDOM.render(
      <Tooltip {...tooltipProps} />,
      document.getElementById(`lineStacked-chart-tooltip-${id}`),
    );
    return;
  };
  return customTooltip;
};
