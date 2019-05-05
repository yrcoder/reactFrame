import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Input, Button, message } from 'antd';
import clearMain from 'images/clearMain.png';

const FormItem = Form.Item;

@inject('commonStore')
@observer
class NormalLoginForm extends Component {
	async componentDidMount() {
		const { commonStore } = this.props;
		await commonStore.fetchBaseProps();
		await commonStore.fetchEncryptKey();
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const { form, commonStore } = this.props;
		const data = form.getFieldsValue();
		if (data.username && data.password) {
			const result = await commonStore.login(data);
			sessionStorage.setItem('token', result.token);
			window.location.replace('/');
		} else {
			message.error('请输入账号密码');
		}
		return false;
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login-form">
				<div className="left-area">
					<img src={clearMain} alt="" style={{ width: 294, marginTop: 50 }} />
				</div>
				<Form
					onSubmit={this.handleSubmit}
					style={{ marginLeft: 60, width: 288, marginTop: 65 }}
				>
					<FormItem>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: '请输入用户名' }],
						})(<Input className="input" placeholder="账号" />)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入登录密码' }],
						})(<Input className="input" type="password" placeholder="密码" />)}
					</FormItem>
					<FormItem>
						<Button type="primary" htmlType="submit" className="login-form-button">
							登录
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
}

export default Form.create()(NormalLoginForm);
