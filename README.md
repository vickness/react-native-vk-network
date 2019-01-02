# rn-network-handle
a network tool with react-native
# install
```
npm install rn-network-handle  or  yarn add rn-network-handle
```
# Examples
```
//导入文件
import NetworkManage from "rn-network-handle";
```
```
//1.直接使用
NetworkManage.get("https://www.apiopen.top/satinApi?type=1&page=1").then(res => {
        console.log(res);
});

const params = {
        'type': '1',
        'page': '1'
};
NetworkManage.post("https://www.apiopen.top/satinApi", params).then(res => {
        console.log(res);
});

```
```
//2.继承后使用
export default class NetUtils extends NetworkManage{
    
    //配置全局请求头
    static commonHeaders() {
        return {
            'header1': 'xxxxx',
            'header2': 'xxxxx',
        }
    }
    
    //配置全局参数
    static commonParams() {
        return {
            'token': 'xxxxx',
            'userId': 'xxxxx',
        }
    }
    
    //配置全局超时时间
    static commonTimeOut() {
        return 15
    }
    
    //配置全局数据解析
    static analysis(status, res) {
    
        console.log(res);
        
        if (res.code === 200) {
            
            return {
                'message' : '请求成功',
                'data' : res,
            }
            
        } else {
            
            return {
                'message' : '请求失败',
                'data' : res,
            }
        }
    }
}
    
```
```
NetUtils.get("https://www.apiopen.top/satinApi?type=1&page=1").then(res => {
        console.log(res);
});
```
```
//3.同步请求
(async () => {
        console.log("同步请求开始");
        const res1 = await NetUtils.get("https://www.apiopen.top/novelApi");
        console.log(res1);
        const res2 = await NetUtils.get("https://www.apiopen.top/novelApi");
        console.log(res2);
        const res3 = await NetUtils.post("https://www.apiopen.top/satinApi?type=1&page=1");
        console.log(res3);
        const res4 = await NetUtils.post("https://www.apiopen.top/satinApi?type=1&page=1");
        console.log(res4);
        const res5 = await NetUtils.get("https://www.apiopen.top/satinApi?type=1&page=1");
        console.log(res5);
        console.log("同步请求结束");
    })();

```
