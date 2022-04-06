// 获取内嵌弹窗
let carParts = document.querySelector('#car-parts');
// 获取关闭按钮
let close2 = document.querySelector('.img-close2');
// 获取查看按钮
let aBtn = document.querySelectorAll('.aBtn');
// 1.点击关闭按钮隐藏
close2.onclick = function() {
        carParts.style.display = "none";
    }
    // 2.点击查看按钮显示
for (let i = 0; i < aBtn.length; i++) {
    aBtn[i].onclick = function() {
        carParts.style.display = "block";
    }
}