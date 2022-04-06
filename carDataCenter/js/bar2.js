/**
 * 柱状图2，总数做背景，高亮为当前数值
 **/

var bar2 = {
    createBar2: function(chtdata, elm, opt) {
        myChart = echarts.init(elm);
        nameArray = chtdata.map(item => {
            return item.name
        })
        countValueArray = chtdata.map(item => {
            return item.countValue
        })
        currValueArray = chtdata.map(item => {
            return item.currValue
        })

        myOption = {
            color: ['rgba(242,242,242,0.2)', '#3c9'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                textStyle: {
                    color: '#fff'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: nameArray,
                axisLabel: {
                    color: '#fff',
                    fontSize: 10
                }
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    color: '#fff'
                }
            }],
            series: [{
                    name: '总数',
                    type: 'bar',
                    barGap: '-100%',
                    emphasis: {
                        focus: 'series'
                    },
                    data: countValueArray,
                    barWidth: '20'

                },
                {
                    name: '空闲数',
                    type: 'bar',
                    emphasis: {
                        focus: 'series'
                    },
                    data: currValueArray,
                    barWidth: '20'
                }
            ]
        };

        myOption && myChart.setOption(myOption);
    }
}