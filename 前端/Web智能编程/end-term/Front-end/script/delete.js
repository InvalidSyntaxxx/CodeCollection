/*
 * @Descripttion:
 * @version:
 * @Author: 王远昭
 * @Date: 2023-01-10 13:31:19
 * @LastEditors: 王远昭
 * @LastEditTime: 2023-01-14 10:27:40
 */
// 导入组件
const { createApp } = Vue;
const { ElMessage, ElMessageBox } = ElementPlus;

// 前端表单验证规则
const rules = {
    name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
    picture: [
        {
            type: "file",
            required: true,
            message: "请上传至少一张商品图",
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
        { type: "number", min: 0, message: "商品售价需大于0", trigger: "blur" },
    ],
    inventory: [
        {
            required: true,
            message: "请输入商品库存",
            trigger: "change",
        },
        { type: "number", min: 0, message: "库存量需大于0", trigger: "blur" },
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
            rootImage: "../data/img/",
            container: {
                products: [],
                tableData: [],
                currentPage: 1,
                pageSize: 8,
                totalItems: 0,
                filterTableData: [],
                flag: false,
            },
            form: {
                id: "",
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
                hot: "0",
            },
            type: [],
            originImage: [],
            rules: rules,
            UpdateTableVisible: false,
            id: "",
            loading: true,
            searchValue: "",
        };
    },
    methods: {
        showTips(tips, type) {
            ElMessage({
                showClose: true,
                message: tips,
                type: type,
            });
        },
        getType() {
            axios.get("http://localhost:53000/fenlei").then((res) => {
                this.type = res.data;
            });
        },
        getProduct() {
            axios
                .get("http://localhost:53000/products")
                .then((res) => {
                    this.container.products = res.data;
                    //   alert(JSON.stringify(this.container.products))
                })
                .then(() => {
                    this.container.totalItems = this.container.products.length;
                    if (this.container.totalItems > this.container.pageSize) {
                        for (let index = 0; index < this.container.pageSize; index++) {
                            this.container.tableData.push(this.container.products[index]);
                        }
                    } else {
                        this.container.tableData = this.container.products;
                    }
                });
        },
        // 每页显示条数改变触发
        handleSizeChange(val) {
            this.container.pageSize = val;
            this.handleCurrentChange(1);
        },
        // 当前页改变触发
        handleCurrentChange(val) {
            this.container.currentPage = val;
            // 判断是否为搜索的数据,传入对应值
            if (!this.container.flag) {
                this.currentChangePage(this.container.products);
            } else {
                this.currentChangePage(this.container.filterTableData);
            }
        },
        // 根据分页，确定当前显示的数据
        currentChangePage(list) {
            let fromNum = (this.container.currentPage - 1) * this.container.pageSize;
            let toNum = this.container.currentPage * this.container.pageSize;
            this.container.tableData = [];
            for (; fromNum < toNum; fromNum++) {
                if (list[fromNum]) {
                    this.container.tableData.push(list[fromNum]);
                }
            }
        },
        // 处理删除事件
        handleDelete(index) {
            ElMessageBox.confirm("此操作将永久删除该数据，是否删除？", "警告", {
                confirmButtonText: "马上删除",
                cancelButtonText: "我再想想",
                type: "warning",
            })
                .then(() => {
                    // 后端数据删除
                    axios({
                        url:
                            "http://localhost:53000/products/" +
                            this.container.tableData[index]["id"],
                        method: "delete",
                    })
                        .then(() => {
                            // 前端数据表格删除
                            this.container.tableData.splice(index, index + 1);
                            this.showTips("删除成功！", "success");
                        })
                        .catch(() => {
                            this.showTips("似乎出错了...", "info");
                        });
                })
                .catch(() => {
                    this.showTips("操作取消", "info");
                });
        },
        // 处理更新事件
        handleUpdate(index) {
            this.UpdateTableVisible = true;
            this.form = this.container.tableData[index];
            this.originImage = [
                {
                    name: this.container.tableData[index]["name"],
                    url: "../data/img/" + this.container.tableData[index]["img"],
                },
            ];
            this.id = this.container.tableData[index]["id"];
        },
        // 根据 id 提交到 服务端
        onUpdate(id) {
            if (!this.$refs.ruleFormRef) return;
            this.$refs.ruleFormRef.validate((valid) => {
                if (valid) {
                    axios({
                        method: "put",
                        url: "http://localhost:53000/products/" + id,
                        data: this.form,
                        timeout: 1000,
                    })
                        .then(() => {
                            this.showTips("更新成功！", "success");
                        })
                        .catch(() => {
                            this.showTips("似乎出错了，未能修改", "danger");
                        });
                } else {
                    console.log("error submit!");
                    return false;
                }
            });
        },
        querySearch(queryString, cb) {
            const results = queryString
                ? this.container.tableData.filter(item => ((item.id+"").indexOf(queryString) != -1 || item.name.indexOf(queryString) != -1))
                : []
            // callback回调函数，返回结果
            cb(results)
        },
        handleSearch() {
            // 前端搜索功能需要区分是否检索,因为对应的字段的索引不同
            let newTableData = []
            this.container.products.filter((item) => {
                if ((item.id+"").indexOf(this.searchValue) != -1 || item.name.indexOf(this.searchValue) != -1) {
                    newTableData.push(new Object(item))
                }
            })
            // 搜索后的新数据
            this.container.filterTableData = newTableData
            // 页面数据改变重新统计数据数量和当前页
            this.container.currentPage = 1;
            this.container.totalItems = this.container.filterTableData.length;
            // 渲染表格,根据值
            this.currentChangePage(this.container.filterTableData);
            // 页面初始化数据需要判断是否检索过
            this.container.flag = true;
        }

    },
    mounted() {
        this.getProduct();
        this.loading = false;
        this.getType();
    },
};

const app = Vue.createApp(App);
app.use(ElementPlus, {
    locale: ElementPlusLocaleZhCn,
});
app.mount("#app");
