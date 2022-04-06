// 车辆检测模块
// 获取车辆检测按钮
// 检测按钮
let cdcBtn = document.querySelector('.cdc-btn');
// 年检异常元素
let annual = document.querySelector('#annual');
// 油耗异常元素
let fuel = document.querySelector('#fuel');

// 年检异常按钮点击次数  
let numRemind = 0;
// 油耗异常按钮点击次数  
let numUseOil = 0;
// 年检异常
let resultRemindCars = newResult.remindCars;
// 油耗异常
let resultUseOil = newResult.useOilAbnormals;
// 点击
cdcBtn.onclick = function() {
    let str = '';
    // 如果年检异常按钮点击次数大于了年检异常数据的长度
    // 那么返回最后一个数据
    if (numRemind > resultRemindCars.length - 1) {
        str = `
      <td align="left" class="cdc-yellow2">年检到期 </td>
     <td align="left">` + localStorage.getItem('progress') + `</td>
      <td align="left" class="cdc-green">` + localStorage.getItem('outcome') + `</td>
       <td align="center" width="80"  class="cdc-btn2">
        <button type="button" class="layui-btn layui-btn-xs cdc-btn">查看</button>
        </td>
         `
    } else if (numRemind <= resultRemindCars.length) {
        // 如果小于的话
        for (let i = 0; i < resultRemindCars.length; i++) {
            //让i等于numRemind，循环一次保存一次数据
            if (i == numRemind) {
                str = `
        <td align="left" class="cdc-yellow2">年检到期 </td>
       <td align="left">` + resultRemindCars[i].checkEndDate + `</td>
        <td align="left" class="cdc-green">` + resultRemindCars[i].carNo + `</td>
         <td align="center" width="80"  class="cdc-btn2">
          <button type="button" class="layui-btn layui-btn-xs cdc-btn">查看</button>
          </td>
           `
                localStorage.setItem("progress", resultRemindCars[i].checkEndDate);
                localStorage.setItem("outcome", resultRemindCars[i].carNo);
            }
        }
        // 点击一次之后，自增
        numRemind++;
    }
    // 导入
    $('#annual').html(str);

    let str1 = '';
    // 如果 油耗异常按钮点击次数大于了油耗异常数据的长度
    // 那么返回最后一个数据
    if (numUseOil > resultUseOil.length - 1) {
        str1 = `
        <td align="left" class="cdc-yellow2">油耗异常</td>
        <td align="left">` + localStorage.getItem('progress2') + `</td>
        <td align="left" class="cdc-red">` + localStorage.getItem('outcome2') + `</td>
        <td align="center" width="80"  class="cdc-btn2">
       <button type="button" class="layui-btn layui-btn-xs cdc-btn">查看</button>
      </td> 
       `
    } else if (numUseOil <= resultUseOil.length) {
        for (let i = 0; i < resultUseOil.length; i++) {
            if (i == numUseOil) {
                str1 = `<td align="left" class="cdc-yellow2">油耗异常</td>
                  <td align="left">` + resultUseOil[i].carNo + `</td>
                  <td align="left" class="cdc-red">` + resultUseOil[i].litre + `</td>
                  <td align="center" width="80"  class="cdc-btn2">
                 <button type="button" class="layui-btn layui-btn-xs cdc-btn">查看</button>
                </td> 
                    `
                localStorage.setItem("progress2", resultUseOil[i].carNo);
                localStorage.setItem("outcome2", resultUseOil[i].litre);
            }
        }
        numUseOil++;
    }
    $('#fuel').html(str1);
}

// 打开页面就显示数据  (按钮点击的最后一次数据)
window.onload = function() {
    str = `
    <td align="left" class="cdc-yellow2">年检到期</td>
   <td align="left">` + localStorage.getItem('progress') + `</td>
    <td align="left" class="cdc-green">` + localStorage.getItem('outcome') + `</td>
     <td align="center" width="80"  class="cdc-btn2">
      <button type="button" class="layui-btn layui-btn-xs cdc-btn">查看</button>
      </td>
       `

    $('#annual').html(str);

    str1 = `
      <td align="left" class="cdc-yellow2">油耗异常</td>
      <td align="left">` + localStorage.getItem('progress2') + `</td>
      <td align="left" class="cdc-red">` + localStorage.getItem('outcome2') + `</td>
      <td align="center" width="80"  class="cdc-btn2">
     <button type="button" class="layui-btn layui-btn-xs cdc-btn">查看</button>
    </td> 
     `
    $('#fuel').html(str1);
}


// 下拉列表数据（选择车辆型号）
let newCarOptions = [];
let objS = document.getElementById("selName");
let h4lYears = document.querySelectorAll('.h4l')[0];
let h4lMileage = document.querySelectorAll('.h4l')[1];
let h4lFuel = document.querySelectorAll('.h4l')[2];

newResult.useOilAbnormals.forEach(item => {
    return newCarOptions.push(item.carNo);
});

//动态添加options
for (let i = 1; i <= newCarOptions.length; i++) {
    objS.options[i] = new Option(newCarOptions[i - 1], i);
}

// from下的select下拉列表选中状态
layui.use("form", function() {
    //获取layui操作form相关的对象
    var form = layui.form;
    //获取layui关联的jquery对象
    $ = layui.jquery;
    form.on('select(watch)', function(data) {
        // console.log(data.value);
        // 获取select原始DOM对象
        var e = data.elem;
        // 获取当前选中状态的索引值
        var index = e.selectedIndex;
        // 暂时代替，
        // e.selectedIndex>0 要将第一个排除
        if (e.selectedIndex > 0) {
            h4lYears.innerHTML = newCarOptions[index - 1];
            h4lMileage.innerHTML = newCarOptions[index - 1];
            h4lFuel.innerHTML = newCarOptions[index - 1];
            h4rTarget1.innerHTML = newCarOptions[index - 1];
            h4rTarget2.innerHTML = newCarOptions[index - 1];
            h4rTarget3.innerHTML = newCarOptions[index - 1];
        }
    });
});