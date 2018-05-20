import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const data = [
    {name: '2:50', uv: 4000, pv: 0, amt: 2400},
    {name: '2:51', uv: 3000, pv: 1398, amt: 2210},
    {name: '2:53', uv: 2000, pv: 9800, amt: 2290},
    {name: '3:50', uv: 2780, pv: 3908, amt: 2000},
    {name: '4:50', uv: 1890, pv: 4800, amt: 2181},
    {name: '5:50', uv: 2390, pv: 3800, amt: 2500},
    {name: '6:50', uv: 3490, pv: 4300, amt: 2100},
];

const BiaxialBarChart = () => (

    <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}
                  margin={{top: 10, right: 0, left: -25, bottom: 0}}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#3367d6" />
            <Bar dataKey="uv" fill="#ffc658" />
        </BarChart>

    </ResponsiveContainer>
);

export default BiaxialBarChart;