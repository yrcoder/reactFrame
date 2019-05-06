// host:前端服务的IP地址
const HOST = '192.168.201.220';
const PORT = 4000;
// API地址
const APIURL = {
	prod: 'https://loan-sso-web.99gfd.com/loan-sso',
	test: 'http://192.168.5.109/loan-sso',
	dev: 'http://192.168.5.109/loan-sso',
};
// SSO地址
const SSOURL = {
	prod: 'http://loan-sso-front.99gfd.com/sso-web',
	test: 'http://192.168.5.109/sso-web',
	dev: 'http://192.168.5.109/sso-web',
};

module.exports = {
	SSOURL,
	APIURL,
	HOST,
	PORT,
};
