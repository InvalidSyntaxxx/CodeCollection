/*
 * @Descripttion:
 * @version:
 * @Author: 王远昭
 * @Date: 2023-01-05 23:10:46
 * @LastEditors: 王远昭
 * @LastEditTime: 2023-01-07 23:29:22
 */

const { createApp } = Vue;

createApp({
  data() {
    return {
      products: [],
      others: [],
    };
  },
  mounted() {
    this.getProduct(8);
    this.getOther(8);
  },
  methods: {
    getProduct(limit) {
      axios
        .get("http://localhost:53000/products?_limit=" + limit)
        .then((res) => {
          this.products = res.data;
        });
    },
    getOther(limit) {
      axios
        .get("http://localhost:53000/products?productId_gte=" + (limit+1))
        .then((res) => {
          this.others = res.data;
        });
    },
  },
}).mount("#app");
