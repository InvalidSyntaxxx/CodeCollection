/*
 * @Descripttion:
 * @version:
 * @Author: 王远昭
 * @Date: 2023-01-05 23:10:46
 * @LastEditors: 王远昭
 * @LastEditTime: 2023-01-13 23:08:04
 */

// 导入组件
const { createApp } = Vue;
const { ElMessage } = ElementPlus;

// 前端表单验证规则
 const rules = {
  name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  picture: [
    {
      type:"file",
      required: true,
      message:"请上传至少一张商品图",
      trigger: "change",
    },
  ],
  type: [
    {
      required: true,
      message: "请选择商品类型",
      trigger: "change",
    },
  ],
  price: [
    {

      required: true,
      message: "请输入商品售价",
      trigger: "change",
    },
    { type:'number', min: 0, message: "商品售价需大于0", trigger: "blur" },
  ],
  inventory: [
    {
      required: true,
      message: "请输入商品库存",
      trigger: "change",
    },
    { type:'number',min: 0, message: "库存量需大于0", trigger: "blur" },
  ],
  description: [{ required: true, message: "请输入商品简介", trigger: "blur" }],
  date: [
    {
      type: "date",
      required: true,
      message: "请选择日期",
      trigger: "change",
    },
  ],
  time: [
    {
      type: "date",
      required: true,
      message: "请选择时间",
      trigger: "change",
    },
  ],
};

const App = {
  data() {
    return {
      type: [],
      form: {
        name: "",
        img: "",
        type: "",
        price: "",
        inventory: "",
        date: "",
        time: "",
        onShelves: false,
        description: "",
        see: "0",
        love: "0",
        hot: "0"
      },
      rules: rules,
    };
  },
  setup() {
    const { ref } = Vue;
    const ruleFormRef = ref();
    const uploadFile = ref();
  },
  mounted() {
    this.getType();
  },
  methods: {
    showTips(tips,type){
        ElMessage({
            showClose: true,
            message: tips,
            type: type,
          })
    },
    postProduct(product,url) {
        axios({
            method: 'post',
            url: url,
            data: product,
            timeout:1000
        })
    },
    getType() {
      axios.get("http://localhost:53000/fenlei").then((res) => {
        this.type = res.data;
      });
    },
    async uploadAction(e){
        let param = new FormData();
        param.append('file', e.file);
        let res = await this.$http.post(`http://localhost:5500/Front-end/data/img/`, param);
        
    },
    onSubmit() {
      if (!this.$refs.ruleFormRef) return;
      this.$refs.ruleFormRef.validate((valid) => {
        if (valid) {
          let url = 'http://localhost:53000/products'
          // ts= new Date(Date.parse(this.form['date']))
          // year = ts.getFullYear()
          // month = ts.getMonth()+1
          // day = ts.getDate()
          // this.form['date']= year +"年"+month+"月"+day+"日"
          // alert(JSON.stringify(_.omit(this.form,['date','time'])))
          
          this.postProduct(this.form,url);
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    resetForm() {
      if (!this.$refs.ruleFormRef) return;
      this.$refs.ruleFormRef.resetFields();
    },
  },
};
const app = Vue.createApp(App);
app.use(ElementPlus,{
  locale: ElementPlusLocaleZhCn,
});
app.mount("#app");
