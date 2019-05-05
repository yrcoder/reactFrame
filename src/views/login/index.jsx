import React, { Component } from 'react';
import { Layout } from 'antd';
import loginHeader from 'images/loginHeader.png';
import LoginForm from './LoginForm';

const { Footer, Content } = Layout;

class Login extends Component {
	constructor(props) {
		super(props);
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (this.userInfo && this.userInfo.isLogin === true) {
			window.location.replace('/');
		}
	}

	render() {
		const { history } = this.props;

		return (
			<Layout className="login-page">
				<Content>
					<img src={loginHeader} alt="" />
					<LoginForm history={history} />
				</Content>
				<Footer>© 2015 - 2018 Tree Finance. All Rights Reserved</Footer>
			</Layout>
		);
	}
}

export default Login;
