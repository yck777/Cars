// 渐变柱状图
var barlinear = {
	createBarLinear:function(chtdata,elm,opt){
		myChart = echarts.init(elm);
		nameArray = chtdata.map(item=>{
		    return item.name
		})
		valueArray = chtdata.map(item=>{
		    return item.value
		})
		Option = {
		  grid:{
				top:'20%',
				bottom:'20%'
			},			
			legend: {
			  top: '0',
			  left: 'right',
				textStyle: {
					color: '#fff'
				}
			},
		  xAxis: {
		    data: nameArray,
		    axisLabel: {
		      color: '#fff'
		    }
		  },
		  yAxis: {
		    axisLabel: {
		      color: '#fff',
					formatter: '{value}'
					
		    },
				axisLine: {
					show: true
				},
				splitLine: {
					show: false
				}
		  },
		  series: [
		    {
		      type: 'bar',
		      showBackground: true,
					barWidth: '20px',
					name: opt.name,
		      itemStyle: {
		        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
		          { offset: 0, color: opt.color[0] },
		          { offset: 0.5, color:  opt.color[1] },
		          { offset: 1, color: opt.color[2] }
		        ])
		      },
		      emphasis: {
		        itemStyle: {
		          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
		            { offset: 0, color: opt.color[3] },
		            { offset: 0.7, color: opt.color[4] },
		            { offset: 1, color: opt.color[5] }
		          ])
		        }
		      },
		      data: valueArray
		    }
		  ]
		};
		
		Option && myChart.setOption(Option);
	}
}