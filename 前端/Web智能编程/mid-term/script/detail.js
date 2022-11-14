/*
 * @Descripttion: 
 * @version: 
 * @Author: 王远昭
 * @Date: 2022-11-14 14:39:52
 * @LastEditors: 王远昭
 * @LastEditTime: 2022-11-14 14:56:09
 */
// Detail页面的切换按钮处理函数
// 任何一处地方添加上 class="toggle-wrapper" 即可。无需ID、函数调用、简化代码
$(function toggle() {
$(".toggle-wrapper").on("click",function(){
    $(this).toggleClass("active");
    })
})

