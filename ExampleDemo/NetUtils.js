// import NetworkManage from "../src/index";

export default class NetUtils {

    //配置全局参数
    // static commonParams() {
    //     return {
    //         'token': 'xxxxx',
    //         'userId': 'xxxxx',
    //     }
    // }

    //配置全局请求头
    // static commonHeaders() {
    //     return {
    //         'header1': 'xxxxx',
    //         'header2': 'xxxxx',
    //     }
    // }

    //配置全局超时时间
    static commonTimeOut() {
        return 15
    }

    //配置全局数据解析
    static analysis(status, res) {

        console.log(res);

        if (!status || !res.hasOwnProperty("code")) {

            return {
                'status' : false,
                'message' : '网络连接失败，请稍后再试',
                'data' : {},
            };
        }

        if (res.code === 200) {

            //请求成功
            return {
                'status' : true,
                'message' : 'ok',
                'data' : res.data,
            }

        } else if (res.code === 10001) {

            //登录过期
            return {
                'status' : false,
                'message' : res.msg,
                'data' : {},
            }

        } else {

            //请求失败
            return {
                'status' : false,
                'message' : res.msg,
                'data' : {},
            }
        }
    }
}