var funnel = {
	createFunnel:function(chtdata,elm,opt){
		myChart = echarts.init(elm);
		
		Option = {
		    calculable: true,
		    color:opt.color,
		    series: [
		        {
		            type:'funnel',
		            left: '5%',
		            right:'35%',
		            top: '10%',
		            bottom: '10%',
		            minSize: '0%',
		            maxSize: '100%',
		            sort: 'ascending',
		            label: {
		                show: true,
		                formatter: '{b}\n{d}%',
		                textStyle:{
											color:"#fff"
										},
		            },
		            labelLine: {
		                length: 40
		            },
		            data: chtdata
		        }
		    ]
		};
		Option && myChart.setOption(Option);
	}
}