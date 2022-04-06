// 请求数据
var newResult;
// 车维修次数的新数组
var newsCar = [];
// 用车次数的新数组
var newsUserCar = [];
// 费用支出的新数组
var newCosts = [];
var value1;
var value2;
var value3;
// 维修费数组
var valueRepair = [];
// 燃油费数组
var valueFuel = [];
// 保险费数组
var valueInsurance = [];

// 空闲车辆的新数组
var newDeptFree = [];
// 接口调用
function ajaxData(_url, type, dataType) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: _url,
            type: type || "post",
            dataType: dataType || 'jsonp',
            async: false,
            // 成功
            success(res) {
                resolve(res);
                console.log(res);
                newResult = res;
                // 调用函数
                loadData(newResult);
            },
            // 失败
            error(err) {
                reject(err)
            }
        });
    })
}
ajaxData('http://carin.frp.geekiot.ltd:78/incar/urlServiceInfo.do?method=getInfo', 'get', 'json');

function loadData(newResult) {
    // 车维修次数
    var resultFixNums = newResult.carFixNums;
    for (let i = 0; i < resultFixNums.length; i++) {
        newsCar.push({
            name: resultFixNums[i].carNo,
            value: resultFixNums[i].carFixNum
        });
    }

    // 用车次数
    var resultUseNums = newResult.carUseNums;
    for (let i = 0; i < resultUseNums.length; i++) {
        newsUserCar.push({
            name: resultUseNums[i].carNo,
            value: resultUseNums[i].carUseNum
        });
    }

    // 支出费用
    var resultCosts = newResult.costs;
    for (let i = 0; i < resultCosts.length; i++) {
        newCosts.push({
            value1: resultCosts[i][0],
            value2: resultCosts[i][1],
            value3: resultCosts[i][2],
        });
    }
    newCosts.forEach(item => {
        return valueRepair.push(item.value1);
    });
    newCosts.forEach(item => {
        return valueFuel.push(item.value2);
    });
    newCosts.forEach(item => {
        return valueInsurance.push(item.value3);
    });
}

// 空闲车辆
var resultDeptFree = newResult.deptFreeCars;
for (let i = 0; i < resultDeptFree.length; i++) {
    newDeptFree.push({
        name: resultDeptFree[i].deptName,
        value: resultDeptFree[i].freeCarNum
    });
}