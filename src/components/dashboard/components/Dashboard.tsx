import React, {PureComponent, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import '../styles/dashboard.css';
import RadioButtonsGroup from "../../core/components/RadioButtonsGroup";
import { data } from '../controllers/chart_data';



export default function Dashboard() {
  const [radioValue, setRadioValue] = useState('hour');

  const radios = [
    { name: 'час', value: 'hour' },
    { name: 'день', value: 'day' },
    { name: 'неделя', value: 'week' },
    { name: 'месяц', value: 'month' },
  ];

    return (
      <div className="dashboard">
        <div className="title">
          <h1>Дашборд</h1>
        </div>
        <div className="content">
          <RadioButtonsGroup
            id="group_radio"
            defaultValue="hour"
            radios={radios}
            triggerFunc={setRadioValue}
          ></RadioButtonsGroup>
        </div>
        <ResponsiveContainer width="100%" height="100%" minWidth="100%" minHeight="500px" className="dashboard-chart">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    );
}
