import NetworkManage from "./lib/src/index";

export default class NetUtils extends NetworkManage {

    //配置全局请求头
    static commonHeaders() {
        return {
            //'header1': 'xxxxx',
            //'header2': 'xxxxx',
        }
    }

    //配置全局参数
    static commonParams() {
        return {
            //'token': 'xxxxx',
            //'userId': 'xxxxx',
        }
    }

    //配置服务器域名
    static commonHost() {
        return "https://www.apiopen.top/"
    }

    //配置超时时间
    static commonTimeOut() {
        return 15
    }

    //配置全局数据解析
    static analysis(status, response, url, option) {

        console.log("请求地址：\n" + url);
        console.log("请求参数：\n" + JSON.stringify(option));
        console.log("请求结果：\n" + JSON.stringify(response));

        if (!status || !response.hasOwnProperty("code")) {

            return {
                'status' : false,
                'message' : '网络连接失败，请稍后再试',
                'data' : {},
            };
        }

        //自定义返回数据结构
        if (response.code === 200) {

            //请求成功
            return {
                'status' : true,
                'message' : 'ok',
                'data' : response.data,
            }

        } else if (response.code === 10001) {

            //登录过期
            return {
                'status' : false,
                'message' : response.msg,
                'data' : {},
            }

        } else {
            //请求失败
            return {
                'status' : false,
                'message' : response.msg,
                'data' : {},
            }
        }
    }
}
