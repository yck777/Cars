// 弹出窗口
// 1.获取元素
let maintenance = document.getElementById('maintenance-window');
// 获取关闭按钮
let close = document.querySelector('.img-close');
// 修理次数
let h4rTarget1 = document.getElementsByClassName('h4r')[0];
// 保养次数
let h4rTarget2 = document.getElementsByClassName('h4r')[1];
// 年检次数
let h4rTarget3 = document.getElementsByClassName('h4r')[2];
// 获取到页码
let pagination_box = document.querySelector('.pagination-box');
let ul = pagination_box.querySelector('ul');
let lis = ul.querySelectorAll('li');
// 上一图标按钮
let imgLeft = document.querySelector('.img-left');
// 下一图标按钮
let imgRight = document.querySelector('.img-right');
// input页码数
let inputValue = document.querySelector('#toFirs');
// 确认按钮
let btnClick = document.querySelector('#btnClick');
// 获取下拉列表
let mySelect = document.getElementById('sel');


// 2.封装函数，点击次数弹出显示
function h4rTarget(btn) {
    btn.onclick = function() {
        maintenance.style.display = "block";
    }
}
h4rTarget(h4rTarget1);
h4rTarget(h4rTarget2);
h4rTarget(h4rTarget3);

// 3.点击关闭按钮隐藏
close.onclick = function() {
    maintenance.style.display = "none";
}

// 定义获取索引的变量
let resNum = 0;
// 4.页码样式点击切换
for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function() {
        // 切换之前将全部的li样式清空
        for (let i = 0; i < lis.length; i++) {
            lis[i].className = '';
        }
        // 点击那个li，那个li就显示样式
        this.className = 'current';
        // 将i赋值给resNum,后面用得到
        resNum = i;
        // 当点击小li时页码也要跟着变化
        inputValue.value = i + 1;
        if (i == 1) {
            hideTr();
        } else {
            showTr();
        }
        optionSelect();

    }
}
// 5.下一页图标页面按钮切换
imgRight.onclick = function() {
        // 当我点击下一页图标按钮时,resNum=1
        resNum = 1;
        // 当点击下一个页面时页码也要跟着变化
        inputValue.value = resNum + 1;

        liChange();
        if (num > pageSize && num <= totalNum) {
            hideTr();
        } else if (num > totalNum) {
            greater2();
        }
        optionSelect();

    }
    // 6.上一页图标页面按钮切换
imgLeft.onclick = function() {
    // 当点击上一个按钮时，判断当前li的resNum是否为1，如果为1，再次点击按钮，不执行操作，input的页码也不变
    // 否则的话进行样式操作和页码赋值
    if (resNum < 1) return;
    else {
        liChange2();
        inputValue.value = resNum;
    }
    optionSelect();
    if (num > pageSize && num <= totalNum) {
        showTr();
    } else if (num > totalNum) {
        greater();
    } else {
        hideTr();
    }
}

// 7.input框输入页码数，进行页面内容切换
btnClick.onclick = function() {
    if (inputValue.value != null) {
        if (inputValue.value == 1) {
            // resNum要赋值为0
            resNum = 0;
            liChange();
            if (num > pageSize && num <= totalNum) {
                showTr();
            } else if (num > totalNum) {
                greater();
            }
        } else if (inputValue.value == 2) {
            // resNum要赋值为1
            resNum = 1;
            liChange();
            if (num > pageSize && num <= totalNum) {
                hideTr();
            } else if (num > totalNum) {
                greater2();
            }
        };
        optionSelect();
    }
}

// 8.点击下来列表options
// 封装函数,当下拉列表的value等于input的value时
function optionSelect() {
    for (let i = 1; i < mySelect.options.length; i++) {
        if (mySelect.options[i].value == inputValue.value) {
            mySelect.value = inputValue.value;
        }
    }
}

let SelectValue = 0;
// 9.选中那个option，那个option的就选中，并且select显示option值  onchange()
mySelect.onchange = function() {
    // 遍历mySelect
    for (i = 0; i < mySelect.length; i++) {
        // 如果当前option被选中
        if (mySelect.options[i].selected) {
            SelectValue = parseInt(mySelect[i].value);
            // 当前option的值转成number并赋值给  页码
            inputValue.value = SelectValue;
            // 赋值给变量resNum
            resNum = SelectValue;
            // 调用函数
            liChange2();
            // 因为是2，所以要减1,li从0开始算的
            resNum = resNum - 1;
            // 如果option的value值是2
            if (SelectValue == 2) {
                if (num > pageSize && num <= totalNum) {
                    hideTr();
                } else if (num > totalNum) {
                    greater2();
                }
            } else if (SelectValue == 1) {
                //如果option的value值是1     
                if (num > pageSize && num <= totalNum) {
                    showTr();
                } else if (num > totalNum) {
                    greater();
                } else {
                    hideTr();
                }
            }
        }
    }
}

// 封装函数,样式改变
function liChange() {
    // 清除所有li的样式
    for (let i = 0; i < lis.length; i++) {
        lis[i].className = '';
    }
    // 给当前小li添加样式 当前resNum为0;
    lis[resNum].className = 'current';
}

// 封装函数,样式改变2
function liChange2() {
    // 清除所有li的样式
    for (let i = 0; i < lis.length; i++) {
        lis[i].className = '';
    }
    // 给当前小li添加样式 当前resNum为0;
    lis[resNum - 1].className = 'current';
}

//  分页函数
// 弹窗的table内容
var itable = document.querySelector("#iTable");
var trRows = itable.querySelectorAll('tr');
//表格所有行数(所有记录数)
var num = trRows.length;
//每页显示行数,默是20
var pageSize = 10;
//共20条数据
let totalNum = 20;

//遍历显示数据实现分页  
for (var i = 1; i < (num + 1); i++) {
    // 如果表格的数据大于10，小于等于20
    if (num > pageSize && num <= totalNum) {
        // 在遍历第二页的行数
        // 封装函数  打开页面先默认第一页显示 当用户点击上一页或者,数字1，页码1时调用该函数
        function showTr() {
            for (let i = pageSize; i < num; i++) {
                // 第二页的行数隐藏
                trRows[i].style.display = 'none';
            }
            // 第一页的行数显示
            for (let i = 0; i < pageSize; i++) {
                trRows[i].style.display = 'block';
            }
        }
        showTr();
        // 当用户点击下一页或者,数字2，页码2时调用该函数
        function hideTr() {
            for (let i = pageSize; i < num; i++) {
                // 第二页的行数显示
                trRows[i].style.display = 'block';
            }
            // 第一页的行数隐藏
            for (let i = 0; i < pageSize; i++) {
                // 第二页的行数显示
                trRows[i].style.display = 'none';
            }
        }
    } else if (num > totalNum) {
        // 判断数据大于20条 第一页显示
        function greater() {
            for (let i = 0; i < pageSize; i++) {
                trRows[i].style.display = 'block';
            }
            for (let i = pageSize; i < totalNum; i++) {
                trRows[i].style.display = 'none';
            }
        }
        greater();
        // 第二页隐藏
        function greater2() {
            for (let i = 0; i < pageSize; i++) {
                trRows[i].style.display = 'none';
            }
            for (let i = pageSize; i < totalNum; i++) {
                trRows[i].style.display = 'block';
            }
        }
        // 大于20条的数据就隐藏，不再显示
        for (let i = totalNum; i < num; i++) {
            trRows[i].style.display = 'none';
        }

    } else {
        // 否则只有第一页显示
        for (let i = 0; i < num; i++) {
            trRows[i].style.display = 'block';
        }
    }
}