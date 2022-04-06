//折线图
var line2 = {
    createLine: function(chtdata, elm, opt) {
        myChart = echarts.init(elm);
        nameArray = chtdata.map(item => {
            return item.name
        });
        data = [];
        color = opt.color;

        for (let i = 0; i < chtdata.length; i++) {
            data.push({
                name: chtdata[i].name,
                type: 'line',
                colorBy: 'data',
                emphasis: {
                    focus: 'series'
                },
                // 折线变得圆滑
                smooth: true,
                data: chtdata[i].value,
            });



        }
        Option = {
            legend: {
                data: nameArray,
                textStyle: {
                    color: "#fff"
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '17%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    color: '#fff',
                    fontSize: 12
                },
                // 不显示x坐标轴线的样式
                axisLine: {
                    show: false
                },
                //x坐标刻度不显示
                axisTick: {
                    show: false
                },
                data: opt.xAxisData
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    color: '#fff',
                    fontSize: 12
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    }
                },
            }],
            series: data
        };
        Option && myChart.setOption(Option);
    }
}