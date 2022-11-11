/*
 * @Descripttion:
 * @version:
 * @Author: 王远昭
 * @Date: 2022-11-10 21:37:10
 * @LastEditors: 王远昭
 * @LastEditTime: 2022-11-11 16:56:40
 */

const photo_per_page = 12
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
<span class="badge rounded-pill bg-success">物5</span>
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
  let color = '#a1c4fd'
  for (var i = 0; i < bubbles.clientWidth + offset; i++) {
    bArray.push(i - offset/2);
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
  }, 350);
}

// 页数改变事件
//函数入口，功能执行
function main(){
  const photo_per_page = 12; // 3列 * 4行
  let CurrentPage = 1 // 当前页数
  renderDataByCurrentPage(CurrentPage,photo_per_page);
  bubble();
  Media()
  handlePageChange();
}
main()
