import axios from 'axios'


/**
 * 设置基础URL
 */
axios.defaults.baseURL = ''

/**
 * 设置超时请求时间
 */
axios.defaults.timeout = 10000

/**
 * 设置CORS跨域允许携带资源凭证
 */
axios.defaults.withCredentials = true

/**
 * 设置POST请求头：告知服务器请求主题的格式
 */
axios.defaults.header['Content-Type'] = 'application/json'
axios.defaults.transformRequest = data => JSON.stringify(data)

/**
 * 设置请求拦截器
 */
axios.interceptors.request.use(config => {
    // 添加TOKEN验证：可以从本地存储中取值，也可以从redux中取值
    //JWT实现TOKEN效验
    const token = loacalStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
},error => {
    return Promise.reject(error)
})

/**
 * 设置响应拦截器
 */
axios.defaults.validateStatus = status => {
    return /^(2|3)\d{2}$/.test(status)
}
axios.interceptors.response.use(response => {
    return response.data
},error => {
    if(error.response) {
        //请求已发送，状态码不是200系列，设置不同状态码的不同处理
        switch (error.response.status) {
            //当前请求需要用户验证，一般是未登陆
            case 401:
                break
            //服务器已经理解请求，但是拒绝执行它，一般是TOKEN过期
            case 403:
                localStorage.removeItem('token')
                break
            //请求失败，未找到资源
            case 404:
                break
            default:
                break
        }
        return Promise.reject(error.response)
    } else {
        if (!window.navigator.onLine) {
            return
        }
    return Promise.reject(error)
    }
})

export default axios