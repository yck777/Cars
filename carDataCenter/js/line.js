//折线图
var line = {
	createLine:function(chtdata,elm,opt){
		myChart = echarts.init(elm);
		nameArray = chtdata.map(item=>{
		    return item.name
		})
		data = [];
		color=opt.color;
		for (let i = 0; i < chtdata.length; i++) {
		    data.push(
				{
				  name: chtdata[i].name,
				  type: 'line',
				  stack: 'Total',
				  areaStyle: {
						color:opt.color[i]
					},
					colorBy:'data',
				  emphasis: {
				    focus: 'series'
				  },
				  data: chtdata[i].value
				}
				);
		}
		Option = {
		  title: {
		    text: opt.title
		  },
		  tooltip: {
		    trigger: 'axis',
		    axisPointer: {
		      type: 'cross',
		      label: {
		        backgroundColor:color[0]
		      }
		    }
		  },
		  legend: {
		    data: nameArray,
				textStyle:{
					color:"#fff"
				}
		  },
		  grid: {
		    left: '3%',
		    right: '4%',
		    bottom: '3%',
				top:'6%',
		    containLabel: true
		  },
		  xAxis: [
		    {
		      type: 'category',
		      boundaryGap: false,
					axisLabel:{
						color: '#fff',
						fontSize:12
					},
		      data: opt.xAxisData
		    }
		  ],
		  yAxis: [
		    {
		      type: 'value',
					axisLabel:{
						color: '#fff',
						fontSize:12
					},
		    }
		  ],
		  series: data
		};
		Option && myChart.setOption(Option);
	}
}