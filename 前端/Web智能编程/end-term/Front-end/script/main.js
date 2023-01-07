/*
 * @Descripttion: 
 * @version: 
 * @Author: 王远昭
 * @Date: 2023-01-05 23:10:46
 * @LastEditors: 王远昭
 * @LastEditTime: 2023-01-07 18:51:49
 */
let product = []
axios.get("http://localhost:53000/products")
.then((res)=>{
    let data = res.data
    for(let i=0;i<8;i++){
        let template = `
        <div class="product">
        <div class="imgcontainer">
            <img src="../data/img/`+data[i]['img']+`" alt="">
        </div>
        <h3 class="name">`+data[i]['name']+`</h3>
        <p class="description">`+data[i]['description'].substring(0,16)+`...</p>
        <p class="price">`+data[i]['price']+`元</p>
        </div>`;
        $(".right").append(template);
    }
})