'''
    ---------------爬取图片脚本-------------
    | 1. 环境: Windows-WSL2-Ubuntu20.04    |
    | 2. 确定图片信息保存地址 saveto        |
    | 3. 当前脚本目录下, Ubuntu终端执行:    |
    |       python3 getBing.py             |
    | 4. 到 saveto 查看已爬取的 JSON 信息   |
    ----------------------------------------

    版权：无版权，喜欢就行，欢迎提建议更新
'''
import json
import os
import re
import time
import requests
import atexit

totalPage = 204 #网站的总页数
currentPage = 1 #当前爬取图片的页数
myheader = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.46 '
    }
statusCode = 0 #爬取时返回的HTTP状态码
mainSite = "https://bing.ioliu.cn" #要爬的网页
saveto = "/mnt/c/Users/86199/Desktop/CodeCollection/前端/Web智能编程/mid-term//assets/data/bing.json"
pic_url_list = [] #图片的下载地址
fail=[] #下载失败的url
success=[] #下载成功的url
data = []
# param：页面的相应地址
# return：成功直接返回相应DOM文档，失败返回 "什么也没有"
def get_response_text(pageNum):
    msg=""
    try:
        currentSite = mainSite + "/?p=" + str(pageNum)
        respose = requests.get(url=currentSite,headers=myheader)
        status_code = respose.status_code
        if 200 <= status_code < 300:
            msg = '请求站点操作成功'
        elif status_code == 401:
            msg = '请求站点匿名用户访问权限资源时的异常'
        elif status_code == 403:
            msg = '请求站点无访问权限，请联系管理员授予权限'
        elif status_code == 404:
            msg = '请求站点请求的资源不存在'
        elif status_code == 500:
            msg = '请求站点请求资源的系统异常，请稍后重试'
        else:
            msg = '请求站点未知返回代码'
    except requests.exceptions.ConnectionError as e:
        print("连接错误，请求站点是否可以访问？是否有网络或网络不稳定？\n请检查网络问题...\n"+e)
        time.sleep(10)
    except requests.exceptions.InvalidURL as e:
        print("非法的URL，请验证URL是否正确或网站是否存在\n"+e)
    except requests.exceptions.ReadTimeout:
        print("请求站点远程服务器无响应数据")
        time.sleep(10)
    except:
        print("请求站点遇到未知错误...")
        time.sleep(10)
    finally:
        print(msg)
        return respose.text 
def get_PicUrlList(pageNum):
    mainText = get_response_text(pageNum)
    rule = re.compile(r'class="description"><h3>(.*?)\(©.*?<em class="t">(.*?)</em>.*?class=\"ctrl download\" photo=\"(.*?)\" href=\"(.*?)\"')
    result_groups = re.findall(rule,mainText)

    if result_groups:
        for i in result_groups:
            img_info={
                'description':i[0],
                'time':i[1],
                'id':i[2],
                'url':i[3]
            }
            data.append(img_info)
    else:
        print("No match!!")


def downloadPic(img_info):
    global success,fail
    try:
        #利用Shell下载图片
            command = "sudo wget "+img_info['url']+" -q -O "+ saveto + img_info['description']+img_info['time']+'.jpg'
            os.system(command)
            success.append(img_info)
            print(img_info['description']+img_info['time']+'.jpg', '保存成功!')
        #每隔一分钟下载一张
        #尽量别一次性下载那么多，增加别人的主机的压力，反正也是挂着后台一直跑，可以慢慢下
            time.sleep(3)
    except:
        fail.append(img_info)
        print("something wrong!\n")

def main_run():
    global completeCount,failCount, totalPage

    for currentPage in range(totalPage):
        get_PicUrlList(currentPage)
        # for img_info in url_list:
            # print("正在下载："+img_info['description'])
            # downloadPic(img_info)
        print('page:' + str(currentPage) + 'complete')
        currentPage += 1
    jsonify(data)


@atexit.register
def write_info():
    with open('info.txt','w',encoding='utf-8') as file:
        file.write("fail:"+str(fail)+("\n")+ "total:" + str(len(fail))
        +("\n")+"success:"+str(success)+("\n")+ "total:" + str(len(success))
        +("\n")+"current-page:"+str(currentPage))

def jsonify(url_list):
    # temp = {"id":img_info['id'],"url":img_info["url"],"description":img_info["description"],"time":img_info["time"]}
    with open(saveto,'a',encoding='utf-8') as file:
        json.dump(url_list,file, ensure_ascii=False)

if __name__== "__main__":
    main_run()
    