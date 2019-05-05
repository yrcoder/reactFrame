import { observable, action } from 'mobx';
import request from 'utils/request';

const ts = new Date().getTime();
class CommonStore {
	@observable userInfo = {};

	@observable.ref cne = '';

	@observable.ref ts = ts;

	@observable items = [];

	@action fetchBaseProps = async (info) => {
		const result = await request.post('/param/getBaseProp', info, {});
		return result;
	};

	@action fetchEncryptKey = async () => {
		const result = await request.post(
			'/secret/encrypt',
			{ cne: 'ae8ffae38868e99ed11e9a95e5aa59ca' },
			{},
		);
		this.cne = result;
		return result;
	};

	@action login = async (info) => {
		const result = await request.post('/auth/ajaxLogin', { ...info, cne: this.cne }, {});
		return result;
	};

	@action fetchUserInfo = async (info) => {
		const result = await request.post('/sso/user/initUser', info, {});
		this.userInfo = JSON.parse(result);
		return result;
	};

	@action updatePassword = async (info) => {
		const result = await request.post('/user/modifyPassword2', info, {});
		return result;
	};

	@action logout = async () => {
		const result = await request.post('/user/ajaxLogout', {}, {});
		localStorage.clear();
		return result;
	};
}

export default CommonStore;
