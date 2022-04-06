var xbar = {
    createXbar: function(chtdata, elm, opt) {
        opt.unit = opt.unit ? opt.unit : '';
        myChart = echarts.init(elm);
        nameArray = chtdata.map(item => {
            return item.name
        })
        valueArray = chtdata.map(item => {
            return item.value
        })
        Option = {
            tooltip: {
                trigger: 'axis',
                show: false,
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            legend: {
                show: false
            },
            grid: {
                left: '20%',
                right: '20%',
                bottom: '0',
                top: '10px',
                containLabel: false
            },
            xAxis: [{
                splitLine: {
                    show: false
                },
                type: 'value',
                show: false,
            }],
            yAxis: [{
                splitLine: {
                    show: false
                },
                axisLine: { //y轴
                    show: false
                },
                type: 'category',
                axisTick: {
                    show: false
                },
                inverse: true,
                data: nameArray,
                axisLabel: {
                    color: '#A7D6F4',
                    fontSize: 14,
                }
            }],
            series: [{
                name: '标准化',
                type: 'bar',
                barWidth: 12, // 柱子宽度
                label: {
                    show: true,
                    position: 'right', // 位置
                    color: '#A7D6F4',
                    fontSize: 14,
                    distance: 15, // 距离
                    formatter: '{c}' + opt.unit // 这里是数据展示的时候显示的数据
                }, // 柱子上方的数值
                itemStyle: {
                    barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）

                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 0,
                        color: opt.color[0]
                    }, {
                        offset: 1,
                        color: opt.color[1]
                    }], false), // 渐变
                },
                data: valueArray
            }, ]
        };
        Option && myChart.setOption(Option);
    }
}