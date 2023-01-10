/*
 * @Descripttion:
 * @version:
 * @Author: 王远昭
 * @Date: 2023-01-05 23:10:46
 * @LastEditors: 王远昭
 * @LastEditTime: 2023-01-09 23:51:11
 */

const { createApp } = Vue;

const App = {
  data() {
    return {
      input: "",
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
        .get("http://localhost:53000/products?id_gte=" + (limit+1))
        .then((res) => {
          this.others = res.data;
        });
    },
  },
}
const app = Vue.createApp(App);
app.use(ElementPlus);
app.mount("#app");
