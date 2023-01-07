/*
 * @Descripttion: 
 * @version: 
 * @Author: 王远昭
 * @Date: 2023-01-05 23:10:46
 * @LastEditors: 王远昭
 * @LastEditTime: 2023-01-07 22:31:32
 */

const { createApp } = Vue

createApp({
    data(){
        return {
            products: []
        }
    },
    mounted(){
        this.getProduct(8);
    },
    methods: {
        getProduct(limit){
            axios.get("http://localhost:53000/products?_limit="+limit)
            .then((res)=>{
               this.products = res.data
            })
        }
    }
}).mount('#app');



