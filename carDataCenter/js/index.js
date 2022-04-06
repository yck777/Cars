/*
 * @Description: 
 * @Version: 
 * @Autor: MrSong
 * @Date: 2021-02-03 14:17:13
 * @LastEditors: MrSong
 * @LastEditTime: 2021-02-07 12:03:26
 */
; (function ($) {
  $.fn.extend({
    "initEcharts": function (options) {
      //设置属性
      options = $.extend({
        id: this[0],//echarts 幕布
        ulClass: '.ul-box',//模糊搜索盒子类名
        inputClass: '.form-group',//input输入盒子类名
        addressClass: '.address',//地址盒子类名
        btnClass: '.btn-box',//按钮盒子类名
        showClass: '.iShow',//控制按钮盒子类名
        wrapper: null,//echarts实例
        allCode: [],//全国地区编码
        addresslist: ['浙江省'],//地址数组
        currentAddress: '浙江省',//当前区域
				data:[],
        // 动画，控制按钮，操作方法
        ani() {
          if ($(options.btnClass).length == 0) return;
          let hide = `${options.btnClass} button:nth-of-type(1)`;
          let animate = `${options.btnClass} button:nth-of-type(2)`;
          let stop = `${options.btnClass} button:nth-of-type(3)`;
          let iShow = `${options.showClass}`;
          let inputClass = `${options.inputClass}`;
          $(hide).on('click', function () {
            $('.content').addClass('bounceOutRight');
            $('.content').removeClass('bounceInRight animation1');
            setTimeout(() => {
              $(iShow).removeClass('bounceOutUp');
              $(iShow).addClass('bounceInDown active');
            })
          });
          $(stop).on('click', function () {
            $(inputClass).removeClass('animation1');
          });
          $(iShow).click(() => {
            $(iShow).addClass('bounceOutUp');
            setTimeout(() => {
              $(iShow).removeClass('bounceInDown active');
              $('.content').addClass('bounceInRight');
              $('.content').removeClass('bounceOutRight animation1');
            })
          })
          $(animate).click(() => {
            $(inputClass).addClass('animation1');
          })
        },
        // input输入监听，模糊搜索
        InputChange() {
          let name = `${options.inputClass} input`;
          $(name).bind("input propertychange", function (event) {
            $(options.ulClass).show();
            let val = $(name).val(), ulList = [], str = '';
            options.allCode.forEach((item) => {
              if (item.name.indexOf(val) > -1 || val.indexOf(item.name) > -1 || val == item.adcode) {
                ulList.push(item)
              }
            })
            $.each(ulList, function (index, item) {
              str += `<li class='hover' data-name='${item.name}'>${item.name} | ${item.adcode}</li>`
            });
            $(options.ulClass).html(str)
          });
        },
        // li点击重新渲染echarts方法
        ulChange() {
          $(options.ulClass).on("click", "li", (data) => {
            options.currentAddress = data.currentTarget.dataset.name;
            if (options.addresslist.length < 6) {
              options.addresslist.push(options.currentAddress);
            } else {
              options.addresslist.pop();
              options.addresslist.push(options.currentAddress);
            }
            options.getStr(options.addresslist);
            let echartData = {
              address: options.currentAddress,
              id: options.id,
              type: 0,
              option: null
            }
            options.wrapper.dispose();
            options.initEchartsMap(echartData).catch(() => {
              echartData.type = 1;
              options.initEchartsMap(echartData);
            })
            $(options.ulClass).hide();
          })
        },
        // 地址tag点击事件
        addressClick() {
          $(options.addressClass).on("click", "span", (data) => {
            options.currentAddress = data.currentTarget.dataset.name;
            let echartData = {
              address: options.currentAddress,
              id: options.id,
              type: 0,
              option: null
            }
            options.wrapper.dispose();
            options.initEchartsMap(echartData).catch(() => {
              echartData.type = 1;
              options.initEchartsMap(echartData);
            })
          });
        },
        // 获取每个地区的json
        getCode() {
          return new Promise((resolve, reject) => {
            $.ajax({
              url: 'https://geo.datav.aliyun.com/areas_v3/bound/all.json',
              success(data) {
                options.allCode = data;
                resolve(data)
              },
              error(err) {
                reject(err);
              }
            })
          })
        },
        // 动态加入地址tag
        getStr(data) {
          let bArr = [], str = '';
          for (let i = 0; i < data.length; i++) {
            if (bArr.indexOf(data[i]) == -1) {
              bArr.push(data[i]);
            }
          }
          $.each(bArr, function (index, item) {
            if (options.currentAddress === item) {
              console.log('log', item);
              str += `<span class='isActive' data-name='${item}'>${item}</span>`
            } else {
              str += `<span class='noActive' data-name='${item}'>${item}</span>`
            }
          });
          $('.address').html(str)
        },
        // 创建echarts地图
        createMap(address, id) {
          options.wrapper = echarts.init(id, "dark");
          let optionMap = {
            backgroundColor: 'transparent',
            tooltip: { // 指示器
              trigger: 'item',
              // triggerOn: "click",    //点击显示
              formatter: function (params) {
                // console.log('log',params);
                let item = options.allCode.find((item) => {
                  if (item.name == params.name) {
                    return item;
                  }
                })
                if (typeof (params.value)[2] == "undefined") {
                  return `${params.name}  :  ${params.value ? params.value : 0} 车辆<br/>
                          地区编码：${item.adcode}`;
                } else {
                  return `${params.name}<br/>  
                        数量：${params.data.product}`;
                }
              }
            },
            legend: {
              orient: "vertical",
              top: "5",
              right: "20",
              itemWidth: 20,
              itemHeight: 20,
              data: [{
                name: "空闲车辆",
								value:200
              },
              {
                name: "已出车",
								value:100
              }
              ],
              textStyle: {
                color: "#fff",
                fontSize: 15
              }
            },
            geo: {
              map: address,
              zoom: 0.7,   // 设置地图显示大小比例
              label: {
                normal: {
                  show: true,    //显示区域名称
                  fontSize: "14",
                  color: "#fff"
                },
                emphasis: {//对应的鼠标悬浮效果
                  show: true,
                  textStyle: {
                    color: "gold"
                  }
                }
              },
              roam: true,//设置为false,不启动roam就无所谓缩放拖曳同步了
              layoutCenter: ['50%', '50%'],
              layoutSize: "130%",
              itemStyle: {
                normal: {
                  color: '#00A9CD',   //地图块颜色
                  borderColor: '#0285FF'    //鼠标覆盖地图块颜色
                },
                emphasis: {
                  color: '#004881'
                }
              }
            },
            //配置属性
            series: [
              {
                name: "地区",
                type: "map",
                geoIndex: 0,
                data: [],
                itemStyle: {
                  normal: {
                    // show: true,
                    // color: "#BE14E4", //点颜色
                    label: {
                      show: true,
                      textStyle: {
                        fontWeight: 'bold', //字体
                        fontSize: 18, //字体大小
                        color: "#fff"
                      }
                    },
                  }
                },
              },
              {
                name: options.data.opt1name,
                type: 'effectScatter',
                coordinateSystem: 'geo',
                showEffectOn: 'render',  //涟漪
                zlevel: 2,
                rippleEffect: {
                  //period: 2.5, //波纹秒数
                  brushType: 'stroke', //stroke(涟漪)和fill(扩散)，两种效果
                  scale: 3 //波纹范围
                },
                hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'top',
                    show: false,    //不显示
                    textStyle: {    // 地图上散点的字体样式
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: 'blue'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    show: true,
                    color: "#E4E214", //字体和点颜色
                    label: {
                      textStyle: {
                        fontWeight: 'bold', //字体
                        fontSize: 18, //字体大小
                        color: "#E4E214"
                      }
                    },
                  }
                },
                data: options.data.opt1
              },
              {
                name: options.data.opt2name,
                type: 'effectScatter',
                coordinateSystem: 'geo',
                showEffectOn: 'render',
                zlevel: 2,
                rippleEffect: {
                  //period: 2.5, //波纹秒数
                  brushType: 'stroke', //stroke(涟漪)和fill(扩散)，两种效果
                  scale: 3 //波纹范围
                },
                hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'top',
                    show: false,    //不显示
                    textStyle: {    // 地图上散点的字体样式
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#BE14E4'     // 点上字的颜色
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    show: true,
                    color: "#BE14E4", //点颜色
                    label: {
                      textStyle: {
                        fontWeight: 'bold', //字体
                        fontSize: 18, //字体大小
                        color: "#BE14E4"
                      }
                    },
                  }
                },
                data: options.data.opt2
              }]
          };
          options.getStr(options.addresslist);
          options.wrapper.setOption(optionMap)
          //点击事件,根据点击某个省份计算出这个省份的数据
          options.wrapper.on('click', function (params) {
            let echartData = {
              address: params.name,
              id: options.id,
              type: 0,
              option: null
            }
						console.log(echartData);
            options.currentAddress = params.name;
            if (options.addresslist.length < 6) {
              options.addresslist.push(params.name);
            } else {
              options.addresslist.pop();
              options.addresslist.push(params.name);
            }
            options.getStr(options.addresslist);
            options.wrapper.dispose();
            options.initEchartsMap(echartData).catch(err => {
              echartData.type = 1;							
              options.initEchartsMap(echartData);
            })
          });
          options.wrapper.on('georoam', function (params) {
          });
        },
        // 初始化echarts实例
        async initEchartsMap(obj) {
          let {
            address, id, code, type
          } = obj;
          let codeData = await options.getCode();
					
          codeData.forEach((item) => {
						
            if (item.name.indexOf(address) > -1 || address.indexOf(item.name) > -1) {							
							if(item.adcode >= '330000' && item.adcode < '340000'){
								console.log(item);
								code = item.adcode;
							} 
													
            }
          })
          let url = `https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`;
          if (type) {
            url = `https://geo.datav.aliyun.com/areas_v3/bound/${code}.json`;
          }
          return new Promise((resolve, reject) => {
            $.ajax({
              url: url,
              success(data) {
                echarts.registerMap(address, data)
                options.createMap(address, id);
                resolve('sucess')
              },
              error(err) {
                console.log('log', err);
                reject('fail')
              }
            })
          })
        }
      }, options);
      // input输入监听，模糊搜索
      options.InputChange();
      // 地址tag点击事件
      options.addressClick();
      // li点击重新渲染echarts方法
      options.ulChange();
      // 动画，控制按钮，操作方法
      options.ani();
      // 使用方法
      let echartData = {
        address: '浙江省',
        id: options.id,
        type: 0,
        option: null
      }
      options.initEchartsMap(echartData).then((data) => {
        console.log('log', data);
      });
      //返回对象，以便支持链式语法
      return this;
    }
  });
})(jQuery)
