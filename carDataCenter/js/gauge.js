var gauge = {
	createGauge:function(chtdata,elm,opt){
		myChart = echarts.init(elm);
		Option = {
		  series: [{
		    name: '刻度',
		    type: 'gauge',
		    radius: '80%',
		    min:0,//最小刻度
		    max:160,//最大刻度
		    splitNumber: 8, //刻度数量
		    startAngle: 225,
		    endAngle: -45,
		    axisLine: {
		      show: true,
		      lineStyle: {
		        width: 1,
		        color: [[1,'rgba(0,0,0,0)']]
		      }
		    },//仪表盘轴线
		    axisLabel: {
		      show: true,
		      color:'#fff',
					fontSize:8,
		      distance:20
		    },//刻度标签。
		    axisTick: {
		      show: true,
		       splitNumber: 7,
		      lineStyle: {
		        color: opt.color[0],
		        width: 1,
		      },
		      length: -8
		    },//刻度样式
		    splitLine: {
		      show: true,
		      length: -14,
		      lineStyle: {
						width:2,
		        color: opt.color[1]
		      }
		    },//分隔线样式
		    detail: {
		      show: false
		    },
		    pointer: {
		      show: false
		    }
		  },
		    {
		      type: 'gauge',
		      radius: '50%',
		      center: ['50%', '50%'],
		      splitNumber: 0, //刻度数量
		      startAngle: 225,
		      endAngle: -45,
		      axisLine: {
		        show: true,
						roundCap:true,
		        lineStyle: {
		          width: 8,
		          color: [
		            [
		              0.9, new echarts.graphic.LinearGradient(
		              0, 0, 1, 0, [{
		              offset: 0,
		              color: opt.color[2]
		            },
		              {
		                offset: 1,
		                color: opt.color[3]
		              }
		            ]
		              )
		            ]
		          ]
		        }
		      },
		      //分隔线样式。
		      splitLine: {
		        show: false,
		      },
		      axisLabel: {
		        show: false
		      },
		      axisTick: {
		        show: false
		      },
		      pointer: {
		        show: false
		      },
		      title: {
		        show: true,
		        offsetCenter: [0, 0], // x, y，单位px
		        textStyle: {
		          color: '#fff',
		          fontSize: 14
		        }
		      },
		      //仪表盘详情，用于显示数据。
		      detail: {
		        show: true,
		        offsetCenter: [0, '100%'],
		        color: '#ffffff',
		        formatter: function(params) {
							return params
						},
						textStyle: {
							fontSize: 16
						}
					},
					data: [{
						name: opt.title,
						value: chtdata
					}]
				}
		  ]
		};
		Option && myChart.setOption(Option);
	}
}