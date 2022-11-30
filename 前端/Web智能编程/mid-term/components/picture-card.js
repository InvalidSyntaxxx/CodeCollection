/*
 * @Descripttion:
 * @version:
 * @Author: 王远昭
 * @Date: 2022-11-29 00:58:28
 * @LastEditors: 王远昭
 * @LastEditTime: 2022-11-30 19:55:38
 */

// Component类
class PictureCard extends HTMLElement {
  // 设置观察属性
  static get observedAttributes() {
    return ["image", "name", "email"];
  }

  constructor() {
    super();
    //设定不外传
    var shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.innerHTML = `
      <!-- Component内样式，不影响局外样式 -->
      <style>
        /* ：host伪类代表自定义元素本身，既template标签 */
        :host {
          border: 1px solid #d5d5d5;
          border-radius: 3px;
          overflow: hidden;
          padding: 10px;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }
        .image {
          flex: 0 0 auto;
          width: 160px;
          height: 160px;
          vertical-align: middle;
          border-radius: 5px;
        }
      </style>
      <!-- Template自定义DOM结构 -->
      <div class="card" aria-hidden="true">
  <img src="${this.image}" class="card-img-top image" alt="...">
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-6"></span>
      <span class="placeholder col-8"></span>
    </p>
    <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
  </div>
</div>
      `;
  }
  get name() {
    return this.getAttribute("name");
  }
  get email() {
    return this.getAttribute("email");
  }
  get image() {
    return this.getAttribute("image");
  }

  connectedCallBack() {
    console.log("User-Card is Calling");
  }
}

//向全局定义自定义Component
if (!customElements.get("picture-card")) {
  customElements.define("picture-card", PictureCard);
}
