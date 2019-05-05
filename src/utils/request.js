import axios from 'axios';
import { message } from 'antd';
import queryString from 'query-string';

const urlSearch = queryString.parse(window.location.search);
const token = urlSearch.token || sessionStorage.getItem('token');

axios.defaults.baseURL = APIURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json;charset=utf-8';
axios.defaults.headers.Authorization = token;
const errorHandler = (response) => {
	const { data } = response;
	const successCodes = ['200', '0'];
	if (successCodes.includes(String(data.code))) {
		return data;
	}
	if (String(data.code) === '1000002') {
		message.error(data.msg || data.errorMsg, 3);
		if (window.top === window.self) {
			window.location.replace(`${SSOURL}?origin=${encodeURIComponent(window.location.href)}`);
		}
		return Promise.reject(data);
	}
};

// 请求拦截器
axios.interceptors.request.use(
	(config) => {
		const requestUrlBase = config.url.split('?')[0];
		const configSearch = queryString.parse(config.url.split('?')[1]);
		const configParams = Object.assign({}, requestUrlBase, configSearch);
		config.url = requestUrlBase + queryString.stringify(configParams);
		return config;
	},
	error => Promise.reject(error),
);
// 响应拦截器
axios.interceptors.response.use(
	(response) => {
		errorHandler(response);
		return response;
	},
	(error) => {
		errorHandler(error.response);
		return Promise.reject(error);
	},
);

export default axios;
