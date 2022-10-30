[TOC]

> **声明：**本笔记仅为自己课内笔记，大多数内容为自己实践记录，很多基础的地方并未详细记录下来，不适合完全不懂SQL知识的初学者。
>
> **作者不完全保证其通用性和正确性，仅供参考和讨论，因本笔记造成的后果本人概不负责。**

# 1.基本用法

## 1.1数据定义

### 1.1.1模式的定义与删除

1. 定义模式

   ```mysql
   CREATE SCHEMA <模式名> AUTHORIZATION <用户名>;
   ```

   - 若不指定模式名，则为模式名为用户名；

   - 用户需拥有数据库管理员权限

     > **[例]**   为用户WANG创建模式 TEST，并在其定义一个表：
     >
     > ` CREATE SCHEMA TEST ZHANG CREATE TABLE table1(COL1 INT,` 
     >
     > `COL2 INT,`
     >
     > `COL3 CHAR(20),`
     >
     > `COL4 DECIMAL(5,2))`

2. 删除模式

   ```mysql
   DROP SCHEMA <模式名> <CASCADE|RESTRICT>;
   ```

### 1.1.2基本表的定义、删除与更新⭐

1. 定义

   ```mysql
   CREATE TABLE <表名>  ( <列名1> <数据类型>[列级完整性约束]
   				   [,<列名2> <数据类型>[列级完整性约束]]
   					...
   				   [,<表级完整性约束条件>]);
   ```

   数据类型：[Mysql数据类型](https://www.runoob.com/mysql/mysql-data-types.html)

2. 删除

   ```mysql
   DROP TABLE <表名> [RESTRICT|CASCADE];
   ```

3. 更新

   ```mysql
   ALTER TABLE <表名>
   [ADD  [COLUMN] <新列名> <数据类型> [列级完整性约束]]
   [ADD  [表级完整性约束]]
   [DROP [COLUMN] <列名> [CASCADE|RESTRICT]]
   [DROP CONSTRAINT <完整约束名> [RESTRICT|CASCADE]]
   [ALTER COLUMN <列名> <数据类型>]
   ```

### 1.1.3索引的定义、修改和删除

1. 建立索引

   ```mysql
   CREATE [UNIQUE] [CLUSTER] INDEX <索引名>
   ON <表名> (<列名> [<次序>][, <列名> [<次序>] ])
   ```

   - UNIQUE：表明此索引的每一个索引值只对应唯一的数据记录。
   - CLUSTER：聚簇索引。

   > **[例]** 
   >
   > Student 表按学号升序建立唯一索引：`CREATE UNIQUE INDEX Stusno ON Student(Sno);`
   >
   > Course表按课程号升序建立唯一索引：`CREATE UNIQUE INDEX Coucno ON Course(Cno);`
   >
   > SC表按学号升序和课程号降序建立唯一索引：`CREATE UNIQUE INDEX SCno ON SC(Sno ASC,Cno DESC);`

2. 修改索引

   ```mysql
   ALTER INDEX <旧索引名> RENAME TO <新索引名>;
   ```

3. 删除索引

   ```mysql
   DROP INDEX <索引名>;
   ```

## 1.2数据查询

```mysql
SELECT [ALL|DISTINCT] <目标表达式>[, <目标表达式>]...
FROM <表名或视图名>[,<表名或视图名>...] | (SELECT语句) [AS] <别名>
[WHERE <条件表达式>]
[GROUP BY <列名>[HAVING <条件表达式>]]
[ORDER BY <列名>[ASC | DESC]];
```



# 常用技巧

## 创建

### 数据库的创建

```mysql
CREATE DATABASE database_name;
```

### 数据表的创建⭐

1. 表不存在

   ```mysql
   CREATE TABLE [IF NOT EXISTS] table_name{
   	col1_name type[size] [NOT NULL|NULL] [DEFAULT VALUE],
       col2_name type[size] [NOT NULL|NULL] [DEFAULT VALUE],
       ...
       PRAMARY KEY(col1_name,...)
   }ENGINE=InnoDB;
   ```

2. 表已存在，创建新列

   ```mysql
   ALTER TABLE table_name 
   ADD|DROP COLUMN new_col|old_col 
   [new_col_attr];
   ```

## 删除

### 数据库的删除

```mysql
DROP DATABASE database_name;
```

### 数据表的删除

1. 删除整个表

   ```mysql
   DROP TABLE table_name;
   ```

2. 删除某个列

   ```mysql
   DELETE FROM table_name WHERE condition;
   ```

## 更新

### 数据库的更新

无

### 数据表的更新

1. 更新表的某个属性

   ```mysql
   ALTER TABLE table_name...;
   ```

2. 更新表中数据

   ```mysql
   UPDATE table_name SET VALUE() WHERE condition;
   ```

## 查询⭐

### 数据库的查询

```mysql
USE database_name;
```

