// 获取内嵌弹窗
let carTesting = document.querySelector('#car-testing');
// 获取关闭按钮
let close3 = document.querySelector('.img-close3');
// 获取查看按钮
// 加定时器的作用是：先让页面渲染完全，再去操作Dom,不然动态的值获取不到
setTimeout(() => {
    let layuiTa = document.querySelectorAll('.cdc-btn2');
    // 2.点击查看按钮显示
    for (let i = 0; i < 5; i++) {
        layuiTa[i].onclick = function() {
            carTesting.style.display = "block";
        }
    };

}, 1000);
// 1.点击关闭按钮隐藏
close3.onclick = function() {
    carTesting.style.display = "none";
}

// 分页器 
goPage(1, 10);

function goPage(pno, pSize) {
    // 获取值
    let iTr = document.querySelector('#iTr');
    let testingTd = document.querySelector('.testing-td');
    // 1.总行数
    let num = iTr.rows.length;
    // 2.总页数
    let totalPages = 0;
    // 3.一页的行数
    let pageSize = pSize;
    // 总共分几页
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPages = parseInt(num / pageSize) + 1
    } else {
        totalPages = parseInt(num / pageSize)
    }
    // 当前页码数
    let currentPage = pno;
    //开始显示的行  1
    var startRow = (currentPage - 1) * pageSize + 1;
    //结束显示的行   10
    var endRow = currentPage * pageSize;
    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1); i++) {
        var irow = iTr.rows[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "block";
        } else {
            irow.style.display = "none";
        }
    }
    var tempStr = "";
    if (currentPage > 1) {
        tempStr += "<li onClick=\"goPage(" + 1 + "," + pSize + ")\">首页&nbsp;&nbsp;</li>"
        tempStr += "<li onClick=\"goPage(" + (currentPage - 1) + "," + pSize + ")\"><上一页&nbsp;&nbsp;</li>"
        for (var j = 1; j <= totalPages; j++) {
            tempStr += "<li  class=\"changeLi\" onClick=\"goPage(" + j + "," + pSize + ")\" >" + j + "</li>"
        };
    } else {
        tempStr += "<li>首页&nbsp;&nbsp;</li>"
        tempStr += "<li><上一页&nbsp;&nbsp;</li>";
        for (var j = 1; j <= totalPages; j++) {
            tempStr += "<li onClick=\"goPage(" + j + "," + pSize + ")\">" + j + "</li>"
        };
    }
    if (currentPage < totalPages) {
        tempStr += "<li  onClick=\"goPage(" + (currentPage + 1) + "," + pSize + ")\">下一页>&nbsp;</li>";
        tempStr += "<li onClick=\"goPage(" + totalPages + "," + pSize + ")\" >尾页</li>"
    } else {
        tempStr += "<li>下一页>&nbsp;</li>";
        tempStr += "<li>尾页</li>"
    }
    tempStr += "<li>当前" + currentPage + "页</li>&nbsp;"
    tempStr += "<li>共" + num + "条</li>"
    testingTd.innerHTML = tempStr;
}