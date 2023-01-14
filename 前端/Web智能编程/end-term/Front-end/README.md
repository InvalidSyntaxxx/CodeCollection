<!--
 * @Descripttion: 
 * @version: 
 * @Author: 王远昭
 * @Date: 2022-12-30 19:42:37
 * @LastEditors: 王远昭
 * @LastEditTime: 2023-01-14 10:29:13
-->

#### 使用前说明

1. 需联网的电脑 + 微软VSCode编辑器
2. Node.js版本  >= 16.0.0（自行安装）
3. npm全局安装有 **json-server**、VSCode安装有 Live Server
4. 本地 **53000 端口**未被占用

#### 安装

```sh
//安装json-server，模拟RESTful API处理数据
npm install -g json-server
```

#### 开始

1. 启动后端 json-server，数据文件为data目录下的 product.json 文件

   ```
   cd data && json-server --watch --port 53000 product.json
   ```

![image-20230114103448710](C:\Users\86199\AppData\Roaming\Typora\typora-user-images\image-20230114103448710.png)

2. VSCode环境下，使用Live Server启动根目录下的 index.html

   ![image-20230114104050280](C:\Users\86199\AppData\Roaming\Typora\typora-user-images\image-20230114104050280.png)

3. 进入商城，增删改查

   ![image-20230114104144201](C:\Users\86199\AppData\Roaming\Typora\typora-user-images\image-20230114104144201.png)

#### 演示

演示视频, 见 shop.mp4

#### 说明

1. 主要数据接口有 /**products** 和 /**fenlei**

   ![image-20230114104807844](C:\Users\86199\AppData\Roaming\Typora\typora-user-images\image-20230114104807844.png)

![image-20230114104836981](C:\Users\86199\AppData\Roaming\Typora\typora-user-images\image-20230114104836981.png)

其中products为商城商品信息，fenlei为商品的分类信息。商品展示主要以products为主。

字段分别对应**商品id，商品名称，商品描述，商品价格，商品库存，商品图片文件名，商品类型，浏览量，被喜爱数，热度**
