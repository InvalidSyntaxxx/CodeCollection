/*
 * @Descripttion:
 * @version:
 * @Author: 王远昭
 * @Date: 2022-11-10 21:37:10
 * @LastEditors: 王远昭
 * @LastEditTime: 2022-11-11 23:58:34
 */

const photo_per_page = 12;
let CurrentPage = 1; // 当前页数
//全局变量total:照片总数
let total = 0
$.ajax({
  url: "assets/data/bing.json",
  async: false,
  success:(d)=>{
    total = d.length
  }
})
function renderDataByCurrentPage(CurrentPage) {
  var currentData = [];
  $.ajax({
    url: "assets/data/bing.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      for (
        let i = CurrentPage * photo_per_page;
        i < (CurrentPage + 1) * photo_per_page;
        i++
      ) {
        currentData.push(data[i]);
      }
      renderGallery(currentData);
    },
  });
}

// 由模板生成节点
function generateNode(tempalte) {
  var CardNode = document.createElement("div");
  CardNode.innerHTML = tempalte;
  return CardNode;
}

function renderGallery(data) {
  const parentNode = document.getElementById("gallery");
  //渲染前先清除原有样式
  $("#gallery").empty()
  
  var tempalte = "";
  var temp = "";
  let d = data;
  // console.log(data[0])
  for (let i = 0; i < photo_per_page; i++) {
    temp +=
      `<div class="card flex-fill" id="` +
      d[i]["id"] +
      `" style="min-width: 200px;">
        <img src="` +
      d[i]["url"] +
      `"
            class="rounded">
        <div class="title-wrapper">
            <div class="title">
                <div class="title-text">第` +
      d[i]["id"] +
      `期</div> 
            </div>
            <div class="time">
                <span>` +
      d[i]["time"] +
      `</span>
            </div>
        </div>
        <div class="content">
        ` +
      d[i]["description"] +
      `
        </div>
        <div class="tags">
<i class="bi bi-tags-fill"></i>
<span class="badge rounded-pill bg-primary">风景</span>
<span class="badge rounded-pill bg-success">人物</span>
<span class="badge rounded-pill bg-info">美食</span>
</div>
    </div>
`;
    if (i && i % 2 == 0) {
      temp = `<div class="card-wrapper d-flex">` + temp + `</div>`;
      tempalte += temp;
      temp = "";
    }
  }
  var CardNode = generateNode(tempalte);
  CardNode.style;
  parentNode.appendChild(CardNode);
}

// 解决JS修改DOM后，CSS文件的媒体查询不生效
// 自定义媒体查询函数
function Media() {
  // 此媒体查询以最小宽度为 320px 的视口为目标
  const mQuery = window.matchMedia("(max-width: 768px)");
  function handleMobilePhoneResize(e) {
    // 检查媒体查询是否为真
    if (e.matches) {
      var Node = $("title").css({ display: "inline" });
    }
  }
  mQuery.addListener(handleMobilePhoneResize);
}

function bubble() {
  let bubbles = document.getElementById("bubbles");
  let offset = 50; //气泡偏移
  let bArray = [];
  let sArray = [0.3, 0.4, 0.5, 0.7, 0.8];
  let color = "#0192bd";
  for (var i = 0; i < bubbles.clientWidth + offset; i++) {
    bArray.push(i - offset / 2);
  }
  function randomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function createNode(size, color) {
    const template =
      '<div class="individual-bubble" style="left: ' +
      randomValue(bArray) +
      "px; width: " +
      size +
      "rem; height:" +
      size +
      "rem;position: absolute;bottom:10px ;border-radius: 100%;background-color: " +
      color +
      ';z-index: 1;"></div>';
    let Node = document.createElement("div");
    Node.innerHTML = template;
    return Node;
  }
  setInterval(function () {
    let size = randomValue(sArray);
    let Node = createNode(size, color);
    bubbles.appendChild(Node);
    Node.animate(
      [
        { transform: "translateY(0px)", opacity: 0.7 },
        { transform: "translateY(-2rem)", opacity: 0.1 },
      ],
      3000
    );
    setTimeout(() => bubbles?.removeChild(Node), 3000);
  }, 100);
}

function wordsPerDay() {
  var Node = document.getElementById("words-per-day");
  $.ajax({
    url: "https://apis.jxcxin.cn/api/lishi?format=json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let index = 1;
      Node.innerText = data.content[0];
      setInterval(() => {
        Node.innerText = data.content[index];
        if (index != data.content.length) index++;
        else index = 0;
      }, 3500);
    },
  });
}
// 页数改变事件
function handlePageChange() {
  var CurrentPage = parseInt($(".active").text());
  let TotalPage = total / photo_per_page;
  function changeBtn(CurrentPage) {
    //active类居中
    if (CurrentPage >= 2 && CurrentPage <= TotalPage - 1) {
      $("#first-btn").removeClass("active");
      $("#second-btn").addClass("active");
      $("#third-btn").removeClass("active");
      $("#first-btn").html(`<a class="page-link">`+(CurrentPage - 1).toString()+`</a>`);
      $("#second-btn").html(`<a class="page-link">`+CurrentPage                 +`</a>`);
      $("#third-btn").html(`<a class="page-link">`+(CurrentPage + 1).toString()+`</a>`);
    }
    //active为第一页
    else if (CurrentPage == 1) {
      $("#first-btn").html(`<a class="page-link">1</a>`);
      $("#second-btn").html(`<a class="page-link">2</a>`);
      $("#third-btn").html(`<a class="page-link">3</a>`);
      $("#second-btn").removeClass("active");
      $("#first-btn").addClass("active");
    }
    //active为最后页
    else {
      $("#first-btn").html(`<a class="page-link">`+(CurrentPage - 2).toString()+`</a>`);
      $("#second-btn").html(`<a class="page-link">`+(CurrentPage - 1).toString()+`</a>`);
      $("#third-btn").html(`<a class="page-link">`+CurrentPage +`</a>`);
      $("#second-btn").removeClass("active");
      $("#third-btn").addClass("active");
    }
  }
  //点击前一页
  $("#pre-btn").click(() => {
    if (CurrentPage == 1) {
      //第一页,不能再前啦
      alert("当下已经最好,无需留恋过去");
      return;
    }
    CurrentPage--;
    changeBtn(CurrentPage);
    renderDataByCurrentPage(CurrentPage);
  });
  //点击后一页
  $("#next-btn").click(() => {
    if (CurrentPage == TotalPage) {
      //最后一页,不能再后啦
      alert("当下已经最好,无需憧憬未来");
      return;
    }
    CurrentPage++;
    changeBtn(CurrentPage);
    renderDataByCurrentPage(CurrentPage);
  });
  //点击第一个按钮
}
//函数入口，功能执行
function main() {
  renderDataByCurrentPage(CurrentPage);
  bubble();
  Media();
  handlePageChange();
  wordsPerDay();
}
main();