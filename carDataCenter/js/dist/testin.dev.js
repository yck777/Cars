"use strict";

// 获取内嵌弹窗
var carTesting = document.querySelector('#car-testing'); // 获取关闭按钮

var close3 = document.querySelector('.img-close3'); // 获取查看按钮
// 加定时器的作用是：先让页面渲染完全，再去操作Dom,不然动态的值获取不到

setTimeout(function () {
  var layuiTa = document.querySelectorAll('.cdc-btn2'); // 2.点击查看按钮显示

  for (var i = 0; i < 5; i++) {
    layuiTa[i].onclick = function () {
      carTesting.style.display = "block";
    };
  }
}, 1000); // 1.点击关闭按钮隐藏

close3.onclick = function () {
  carTesting.style.display = "none";
}; // 分页器 


function goPage(pno, pSize) {
  // 获取值
  var iTr = document.querySelector('#iTr');
  var testingTd = document.querySelector('.testing-td'); // 1.总行数

  var num = iTr.rows.length; // 2.总页数

  var totalPages = 0; // 3.一页的行数

  var pageSize = pSize; // 总共分几页

  if (num / pageSize > parseInt(num / pageSize)) {
    totalPages = parseInt(num / pageSize) + 1;
  } else {
    totalPages = parseInt(num / pageSize);
  } // 当前页码数


  var currentPage = pno; //开始显示的行  1

  var startRow = (currentPage - 1) * pageSize + 1; //结束显示的行   10

  var endRow = currentPage * pageSize; //遍历显示数据实现分页

  for (var i = 1; i < num + 1; i++) {
    var irow = iTr.rows[i - 1];

    if (i >= startRow && i <= endRow) {
      irow.style.display = "block";
    } else {
      irow.style.display = "none";
    }
  }

  var tempStr = "";

  if (currentPage > 1) {
    tempStr += "<a href=\"#\" onClick=\"goPage(\" + (currentPage - 1) + \",\" + pSize + \")\"><\u4E0A\u4E00\u9875&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a> <input type=\"text\" value=\"1\"/>";

    for (var j = 1; j <= totalPages; j++) {
      tempStr += "<a href=\"#\" onClick=\"goPage(" + j + "," + pSize + ")\">" + j + "&nbsp;&nbsp;&nbsp;</a>";
    }

    ;
  } else {
    tempStr += "<上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

    for (var j = 1; j <= totalPages; j++) {
      tempStr += "<a href=\"#\" onClick=\"goPage(" + j + "," + pSize + ")\">" + j + "&nbsp;&nbsp;&nbsp;</a>";
    }

    ;
  }

  if (currentPage < totalPages) {
    tempStr += "<a href=\"#\" onClick=\"goPage(" + (currentPage + 1) + "," + pSize + ")\">下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>";
  } else {
    tempStr += "  下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  }

  testingTd.innerHTML = tempStr;
}

goPage(1, 10);