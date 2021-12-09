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
import { BasicCard } from '../Feedback';


export const ChartContainer = styled.div`


.legend
{
    text-align: right;
}
    `
const Chart2 = () => {
    return (
        <>
            <Heading
                heading='Ideas and Bugs'
                subheading="Check out your submitted Ideas and Bugs"
                padding='0px 0px 20px 0px' />
            <BasicCard>
                <BarChart
                    width={1150}
                    height={500}
                    data={ChartData}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 10,
                        bottom: 10
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" >
                    </XAxis>
                    <YAxis label={{ value: 'IDEAS / BUGS', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="idea" stackId="a" fill=" rgb(52, 170, 247)" />
                    <Bar dataKey="bug" stackId="a" fill="rgb(255, 180, 0)" />

                </BarChart>
            </BasicCard>
        </>
    );
};




export default Chart2;




