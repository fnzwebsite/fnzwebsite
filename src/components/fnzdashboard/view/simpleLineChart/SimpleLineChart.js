import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import data from './data';

const SimpleLineChart = () => (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}
                   margin={{top: 10, right: 10, left: 10, bottom: 10}} >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#3367d6" activeDot={{r: 8}} />
            <Line type="monotone" dataKey="uv" stroke="#ffc658" />
        </LineChart>
    </ResponsiveContainer>
);

export default SimpleLineChart