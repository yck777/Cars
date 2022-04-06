// 基础饼图

var pie = {
	pieCreate:function(chtdata,elm,opt){
		myChart = echarts.init(elm);
		data = [];
		color=opt.color;
		for (let i = 0; i < chtdata.length; i++) {
		    data.push({
					value: chtdata[i].value,
					name: chtdata[i].name, 
					itemStyle:{
						color: color[i],
					},
					label:{color: '#fff'} ,
				});
		}
		Option = {
		  tooltip: {
		    trigger: 'item'
		  },
		  legend: {
		    orient: 'vertical',
		    left: 'right',
				textStyle:{
					color: '#fff'
				},
		  },
		  series: [
		    {
		      name: opt.name,
		      type: 'pie',
		      radius: '60%',
					center: ['40%', '60%'],
					label:{
						normal:{
							show:true,
							position:'outside', //标签的位置
							textStyle : {
									fontWeight : 300 ,
									fontSize : 12    //文字的字体大小
							},
							formatter:opt.formatter
						}
					},
		      data: data
		    }
		  ]
		};		
		Option && myChart.setOption(Option);
	}
}