import NetworkHandle from './NetworkHandle';

export default class {

    /**
     * 发送GET请求
     * @param url
     * @param params
     * */
    static async get(url, params) {
        const requestParams = Object.assign(this.commonParams(), params);
        return new NetworkHandle()
            .setHost(this.commonHost())
            .setUrl(url)
            .setHeaders(this.commonHeaders())
            .setTimeOut(this.commonTimeOut())
            .setParserFunc(this.analysis)
            .get(requestParams)
    }

    /**
     * 发送POST请求
     * @param url
     * @param params
     * */
    static async post(url, params) {
        const requestParams = Object.assign(this.commonParams(), params);
        return new NetworkHandle()
            .setHost(this.commonHost())
            .setUrl(url)
            .setHeaders(this.commonHeaders())
            .setTimeOut(this.commonTimeOut())
            .setParserFunc(this.analysis)
            .post(requestParams, this.isJson())
    }

    /**
     * 上传图片请求
     * @param url
     * @param params
     * @param fileName
     * @param files
     * */
    static async upload(url, params, fileName, files) {
        const requestParams = Object.assign(this.commonParams(), params);
        return new NetworkHandle()
            .setHost(this.commonHost())
            .setUrl(url)
            .setHeaders(this.commonHeaders())
            .setTimeOut(this.commonTimeOut())
            .setParserFunc(this.analysis)
            .upload(requestParams, fileName, files)
    }

    /**
     * 配置服务器域名
     * */
    static commonHost() {
        return ""
    }

    /**
     * 配置请求头
     * */
    static commonHeaders() {
        return {}
    }

    /**
     * 配置参数
     * */
    static commonParams() {
        return {}
    }

    /**
     * 配置全局超时时间
     * */
    static commonTimeOut() {
        return 10
    }

    /**
     * POST数据是否为JSON格式
     * */
    static isJson() {
        return true
    }

    /**
     * 配置数据解析，返回指定格式
     * */
    static analysis(status, response, url, option) {
        return response;
    }
}
