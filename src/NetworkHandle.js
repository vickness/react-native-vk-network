import queryString from "query-string";

//JSON格式请求头
const jsonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

//表单格式请求头
const formHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
};

//配置表单数据
function formParamsData(params) {
    const formData  = new FormData();
    for (const key in params.keys()) {
        formData.append(key, params[key]);
    }
    return formData;
}

//配置JSON数据
function jsonParamsData(params) {
    return JSON.stringify(params);
}

/** 网络请求框架*/
export default class NetworkHandle {

    /** 超时时间，默认10秒*/
    defaultTimeOut = 10 * 1000;
    /** 请求地址*/
    defaultUrl = "";
    /** 请求头*/
    defaultHeaders = jsonHeaders;
    /** 数据解析*/
    defaultParserFunc = function(status, res) {return res};

    /** 设置请求地址*/
    setUrl(url) {
        this.defaultUrl = url;
        return this
    }

    /** 设置请求超时时间*/
    setTimeOut(time: number) {
        this.defaultTimeOut = time * 1000;
        return this
    }

    /** 设置请求头，是否覆盖已存在的值*/
    setHeaders(headers, isReplace = false) {
        this.defaultHeaders = isReplace ? headers : Object.assign(this.defaultHeaders, headers);
        return this
    }

    /** 设置全局数据解析*/
    setParserFunc(parserFunc) {
        this.defaultParserFunc = parserFunc;
        return this
    }

    /** 发送GET请求*/
    get(params) {
        const paramsString = queryString.stringify(params);
        const baseUrl = paramsString.length > 0 ? this.defaultUrl + '?' + paramsString : this.defaultUrl;
        const option = {
            method: "GET",
            headers: this.defaultHeaders,
        };
        return this.baseRequest(baseUrl, option, this.defaultTimeOut);
    }

    /** 发送POST，是否是JSON格式*/
    post(params, isJson = true) {
        //请求头
        const headers = Object.assign(isJson ? jsonHeaders : formHeaders, this.defaultHeaders);
        const body = isJson ? jsonParamsData(params) : formParamsData(params);
        const option = {
            method: "POST",
            headers: headers,
            body: body,
        };
        return this.baseRequest(this.defaultUrl, option, this.defaultTimeOut);
    }

    /** 上传文件*/
    upload(params, fileName, images) {
        //请求头
        const headers = Object.assign(formHeaders, this.defaultHeaders);
        //设置请求体
        const formData  = formParamsData(params);
        //遍历图片地址的数组
        images.forEach(imagePath => {
            //创建文件信息
            const file = {uri: imagePath, name: "image.png", type: 'multipart/form-data'};
            //添加上传的图片信息
            formData.append(fileName, file);
        });

        const option = {
            method: "POST",
            headers: headers,
            body: formData,
        };
        return this.baseRequest(this.defaultUrl, option, this.defaultTimeOut);
    }

    /** 创建请求*/
    baseRequest(url, option, timeout) {

        //创建请求超时
        const timeoutPromise = new Promise(reject => {
            setTimeout(() => {
                reject(new Error("request timeout"))
            }, timeout)
        });
        //数据请求
        const requestPromise = fetch(url, option);
        //开始请求
        return new Promise((resolve, reject) => {
            Promise.race([requestPromise, timeoutPromise])
                .then(response => {
                    if (response.ok) return response.json();
                    else return response.text();
                })
                .then(response => {
                    const resultData = this.defaultParserFunc(true, response);
                    resolve(resultData);
                })
                .catch(error => {
                    const errorData = this.defaultParserFunc(false, error);
                    resolve(errorData);
                });
        })
    }
}