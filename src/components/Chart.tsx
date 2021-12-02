import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import styled from 'styled-components';




    
    export const ChartContainer = styled.div<IChartContainer>`

    `

    export interface IChartContainer {
    
    
    }
    
    
    
    const Chart: React.FC<IChartContainer> = (props) => {
    
        const data = [
            { name: '1', idea: 12, bug: 23, z: 122 },
            { name: '2', idea: 22, bug: 3, z: 73 },
            { name: '3', idea: 13, bug: 15, z: 32 },
            { name: '4', idea: 44, bug: 35, z: 23 },
            { name: '5', idea: 35, bug: 45, z: 20 },
            { name: '6', idea: 62, bug: 25, z: 29 },
            { name: '7', idea: 37, bug: 17, z: 61 },
            { name: '8', idea: 28, bug: 32, z: 45 },
            { name: '9', idea: 19, bug: 43, z: 93 },
            { name: '10', idea: 12, bug: 23, z: 122 },
            { name: '11', idea: 22, bug: 3, z: 73 },
            { name: '12', idea: 13, bug: 15, z: 32 },
            { name: '13', idea: 44, bug: 35, z: 23 },
            { name: '14', idea: 35, bug: 45, z: 20 },
            { name: '15', idea: 62, bug: 25, z: 29 },
            { name: '16', idea: 37, bug: 17, z: 61 },
            { name: '17', idea: 28, bug: 32, z: 45 },
            { name: '18', idea: 19, bug: 43, z: 93 },
            { name: '19', idea: 35, bug: 45, z: 20 },
            { name: '6', idea: 62, bug: 25, z: 29 },
            { name: '7', idea: 37, bug: 17, z: 61 },
            { name: '8', idea: 28, bug: 32, z: 45 },
            { name: '9', idea: 19, bug: 43, z: 93 },
            { name: '10', idea: 12, bug: 23, z: 122 },
            { name: '11', idea: 22, bug: 3, z: 73 },
            { name: '12', idea: 13, bug: 15, z: 32 },
            { name: '13', idea: 44, bug: 35, z: 23 },
            { name: '14', idea: 35, bug: 45, z: 20 },
            { name: '15', idea: 62, bug: 25, z: 29 },
            { name: '16', idea: 37, bug: 17, z: 61 },
            { name: '17', idea: 28, bug: 32, z: 45 },
            { name: '18', idea: 19, bug: 43, z: 93 },



        ];

    
        return (
            <ChartContainer{...props} >
            <BarChart width={900} height={600} data={data} barGap={0} >
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="idea" stackId="a" fill="rgb(52 170 247)" />
            <Bar dataKey="bug" stackId="a" fill="rgb(255 180 0)" />
        </BarChart>
            </ChartContainer>
        )
    };
    



export default Chart;