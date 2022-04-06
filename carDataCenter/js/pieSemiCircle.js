// 饼图，半圆，圈图,2个数值
var pieSemiCircle = {
	sum:function(arr) {
	  return eval(arr.join("+"));
	},
	createPieSC:function(chtdata,elm,opt){
		myChart = echarts.init(elm);
		nameArray = chtdata.map(item=>{
		    return item.name
		})
		valueArray = chtdata.map(item=>{
		    return item.value
		})
		datan = [];
		dataw = [];
		color=opt.color;
		valueSum = this.sum(valueArray);
		for (let i = 0; i < chtdata.length; i++) {
		    datan.push({
					value: chtdata[i].value,
					name: chtdata[i].name,
					itemStyle: {
					    normal: {
					        color: new echarts.graphic.LinearGradient(
					            0,
					            0,
					            0,
					            1,
					            [
					                {
					                    offset: 0,
					                    color: color[i],
					                },
					                {
					                    offset: 1,
					                    color: color[i+2],
					                },
					            ],
					            false
					        ),
					    },
					},
				});
		}
		datan.push({
				value: valueSum,
				name: '',
				label: {
						show: false,
				},
				labelLine: {
						show: false,
				},
				itemStyle: {
						normal: {
								color: 'transparent',
								borderWidth: 0,
								shadowBlur: 0,
						},
				},
		})
		
		for (let i = 0; i < chtdata.length; i++) {
			dataw.push({
				    value: chtdata[i].value,
				    itemStyle: {
				        normal: {
				            color: new echarts.graphic.LinearGradient(
				                0,
				                0,
				                0,
				                1,
				                [
				                    {
				                        offset: 0,
				                        color: color[i+4],
				                    },
				                    {
				                        offset: 1,
				                        color: color[i+6],
				                    },
				                ],
				                false
				            ),
				        },
				    },
			})
		}
		dataw.push({
				value: valueSum,
				name: '',
				label: {
						show: false,
				},
				labelLine: {
						show: false,
				},
				itemStyle: {
						normal: {
								color: 'transparent',
								borderWidth: 0,
								shadowBlur: 0,
								borderColor: 'transparent',
								shadowColor: 'transparent',
						},
				},
		})
		
		Option = {
		    tooltip: {
		        show: false,
		    },
				legend: {
				    icon: "circle",
						top: '10%',
				    orient: 'horizontal',
				    data:nameArray,
				    textStyle: {
				      color: "#fff"
				    },
				    itemGap: 20
				},
		    series: [
		        {
		            name: '',
		            type: 'pie',
		            radius: ['60%', '95%'],
		            startAngle: 180,
		            center: ['50%', '83%'],
		            roseType: 'radius',
		            labelLine: {
		                show: false,
		                // normal: {
		                //     length: 20,
		                //     length2: 0,
		                //     lineStyle: {
		                //         color: '#C8C8C8'
		                //     }
		                // }
		            },
		            label: {
		                normal: {
		                    show: true,
		                    position: 'center',
		                    textStyle: {
		                        fontSize: '18px',
		                        padding: [-20, 0, 0, 0],
														color: "#fff"
		                    },
		                    // formatter: ['{c}'].join('\n'),
		                    // formatter: ['{c}'] + ' : '['{}'],
		                    formatter: function (params) {
		                        var proportion = '';
		                        for (var i = 0; i < Option.series[0].data.length - 1; i++) {
		                            // console.log(option.series[0].data);
		                            if (i === 0) {
		                                proportion = proportion + Option.series[0].data[i].value.toString();
		                            } else {
		                                proportion = proportion + ' : ' + Option.series[0].data[i].value.toString();
		                            }
		                        }
		                        return proportion;
		                    },
		                },
		                position: 'center',
		                show: true,
		            },
		
		            data:datan
		        },
		        {
		            type: 'pie',
		            radius: ['60%', '110%'],
		            startAngle: 180,
		            hoverAnimation: false,
		            center: ['50%', '83%'],
		            roseType: 'radius',
		            labelLine: {
		                normal: {
		                    show: false,
		                },
		            },
		            data: dataw,
		            z: -1,
		        },
		    ],
		};
		
		Option && myChart.setOption(Option);
	}
}