/**
 * Created by hao.cheng on 2017/4/17.
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react';
const getOption = () => {
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
            },
        ],
        tooltip: {
            show: true,
            trigger: 'axis',
        },
    };
    return option;
};
const onChartClick = (param:any, echarts:any) => {
    console.log(param, echarts);
  };
  const onChartLegendselectchanged = (param:any, echarts:any) => {
    console.log(param, echarts);
  };
const Echarts = () => {
    return (
        <div className="gutter-example">
            <ReactEcharts
                option={getOption()}
                onEvents={{
                    click: onChartClick,
                    mousedown: onChartClick,
                    legendselectchanged: onChartLegendselectchanged,
                }}
            />
        </div>
    )
};

export default Echarts;