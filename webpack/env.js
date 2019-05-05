/**
 * prod,test,dev这些名字是由package.json的命令中传递的
 */
// API地址
const APIURL = {
	prod: 'aaa',
	test: 'aaa',
	dev: 'aaa',
};
// SSO地址
const SSOURL = {
	prod: 'bbb',
	test: 'bbb',
	dev: 'bbb',
};

module.exports = {
	SSOURL,
	APIURL,
};
