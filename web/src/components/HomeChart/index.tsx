import React from 'react';
import { Paper } from '@material-ui/core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import { scaleBand } from '@devexpress/dx-chart-core';
import { Chart, ArgumentAxis, ValueAxis, BarSeries } from '@devexpress/dx-react-chart-material-ui';

const chartData = [{
    state: 'Germany',
    young: 6.7,
    middle: 28.6,
    older: 5.1,
  }, {
    state: 'Japan',
    young: 9.6,
    middle: 43.4,
    older: 9,
  }, {
    state: 'Russia',
    young: 13.5,
    middle: 49,
    older: 5.8,
  }, {
    state: 'USA',
    young: 30,
    middle: 90.3,
    older: 14.5,
  }];


export interface HomeChartProps {

}

export const HomeChart: React.FC<HomeChartProps> = () => {
    return (
        <Paper elevation={7} style={{padding: 10}}>
            <Chart
            height={270}
            data={chartData}
            >
            <ArgumentScale factory={scaleBand} />
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
                valueField="young"
                argumentField="state"
                name="Young"
            />
            <BarSeries
                valueField="middle"
                argumentField="state"
                name="Middle"
            />
            <BarSeries
                valueField="older"
                argumentField="state"
                name="Older"
            />
            <Stack />
            </Chart>
        </Paper>
    );
}