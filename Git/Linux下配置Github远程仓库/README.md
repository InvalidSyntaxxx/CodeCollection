<!--
 * @Descripttion: 
 * @version: 
 * @Author: 王远昭
 * @Date: 2022-11-11 19:27:25
 * @LastEditors: 王远昭
 * @LastEditTime: 2022-11-11 19:30:35
-->
1.设置git用户和邮箱
```
git config --global user.name "InvalidSyntaxxx"
git config --global user.email "1791081494@qq.com"
```


2.生成SSH密钥
```
ssh-keygen -t rsa		//直接敲3次回车，默认key放在/root/.ssh/下
```

3.在github上添加ssh密钥

```
cat /root/.ssh/id_rsa.pub
//复制到github上（Settings-->SSH andGPG keys-->New SSH key）,title随意
```

4.测试认证是否成功
```
[root@localhost data]# ssh -T git@github.com

The authenticity of host 'github.com (192.30.253.113)' can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'github.com,192.30.253.113' (RSA) to the list of known hosts.
Hi fujinzhou! You've successfully authenticated, but GitHub does not provide shell access.
```





5.克隆代码

```
git clone git@github.com:InvalidSyntaxxx/Blog-HairCollected.git
```

