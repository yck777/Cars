/**
 * 多环形
**/

var gauges = {
	createGauges:function(chtdata,elm,opt){
		myChart = echarts.init(elm);
		nameArray = chtdata.map(item=>{
		    return item.name
		})
		countValueArray = chtdata.map(item=>{
		    return item.countValue
		})
		currValueArray = chtdata.map(item=>{
		    return item.currValue
		})
arrName = getArrayValue(chtdata, "name");
arrValue = getArrayValue(chtdata, "value");
sumValue = eval(arrValue.join('+'));
objData = array2obj(chtdata, "name");
optionData = getData(chtdata);
console.log(optionData);
myoption = {
    backgroundColor: 'transparent',
    legend: {
        show: true,
        icon: "circle",
        top: "center",
        top: '10%',
        right: "5%",
        data: arrName,
        width: 40,
        padding: [0, 6],
        itemGap: 16,
        formatter: function(name) {
            return "{title|" + name + "} {value|" + (objData[name].value) + "} "
        },

        textStyle: {
            rich: {
                title: {
                    fontSize: 14,
                    lineHeight: 18,
                    color: "rgb(0, 178, 246)"
                },
                value: {
                    fontSize: 16,
                    lineHeight: 18,
                    color: "#fff"
                }
            }
        },
    },
    tooltip: {
        show: true,
        trigger: "item",
        formatter: "{b}:{c}({d}%)"
    },
    color: ['rgb(9,187,247)', 'rgb(184,254,165)', 'rgb(253,218,23)', 'rgb(252,152,12)'],
    xAxis: [{
        show: false
    }],
    series: optionData.series
};

		myoption && myChart.setOption(myoption);

	}
}

function getData(data) {
    var res = {
        series: [],
        yAxis: []
    };
    for (let i = 0; i < data.length; i++) {
        res.series.push({
            name: '',
            type: 'pie',
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [73 - i * 5 + '%', 70 - i * 5 + '%'],
            center: ["40%", "55%"],
            label: {
                show: false
            },
            itemStyle: {
                label: {
                    show: false,
                },
                labelLine: {
                    show: false
                },
                borderWidth: 5,
            },
            data: [{
                value: data[i].value,
                name: data[i].name
            }, {
                value: sumValue - data[i].value,
                name: '',
                itemStyle: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0
                },
                tooltip: {
                    show: false
                },
                hoverAnimation: false
            }]
        });
        res.series.push({
            name: '',
            type: 'pie',
            silent: true,
            z: 1,
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: [73 - i * 5 + '%', 70 - i * 5 + '%'],
            center: ["40%", "55%"],
            label: {
                show: false
            },
            itemStyle: {
                label: {
                    show: false,
                },
                labelLine: {
                    show: false
                },
                borderWidth: 5,
            },
            data: [{
                value: 7.5,
                itemStyle: {
                    color: "rgb(3, 31, 62)",
                    borderWidth: 0
                },
                tooltip: {
                    show: false
                },
                hoverAnimation: false
            }, {
                value: 2.5,
                name: '',
                itemStyle: {
                    color: "rgba(0,0,0,0)",
                    borderWidth: 0
                },
                tooltip: {
                    show: false
                },
                hoverAnimation: false
            }]
        });
        res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%");
    }
    return res;
}

function getArrayValue(array, key) {
    var key = key || "value";
    var res = [];
    if (array) {
        array.forEach(function(t) {
            res.push(t[key]);
        });
    }
    return res;
}

function array2obj(array, key) {
    var resObj = {};
    for (var i = 0; i < array.length; i++) {
        resObj[array[i][key]] = array[i];
    }
    return resObj;
}