 import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,

} from "recharts";
import Heading from './Heading';

import styled from 'styled-components';




    
    export const ChartContainer = styled.div<IChartContainer>`
margin-bottom:50px;

    `

    export interface IChartContainer {
    
    
    }

    const Chart2: React.FC<IChartContainer> = (props) => {

  const data = [
  {
    name: "Page A",
    bug: 5000,
    pv: 6000,
    amt: 2400
  },
  {
    name: "Page B",
    bug: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    bug: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    bug: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    bug: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    bug: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    bug: 3490,
    pv: 4300,
    amt: 2100
  }
];
          


            return (
            <>

                    <Heading 
        heading='Ideas and Bugs'
        subheading="Check out your submitted Ideas and Bugs"/>
    <BarChart
      width={900}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
        
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" stackId="a" fill=" rgb(52, 170, 247)" />
      <Bar dataKey="bug" stackId="a" fill="rgb(255, 180, 0)" />
    </BarChart>

</>
  );
    };




export default Chart2; 




