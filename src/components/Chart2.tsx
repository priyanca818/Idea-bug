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
import ChartData from '../components/ChartData'





export const ChartContainer = styled.div<IChartContainer>`
margin-bottom:50px;

.legend
{
    text-align: right;
}

    `

export interface IChartContainer {


}

const Chart2: React.FC<IChartContainer> = (props) => {

    



    return (
        <>

            <Heading
                heading='Ideas and Bugs'
                subheading="Check out your submitted Ideas and Bugs" />
            <BarChart 
                width={1250}
                height={500}
                data={ChartData}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 10
                }}
            >

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" >
          
                </XAxis>
                <YAxis label={{ value: 'IDEAS / BUGS', angle: -90, position: 'insideLeft' }}  />
                <Tooltip />

                <Legend/>
                <Bar dataKey="idea" stackId="a" fill=" rgb(52, 170, 247)"/>
                <Bar dataKey="bug" stackId="a" fill="rgb(255, 180, 0)" />

            </BarChart>

        </>
    );
};




export default Chart2;




